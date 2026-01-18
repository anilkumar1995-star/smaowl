<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = \App\Models\Order::where('user_id', $user->id);

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

        $orders = $query->orderByDesc('created_at')->paginate(15)->appends($request->only(['status', 'service', 'start_date', 'end_date', 'min_cost', 'max_cost']));

        // transform items so only necessary fields are sent to the client
        $orders->getCollection()->transform(function ($order) {
            return [
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
        });

        return Inertia::render('orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'service', 'start_date', 'end_date', 'min_cost', 'max_cost']),
        ]);
    }

    public function create()
    {
        
        try {
            $response = Http::withoutVerifying()->timeout(10)->get('https://socialsparksmm.com/api/services/page', [
                'v' => '3',
                'full' => 'false',
            ]);
 
            if ($response->failed()) {
                $serviceGroups = [];
            } else {
                $payload = $response->json() ?? [];
              
                // Debug: log payload shape (keys and counts) to laravel.log
                try {
                    Log::info('services API payload keys', [
                        'is_array' => is_array($payload),
                        'top_keys' => is_array($payload) ? array_keys($payload) : null,
                        'services_count' => is_array($payload) && isset($payload['services']) && is_array($payload['services']) ? count($payload['services']) : null,
                        'data_keys' => isset($payload['data']) && is_array($payload['data']) ? array_keys($payload['data']) : null,
                    ]);
                } catch (\Throwable $e) {
                    // swallow logging errors
                }

                $serviceGroups = [];

                if (isset($payload['data']['categories']) && is_array($payload['data']['categories'])) {
                    foreach ($payload['data']['categories'] as $cat) {
                        $services = collect($cat['services'] ?? [])->map(function ($s) use ($cat) {
                            return [
                                'service' => $s['service'] ?? $s['id'] ?? null,
                                'name' => $s['name'] ?? ($s['service'] ?? 'Unknown'),
                                'rate' => (string) ($s['rate'] ?? $s['price'] ?? 0),
                                'min' => $s['min'] ?? 1,
                                'max' => $s['max'] ?? 1000,
                                'refill' => $s['refill'] ?? false,
                                'cancel' => $s['cancel'] ?? false,
                                'category' => $cat['name'] ?? $cat['category'] ?? null,
                            ];
                        })->filter(function ($s) {
                            return !is_null($s['service']);
                        })->values()->toArray();

                        $serviceGroups[] = [
                            'id' => $cat['id'] ?? $cat['name'] ?? null,
                            'name' => $cat['name'] ?? $cat['category'] ?? 'Other',
                            'services' => $services,
                        ];
                    }
                } elseif (isset($payload['services']) && is_array($payload['services'])) {
                    // Detect whether payload['services'] are actual services or categories containing services
                    $first = $payload['services'][0] ?? null;

                    if (is_array($first) && isset($first['services'])) {
                        // payload['services'] is an array of categories
                        foreach ($payload['services'] as $cat) {
                            $services = collect($cat['services'] ?? [])->map(function ($s) use ($cat) {
                                return [
                                    'service' => $s['service'] ?? $s['id'] ?? null,
                                    'name' => $s['name'] ?? ($s['service'] ?? 'Unknown'),
                                    'rate' => (string) ($s['rate'] ?? $s['price'] ?? 0),
                                    'min' => $s['min'] ?? 1,
                                    'max' => $s['max'] ?? 1000,
                                    'refill' => $s['refill'] ?? false,
                                    'cancel' => $s['cancel'] ?? false,
                                    'category' => $cat['name'] ?? $cat['category'] ?? null,
                                ];
                            })->filter(function ($s) {
                                return !is_null($s['service']);
                            })->values()->toArray();

                            $serviceGroups[] = [
                                'id' => $cat['id'] ?? $cat['name'] ?? null,
                                'name' => $cat['name'] ?? $cat['category'] ?? 'Other',
                                'services' => $services,
                            ];
                        }
                    } else {
                        // payload['services'] is a flat list of services
                        $services = collect($payload['services'])->map(function ($s) {
                            return [
                                'service' => $s['service'] ?? $s['id'] ?? null,
                                'name' => $s['name'] ?? ($s['service'] ?? 'Unknown'),
                                'rate' => (string) ($s['rate'] ?? $s['price'] ?? 0),
                                'min' => $s['min'] ?? 1,
                                'max' => $s['max'] ?? 1000,
                                'refill' => $s['refill'] ?? false,
                                'cancel' => $s['cancel'] ?? false,
                                'category' => $s['category'] ?? null,
                            ];
                        })->filter(function ($s) {
                            return !is_null($s['service']);
                        })->values()->toArray();

                        $serviceGroups[] = [
                            'id' => 'all',
                            'name' => 'All Services',
                            'services' => $services,
                        ];
                    }
                } elseif (is_array($payload) && count($payload) && isset($payload[0]['service'])) {
                    $services = collect($payload)->map(function ($s) {
                        return [
                            'service' => $s['service'] ?? $s['id'] ?? null,
                            'name' => $s['name'] ?? ($s['service'] ?? 'Unknown'),
                            'rate' => (string) ($s['rate'] ?? $s['price'] ?? 0),
                            'min' => $s['min'] ?? 1,
                            'max' => $s['max'] ?? 1000,
                            'refill' => $s['refill'] ?? false,
                            'cancel' => $s['cancel'] ?? false,
                            'category' => $s['category'] ?? null,
                        ];
                    })->filter(function ($s) {
                        return !is_null($s['service']);
                    })->values()->toArray();

                    $serviceGroups[] = [
                        'id' => 'all',
                        'name' => 'All Services',
                        'services' => $services,
                    ];
                } else {
                    $serviceGroups = [];
                }
            }
        } catch (\Exception $e) {
            dd($e);
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
            $serviceResponse = Http::withoutVerifying()->timeout(10)->get('https://socialsparksmm.com/api/services/page', [
                'v' => '3',
                'full' => 'false',
            ]);

            if ($serviceResponse->failed()) {
                return response()->json(['error' => 'Unable to fetch services'], 500);
            }

            $payload = $serviceResponse->json() ?? [];

            // flatten services from groups
            $flat = collect([]);

            if (isset($payload['data']['categories']) && is_array($payload['data']['categories'])) {
                foreach ($payload['data']['categories'] as $cat) {
                    $flat = $flat->merge(collect($cat['services'] ?? []));
                }
            } elseif (isset($payload['services']) && is_array($payload['services'])) {
                // payload['services'] might be categories. detect and flatten accordingly
                $first = $payload['services'][0] ?? null;
                if (is_array($first) && isset($first['services'])) {
                    foreach ($payload['services'] as $cat) {
                        $flat = $flat->merge(collect($cat['services'] ?? []));
                    }
                } else {
                    $flat = collect($payload['services']);
                }
            } elseif (is_array($payload) && count($payload) && isset($payload[0]['service'])) {
                $flat = collect($payload);
            }

            $services = $flat->map(function ($s) {
                return [
                    'service' => $s['service'] ?? $s['id'] ?? null,
                    'name' => $s['name'] ?? ($s['service'] ?? 'Unknown'),
                    'rate' => (string) ($s['rate'] ?? $s['price'] ?? 0),
                    'min' => $s['min'] ?? 1,
                    'max' => $s['max'] ?? 1000,
                    'refill' => $s['refill'] ?? false,
                    'cancel' => $s['cancel'] ?? false,
                    'category' => $s['category'] ?? null,
                ];
            })->filter(function ($s) {
                return !is_null($s['service']);
            })->values();

            $service = $services->firstWhere('service', $request->service);

            if (!$service) {
                return response()->json(['error' => 'Service not found'], 404);
            }

            $cost = ($service['rate'] * $request->quantity) / 100; // Assuming rate is per 100

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
                $order->status = 'success';
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
