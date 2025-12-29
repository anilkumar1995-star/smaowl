<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create()
    {
        try {
            $response = Http::timeout(10)->get('https://socialsparksmm.com/api/v2', [
                'action' => 'services',
                'key' => config('services.socialsparks.key'),
            ]);

            if ($response->failed()) {
                $services = [];
            } else {
                $services = $response->json() ?? [];
            }
        } catch (\Exception $e) {
            $services = [];
        }

        return Inertia::render('orders/create', [
            'services' => $services,
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

        try {
            $serviceResponse = Http::timeout(10)->get('https://socialsparksmm.com/api/v2', [
                'action' => 'services',
                'key' => config('services.socialsparks.key'),
            ]);

            if ($serviceResponse->failed()) {
                return response()->json(['error' => 'Unable to fetch services'], 500);
            }

            $services = collect($serviceResponse->json() ?? []);
            $service = $services->firstWhere('service', $request->service);

            if (!$service) {
                return response()->json(['error' => 'Service not found'], 404);
            }

            $cost = ($service['rate'] * $request->quantity) / 100; // Assuming rate is per 100

            if ($user->balance < $cost) {
                return response()->json(['error' => 'Insufficient balance'], 400);
            }

            // Place the order
            $orderResponse = Http::timeout(10)->post('https://socialsparksmm.com/api/v2', [
                'action' => 'add',
                'key' => config('services.socialsparks.key'),
                'service' => $request->service,
                'link' => $request->link,
                'quantity' => $request->quantity,
            ]);

            if ($orderResponse->failed()) {
                return response()->json(['error' => 'Failed to place order'], 500);
            }

            $orderData = $orderResponse->json();

            if (isset($orderData['order'])) {
                // Deduct balance
                $user->balance -= $cost;
                $user->save();

                return response()->json(['success' => true, 'order' => $orderData]);
            }

            return response()->json(['error' => 'Failed to place order'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }
}
