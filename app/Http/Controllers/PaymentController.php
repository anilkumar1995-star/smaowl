<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Razorpay\Api\Api;

class PaymentController extends Controller
{
    private Api $razorpay;

    public function __construct()
    {
        $this->razorpay = new Api(
            config('services.razorpay.key_id'),
            config('services.razorpay.key_secret')
        );
    }

    /**
     * Show the add funds page
     */
    public function create()
    {
        return Inertia::render('payments/create', [
            'razorpay_key' => config('services.razorpay.key_id'),
        ]);
    }

    /**
     * Create a Razorpay order
     */
    public function createOrder(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:1|max:100000',
        ]);

        try {
            $amount = $request->amount * 100; // Razorpay expects amount in paisa

            $orderData = [
                'receipt' => 'rcpt_' . time(),
                'amount' => $amount,
                'currency' => 'INR',
                'payment_capture' => 1, // Auto capture
            ];

            $razorpayOrder = $this->razorpay->order->create($orderData);

            // Create payment record
            $payment = Payment::create([
                'user_id' => Auth::id(),
                'razorpay_order_id' => $razorpayOrder['id'],
                'amount' => $request->amount,
                'currency' => 'INR',
                'status' => 'pending',
                'description' => 'Fund addition',
            ]);

            return response()->json([
                'order_id' => $razorpayOrder['id'],
                'amount' => $amount,
                'currency' => 'INR',
                'payment_id' => $payment->id,
                'razorpay_key' => config('services.razorpay.key_id'),
            ]);

        } catch (\Exception $e) {
            Log::error('Razorpay order creation failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'error' => 'Failed to create payment order'
            ], 500);
        }
    }

    /**
     * Handle payment success callback
     */
    public function success(Request $request): JsonResponse
    {
        $request->validate([
            'razorpay_payment_id' => 'required|string',
            'razorpay_order_id' => 'required|string',
            'razorpay_signature' => 'required|string',
        ]);

        try {
            // Verify payment signature
            $attributes = [
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ];

            $this->razorpay->utility->verifyPaymentSignature($attributes);

            // Update payment status
            $payment = Payment::where('razorpay_order_id', $request->razorpay_order_id)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            DB::transaction(function () use ($payment, $request) {
                $payment->update([
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'status' => 'captured',
                    'paid_at' => now(),
                ]);

                // Add funds to user balance
                $payment->user->addFunds($payment->amount);
            });

            return response()->json([
                'success' => true,
                'message' => 'Payment successful',
                'payment_id' => $payment->id,
            ]);

        } catch (\Exception $e) {
            Log::error('Payment verification failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'order_id' => $request->razorpay_order_id,
            ]);

            return response()->json([
                'error' => 'Payment verification failed'
            ], 400);
        }
    }

    /**
     * Handle payment failure
     */
    public function failure(Request $request): JsonResponse
    {
        try {
            $payment = Payment::where('razorpay_order_id', $request->razorpay_order_id)
                ->where('user_id', Auth::id())
                ->first();

            if ($payment) {
                $payment->update([
                    'status' => 'failed',
                    'metadata' => $request->all(),
                ]);
            }

            return response()->json([
                'error' => 'Payment failed',
                'details' => $request->all(),
            ], 400);

        } catch (\Exception $e) {
            Log::error('Payment failure handling failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'error' => 'Payment processing failed'
            ], 500);
        }
    }

    /**
     * Get user's payment history
     */
    public function history()
    {
        $user = Auth::user();
        $payments = $user->payments()
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $totalInvested = $user->payments()
            ->whereNotIn('status', ['failed', 'cancelled'])
            ->sum('amount');

        // Prepare data for graph: payments by month
        $graphData = $user->payments()
            ->whereNotIn('status', ['failed', 'cancelled'])
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $item->month,
                    'total' => (float) $item->total,
                ];
            });

        return Inertia::render('payments/history', [
            'payments' => $payments,
            'totalInvested' => $totalInvested,
            'availableBalance' => $user->balance,
            'graphData' => $graphData,
        ]);
    }
}
