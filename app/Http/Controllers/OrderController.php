<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Service;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $isAdmin = in_array($user->email, config('app.admin_emails', []));
 
        if ($isAdmin) {
            $query = \App\Models\Order::with('user:id,name,email');
        } else {
            $query = \App\Models\Order::where('user_id', $user->id);
        }
      
        // Filters
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($service = $request->query('service')) {
            $query->where('service', $service);
        }

        if ($start = $request->query('start_date')) {
            $query->where('created_at', '>=', $start . ' 00:00:00');
        }

        if ($end = $request->query('end_date')) {
            $query->where('created_at', '<=', $end . ' 23:59:59');
        }

        if ($min = $request->query('min_cost')) {
            $query->where('cost', '>=', (float)$min);
        }

        if ($max = $request->query('max_cost')) {
            $query->where('cost', '<=', (float)$max);
        }

        $orders = $query->orderByDesc('id')->paginate(10)->appends($request->only(['status', 'service', 'start_date', 'end_date', 'min_cost', 'max_cost']));

        // transform items so only necessary fields are sent to the client
        $orders->getCollection()->transform(function ($order) use ($isAdmin) {
            $data = [
                'id' => $order->id,
                'service' => $order->service,
                'service_name' => $order->service_name,
                'link' => $order->link,
                'quantity' => $order->quantity,
                'cost' => (string)$order->cost,
                'external_id' => $order->external_id,
                'status' => $order->status,
                'created_at' => $order->created_at->toDateTimeString(),
            ];

            if ($isAdmin) {
                $data['user'] = [
                    'id' => $order->user->id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                ];
            }

            return $data;
        });

        return Inertia::render('orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'service', 'start_date', 'end_date', 'min_cost', 'max_cost']),
        ]);
    }

    /**
     * Check status for a given order (app id or external id). This calls the external provider
     * status endpoint and will refund the user if the provider reports a partial or failed fill.
     *
     * Query param: order (app order id or external provider id)
     */
    public function status(Request $request): JsonResponse
    {
        $request->validate([
            'order' => 'required',
        ]);

        $orderIdentifier = $request->query('order');
        $action = strtolower($request->query('action', 'status'));

        // Only allow known actions to be forwarded to provider
        $allowedActions = ['status', 'balance'];
        if (!in_array($action, $allowedActions, true)) {
            return response()->json(['error' => 'Unsupported action'], 400);
        }

        // Find by app id or external_id
        $order = \App\Models\Order::where('id', $orderIdentifier)
            ->orWhere('external_id', $orderIdentifier)
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $externalId = $order->external_id;
        if (empty($externalId)) {
            return response()->json(['status' => $order->status, 'message' => 'No external id available for this order'], 200);
        }

        $apiKey = config('services.socialsparks.key');
        if (empty($apiKey)) {
            return response()->json(['error' => 'Payment provider not configured.'], 500);
        }

        try {
            $resp = Http::withoutVerifying()->timeout(10)->get('https://socialsparksmm.com/api/v2', [
                'action' => $action,
                'order' => $externalId,
                'key' => $apiKey,
            ]);

            if ($resp->failed()) {
                Log::error('Status API failed', ['status' => $resp->status(), 'body' => $resp->body(), 'order' => $order->id]);
                return response()->json(['error' => 'Failed to query provider status'], 502);
            }

            $data = $resp->json();

            // Example provider response:
            // {
            //   "charge": "0.27819",
            //   "start_count": "3572",
            //   "status": "Partial",
            //   "remains": "157",
            //   "currency": "USD"
            // }

            // Persist API response to order
            $order->api_response = $data;

            $providerStatus = isset($data['status']) ? strtolower($data['status']) : null;

            // If provider reports partial or failed, compute refund and credit user
            if (in_array($providerStatus, ['partial', 'failed', 'cancelled', 'canceled'])) {
                $remains = isset($data['remains']) ? (int)$data['remains'] : null;
                $originalQty = (int)$order->quantity;
                if ($remains !== null && $originalQty > 0) {
                    $delivered = max(0, $originalQty - $remains);
                    $deliveredRatio = $delivered / $originalQty;

                    $chargedToUser = (float)$order->cost * $deliveredRatio;
                    $refundAmount = max(0, (float)$order->cost - $chargedToUser);

                    // Only refund if we haven't refunded before and refund amount > 0.009 (avoid tiny cents)
                    if ($refundAmount > 0.009 && $order->status !== 'refunded') {
                        try {
                            \DB::beginTransaction();

                            $user = $order->user()->lockForUpdate()->first();
                            if ($user) {
                                $user->addFunds((float)$refundAmount);
                                $user->refresh();

                                \App\Models\Ledger::create([
                                    'user_id' => $user->id,
                                    'type' => 'credit',
                                    'amount' => number_format((float)$refundAmount, 2, '.', ''),
                                    'balance' => number_format((float)$user->balance, 2, '.', ''),
                                    'company_balance' => number_format((float) \App\Models\User::sum('balance'), 2, '.', ''),
                                    'reference_type' => 'order',
                                    'reference_id' => $order->id,
                                    'description' => 'Refund for provider partial/failed order',
                                ]);
                            }

                            $order->status = 'refunded';
                            $order->save();

                            \DB::commit();
                        } catch (\Exception $e) {
                            \DB::rollBack();
                            Log::error('Refund processing failed', ['message' => $e->getMessage(), 'order' => $order->id]);
                        }
                    }
                }
            } else {
                // map other provider statuses to our app statuses
                    if (in_array($providerStatus, ['pending', 'in progress', 'processing'], true)) {
                        $order->status = 'pending';
                    } elseif (in_array($providerStatus, ['completed', 'success'], true)) {
                        $order->status = 'success';
                    }
                $order->save();
            }

            return response()->json(['ok' => true, 'provider' => $data, 'order' => $order]);
        } catch (\Exception $e) {
            Log::error('Status check exception', ['message' => $e->getMessage(), 'order' => $order->id]);
            return response()->json(['error' => 'Exception occurred while checking status'], 500);
        }
    }

    public function create()
    {
        // Use local DB `services` table as the source of truth for the ordering UI.
        try {
            $services = Service::orderBy('category')->get();

            $serviceGroups = [];

            $grouped = $services->groupBy(function ($s) {
                return $s->category ?? 'Other';
            });

            foreach ($grouped as $category => $items) {
                $servicesArr = $items->map(function ($s) use ($category) {
                    return [
                        // prefer the external id if present so the downstream API receives the expected id
                        'service' => $s->external_id ?? $s->id,
                        'name' => $s->name,
                        'rate' => (string) ($s->rate ?? 0),
                        'min' => $s->min ?? 1,
                        'max' => $s->max ?? 1000,
                        'refill' => (bool) ($s->refill ?? false),
                        'cancel' => (bool) ($s->cancel ?? false),
                        'category' => $category,
                    ];
                })->values()->toArray();

                $serviceGroups[] = [
                    'id' => $category,
                    'name' => $category,
                    'services' => $servicesArr,
                ];
            }
        } catch (\Exception $e) {
            Log::error('Failed to load services from DB', ['message' => $e->getMessage()]);
            $serviceGroups = [];
        }

        return Inertia::render('orders/create', [
            'serviceGroups' => $serviceGroups,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'service' => 'required|integer',
            'link' => 'required|url',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        // Ensure API key is configured
        $apiKey = config('services.socialsparks.key');
        if (empty($apiKey)) {
            return response()->json(['error' => 'Payment provider not configured. Missing SOCIALSPARKS_API_KEY.'], 500);
        }

        try {
            // Look up the service in our DB by external id or local id
            $service = Service::where('external_id', $request->service)
                ->orWhere('id', $request->service)
                ->first();

            if (!$service) {
                return response()->json(['error' => 'Service not found'], 404);
            }

            $cost = ((float) $service->rate * (int) $request->quantity) / 100; // preserve previous rate-per-100 assumption

            // Start by creating a pending order and deducting funds atomically
            $order = null;

            \DB::beginTransaction();
            try {
                // Deduct funds using the helper on User model (atomic DB decrement)
                if (!$user->deductFunds((float)$cost)) {
                    \DB::rollBack();
                    return response()->json(['errors' => ['server' => 'Insufficient balance']], 422);
                }

                // refresh user to get updated balance
                $user->refresh();

                $order = \App\Models\Order::create([
                    'user_id' => $user->id,
                    'service' => (string)$request->service,
                    'service_name' => $service['name'] ?? null,
                    'link' => $request->link,
                    'quantity' => (int)$request->quantity,
                    'cost' => $cost,
                    'status' => 'pending',
                ]);

                // Create ledger entry for debit (use fixed 2-decimal formatting)
                \App\Models\Ledger::create([
                    'user_id' => $user->id,
                    'type' => 'debit',
                    'amount' => number_format((float)$cost, 2, '.', ''),
                    'balance' => number_format((float)$user->balance, 2, '.', ''),
                    'company_balance' => number_format((float) \App\Models\User::sum('balance'), 2, '.', ''),
                    'reference_type' => 'order',
                    'reference_id' => $order->id,
                    'description' => 'Order placed',
                ]);

                \DB::commit();
            } catch (\Exception $e) {
                \DB::rollBack();
                Log::error('Order create/deduct failed', ['message' => $e->getMessage()]);
                return response()->json(['error' => 'Failed to create order'], 500);
            }

            // Place the order at the external provider
            $orderResponse = Http::withoutVerifying()->timeout(10)->post('https://socialsparksmm.com/api/v2', [
                'action' => 'add',
                'key' => config('services.socialsparks.key'),
                'service' => $request->service,
                'link' => $request->link,
                'quantity' => $request->quantity,
            ]);

            if ($orderResponse->failed()) {
                // Log response body for debugging
                Log::error('Order API failed', ['status' => $orderResponse->status(), 'body' => $orderResponse->body(), 'order_id' => $order->id]);

                $apiBody = $orderResponse->json() ?? null;
                $apiMessage = null;

                if (is_array($apiBody) && isset($apiBody['error'])) {
                    $apiMessage = is_string($apiBody['error']) ? $apiBody['error'] : json_encode($apiBody['error']);
                } elseif (is_array($apiBody) && isset($apiBody['message'])) {
                    $apiMessage = $apiBody['message'];
                } else {
                    $apiMessage = $orderResponse->body();
                }

                // Mark order failed and refund user
                try {
                    \DB::beginTransaction();
                    $order->status = 'failed';
                    $order->api_response = $apiBody;
                    $order->save();

                    $user->addFunds((float)$cost);
                    $user->refresh();

                    \App\Models\Ledger::create([
                        'user_id' => $user->id,
                        'type' => 'credit',
                        'amount' => number_format((float)$cost, 2, '.', ''),
                        'balance' => number_format((float)$user->balance, 2, '.', ''),
                        'company_balance' => number_format((float) \App\Models\User::sum('balance'), 2, '.', ''),
                        'reference_type' => 'order',
                        'reference_id' => $order->id,
                        'description' => 'Refund after API failure',
                    ]);

                    \DB::commit();
                } catch (\Exception $e) {
                    \DB::rollBack();
                    Log::error('Refund failed after API error', ['message' => $e->getMessage(), 'order_id' => $order->id]);
                }

                return response()->json(['errors' => ['server' => 'Failed to place order: ' . $apiMessage]], 422);
            }

            $orderData = $orderResponse->json();

            // Update order with external id and mark success
            try {
                $externalId = null;
                if (isset($orderData['order'])) {
                    // API returns an "order" key, sometimes with an id field
                    $externalOrder = $orderData['order'];
                    if (is_array($externalOrder)) {
                        $externalId = $externalOrder['id'] ?? $externalOrder['order'] ?? null;
                    } elseif (is_string($externalOrder) || is_numeric($externalOrder)) {
                        $externalId = (string)$externalOrder;
                    }
                }

                $order->external_id = $externalId;
                $order->status = 'pending';
                $order->api_response = $orderData;
                $order->save();

                return response()->json(['success' => true, 'order' => $orderData, 'app_order' => $order]);
            } catch (\Exception $e) {
                Log::error('Failed to update order after API success', ['message' => $e->getMessage(), 'order_id' => $order->id]);
                // Not critical to rollback funds here; mark failed and try refund
                try {
                    \DB::beginTransaction();
                    $order->status = 'failed';
                    $order->api_response = $orderData;
                    $order->save();
                    $user->addFunds((float)$cost);                    $user->refresh();

                    \App\Models\Ledger::create([
                        'user_id' => $user->id,
                        'type' => 'credit',
                        'amount' => number_format((float)$cost, 2, '.', ''),
                        'balance' => number_format((float)$user->balance, 2, '.', ''),
                        'company_balance' => number_format((float) \App\Models\User::sum('balance'), 2, '.', ''),
                        'reference_type' => 'order',
                        'reference_id' => $order->id,
                        'description' => 'Refund after unexpected update error',
                    ]);
                    \DB::commit();
                } catch (\Exception $ee) {
                    \DB::rollBack();
                    Log::error('Refund failed after unexpected update error', ['message' => $ee->getMessage(), 'order_id' => $order->id]);
                }

                return response()->json(['error' => 'An error occurred while finalizing order'], 500);
            }
        } catch (\Exception $e) {
            Log::error('Order store exception', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }
}
