<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Ledger;
use App\Models\User;
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

                // Add funds to user balance (use fixed 2-decimal formatting)
                $payment->user->addFunds((float)$payment->amount);

                // Refresh the user model to get the updated balance
                $payment->user->refresh();

                // Create ledger entry (credit)
                Ledger::create([
                    'user_id' => $payment->user->id,
                    'type' => 'credit',
                    'amount' => number_format((float)$payment->amount, 2, '.', ''),
                    'balance' => number_format((float)$payment->user->balance, 2, '.', ''),
                    'company_balance' => number_format((float) \App\Models\User::sum('balance'), 2, '.', ''),
                    'reference_type' => 'payment',
                    'reference_id' => $payment->id,
                    'description' => 'Funds added via Razorpay',
                    'meta' => [
                        'razorpay_payment_id' => $request->razorpay_payment_id,
                        'razorpay_order_id' => $request->razorpay_order_id,
                    ],
                ]);
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
     * Manual load form
     */
    public function manualForm()
    {
        return Inertia::render('payments/manual');
    }

    /**
     * Handle manual wallet load request (user-submitted)
     */
    public function manualStore(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:1|max:100000',
            'note' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();

        // Use 'pending' status (the system treats manual requests as pending with metadata)
        $payment = Payment::create([
            'user_id' => $user->id,
            'amount' => (float)$request->amount,
            'currency' => 'INR',
            'status' => 'pending',
            'description' => $request->note ?? 'Manual wallet load request',
            'metadata' => ['requested_by' => $user->id, 'manual_request' => true],
        ]);

        return response()->json(['success' => true, 'payment_id' => $payment->id]);
    }

    /**
     * Get user's payment history
     */
    public function history(Request $request)
    {
        $user = Auth::user();
        $isAdmin = in_array($user->email, config('app.admin_emails', []));

        // Apply filters
        if ($isAdmin) {
            $paymentsQuery = Payment::with('user');
        } else {
            $paymentsQuery = $user->payments();
        }

        if ($status = $request->query('status')) {
            $paymentsQuery->where('status', $status);
        }

        if ($start = $request->query('start_date')) {
            $paymentsQuery->where('created_at', '>=', $start . ' 00:00:00');
        }

        if ($end = $request->query('end_date')) {
            $paymentsQuery->where('created_at', '<=', $end . ' 23:59:59');
        }

        if ($min = $request->query('min_amount')) {
            $paymentsQuery->where('amount', '>=', (float)$min);
        }

        if ($max = $request->query('max_amount')) {
            $paymentsQuery->where('amount', '<=', (float)$max);
        }

        // Allow admin to filter by user email
        if ($isAdmin && $userEmail = $request->query('user_email')) {
            $paymentsQuery->whereHas('user', function ($q) use ($userEmail) {
                $q->where('email', 'like', '%' . $userEmail . '%');
            });
        }

        $payments = $paymentsQuery->orderBy('created_at', 'desc')
            ->paginate(20)
            ->appends($request->only(['status', 'start_date', 'end_date', 'min_amount', 'max_amount', 'user_email']));

        // Net invested amount = sum of order debits minus any order credits (refunds)
        $debits = (float) $user->ledgers()->where('type', 'debit')->where('reference_type', 'order')->sum('amount');
        $credits = (float) $user->ledgers()->where('type', 'credit')->where('reference_type', 'order')->sum('amount');
        $totalInvested = round($debits - $credits, 2);
        // (No per-ledger company balance computation is needed on the payments history page.)

        // Prepare data for graph: payments by month (unfiltered)
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
            'filters' => $request->only(['status', 'start_date', 'end_date', 'min_amount', 'max_amount', 'user_email']),
            'isAdmin' => $isAdmin,
        ]);
    }

    /**
     * Display ledger (credits/debits) and current balance
     */
    public function ledger(Request $request)
    {
        $user = Auth::user();
        $isAdmin = in_array($user->email, config('app.admin_emails', []));

        if ($isAdmin) {
            $ledgersQuery = Ledger::with('user:id,name,email');
        } else {
            $ledgersQuery = $user->ledgers();
        }

        if ($type = $request->query('type')) {
            $ledgersQuery->where('type', $type);
        }

        if ($reference = $request->query('reference_type')) {
            $ledgersQuery->where('reference_type', $reference);
        }

        if ($start = $request->query('start_date')) {
            $ledgersQuery->where('created_at', '>=', $start . ' 00:00:00');
        }

        if ($end = $request->query('end_date')) {
            $ledgersQuery->where('created_at', '<=', $end . ' 23:59:59');
        }

        if ($min = $request->query('min_amount')) {
            $ledgersQuery->where('amount', '>=', (float)$min);
        }

        if ($max = $request->query('max_amount')) {
            $ledgersQuery->where('amount', '<=', (float)$max);
        }

        $ledgers = $ledgersQuery->orderByDesc('id')->paginate(20)->appends($request->only(['type', 'reference_type', 'start_date', 'end_date', 'min_amount', 'max_amount']));

        // For admin, compute company-wide balance (sum of all users)
        $closingBalance = $isAdmin ? null : $user->balance;
        $companyBalance = $isAdmin ? (float) User::sum('balance') : null;

        return Inertia::render('payments/ledger', [
            'ledgers' => $ledgers,
            'closingBalance' => $closingBalance,
            'companyBalance' => $companyBalance,
            'isAdmin' => $isAdmin,
            'filters' => $request->only(['type', 'reference_type', 'start_date', 'end_date', 'min_amount', 'max_amount']),
        ]);
    }

    /**
     * Admin: update payment status (capture or fail)
     */
    public function adminUpdateStatus(Request $request, Payment $payment)
    {
        $user = Auth::user();
        $isAdmin = in_array($user->email, config('app.admin_emails', []));
        if (!$isAdmin) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|string|in:captured,failed',
            'reason' => 'nullable|string|max:500',
        ]);

        $status = $request->input('status');

        try {
            if ($status === 'captured') {
                if ($payment->status === 'captured') {
                    return response()->json(['error' => 'Payment already captured'], 422);
                }

                DB::transaction(function () use ($payment) {
                    $payment->update(['status' => 'captured', 'paid_at' => now()]);
                    $payment->user->addFunds((float)$payment->amount);
                    $payment->user->refresh();

                    Ledger::create([
                        'user_id' => $payment->user->id,
                        'type' => 'credit',
                        'amount' => number_format((float)$payment->amount, 2, '.', ''),
                        'balance' => number_format((float)$payment->user->balance, 2, '.', ''),
                        'company_balance' => number_format((float) \App\Models\User::sum('balance'), 2, '.', ''),
                        'reference_type' => 'payment',
                        'reference_id' => $payment->id,
                        'description' => 'Payment captured by admin',
                    ]);
                });

                return response()->json(['success' => true, 'status' => 'captured']);
            }

            if ($status === 'failed') {
                if ($payment->status === 'failed') {
                    return response()->json(['error' => 'Payment already failed'], 422);
                }

                $payment->update(['status' => 'failed', 'metadata' => array_merge((array)$payment->metadata, ['rejected_by' => $user->id, 'rejected_reason' => $request->input('reason')])]);

                return response()->json(['success' => true, 'status' => 'failed']);
            }

            return response()->json(['error' => 'Unknown status'], 400);
        } catch (\Exception $e) {
            Log::error('Admin update payment status failed', ['message' => $e->getMessage(), 'payment_id' => $payment->id]);
            return response()->json(['error' => 'Failed to update payment status'], 500);
        }
    }

    /**
     * Admin: check remote payment status from Razorpay
     */
    public function adminCheckStatus(Request $request, Payment $payment)
    {
        $user = Auth::user();
        $isAdmin = in_array($user->email, config('app.admin_emails', []));
        if (!$isAdmin) {
            abort(403);
        }

        try {
            $result = null;

            if ($payment->razorpay_payment_id) {
                $remote = $this->razorpay->payment->fetch($payment->razorpay_payment_id);
                $result = is_object($remote) ? $remote->toArray() : $remote;
            } elseif ($payment->razorpay_order_id) {
                // Fetch payments associated with the order
                $remoteList = $this->razorpay->payment->all(['order_id' => $payment->razorpay_order_id]);
                $result = $remoteList['items'] ?? $remoteList;
            } else {
                return response()->json(['error' => 'No remote identifiers found for this payment'], 422);
            }

            return response()->json(['success' => true, 'remote' => $result]);
        } catch (\Exception $e) {
            Log::error('Admin check payment status failed', ['message' => $e->getMessage(), 'payment_id' => $payment->id]);
            return response()->json(['error' => 'Failed to fetch remote payment status', 'message' => $e->getMessage()], 500);
        }
    }
}
