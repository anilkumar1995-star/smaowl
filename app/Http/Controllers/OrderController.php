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

            if ($user->balance < $cost) {
                return response()->json(['errors' => ['server' => 'Insufficient balance']], 422);
            }

            // Place the order
            $orderResponse = Http::withoutVerifying()->timeout(10)->post('https://socialsparksmm.com/api/v2', [
                'action' => 'add',
                'key' => config('services.socialsparks.key'),
                'service' => $request->service,
                'link' => $request->link,
                'quantity' => $request->quantity,
            ]);

            if ($orderResponse->failed()) {
                // Log response body for debugging
                Log::error('Order API failed', ['status' => $orderResponse->status(), 'body' => $orderResponse->body()]);

                // try to decode API error
                $apiBody = $orderResponse->json() ?? null;
                $apiMessage = null;

                if (is_array($apiBody) && isset($apiBody['error'])) {
                    $apiMessage = is_string($apiBody['error']) ? $apiBody['error'] : json_encode($apiBody['error']);
                } elseif (is_array($apiBody) && isset($apiBody['message'])) {
                    $apiMessage = $apiBody['message'];
                } else {
                    $apiMessage = $orderResponse->body();
                }

                return response()->json(['errors' => ['server' => 'Failed to place order: ' . $apiMessage]], 422);
            }

            $orderData = $orderResponse->json();

            if (isset($orderData['order'])) {
                // Deduct balance
                $user->balance -= $cost;
                $user->save();

                return response()->json(['success' => true, 'order' => $orderData]);
            }

            // Log unexpected API response
            Log::warning('Order API returned unexpected payload', ['body' => $orderResponse->body()]);

            return response()->json(['errors' => ['server' => 'Failed to place order: unexpected API response']], 422);
        } catch (\Exception $e) {
            Log::error('Order store exception', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }
}
