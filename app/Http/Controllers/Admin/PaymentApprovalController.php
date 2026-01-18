<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Ledger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentApprovalController extends Controller
{
    private function authorized(): bool
    {
        $adminEmails = config('app.admin_emails', []);
        $user = Auth::user();
        return $user && in_array($user->email, $adminEmails);
    }

    public function index(Request $request)
    {
        if (!$this->authorized()) {
            abort(403);
        }

        // Apply filters
        $pendingQuery = Payment::where('status', 'pending')->where('metadata->manual_request', true)->with('user')->orderByDesc('created_at');
        $approvedQuery = Payment::where('status', 'captured')->where('metadata->manual_request', true)->with('user')->orderByDesc('paid_at');

        $filters = $request->only(['user_email', 'start_date', 'end_date', 'min_amount', 'max_amount', 'status']);

        $userEmail = $request->query('user_email');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $minAmount = $request->query('min_amount');
        $maxAmount = $request->query('max_amount');
        $statusFilter = $request->query('status');

        if ($userEmail) {
            $pendingQuery->whereHas('user', function ($q) use ($userEmail) {
                $q->where('email', 'like', '%' . $userEmail . '%');
            });
            $approvedQuery->whereHas('user', function ($q) use ($userEmail) {
                $q->where('email', 'like', '%' . $userEmail . '%');
            });
        }

        if ($startDate) {
            $pendingQuery->where('created_at', '>=', $startDate . ' 00:00:00');
            $approvedQuery->where('paid_at', '>=', $startDate . ' 00:00:00');
        }

        if ($endDate) {
            $pendingQuery->where('created_at', '<=', $endDate . ' 23:59:59');
            $approvedQuery->where('paid_at', '<=', $endDate . ' 23:59:59');
        }

        if ($minAmount) {
            $pendingQuery->where('amount', '>=', (float)$minAmount);
            $approvedQuery->where('amount', '>=', (float)$minAmount);
        }

        if ($maxAmount) {
            $pendingQuery->where('amount', '<=', (float)$maxAmount);
            $approvedQuery->where('amount', '<=', (float)$maxAmount);
        }

        if ($statusFilter) {
            if ($statusFilter === 'pending') {
                $approvedQuery = $approvedQuery->whereRaw('0 = 1');
            }
            if ($statusFilter === 'captured') {
                $pendingQuery = $pendingQuery->whereRaw('0 = 1');
            }
        }

        $requests = $pendingQuery->paginate(20)->appends($request->query());
        $approved = $approvedQuery->paginate(20)->appends($request->query());

        // Reports / summaries
        $pendingCount = $pendingQuery->count();
        $pendingSum = (float) $pendingQuery->sum('amount');
        $approvedCount = $approvedQuery->count();
        $approvedSum = (float) $approvedQuery->sum('amount');

        $reports = [
            'pending_count' => $pendingCount,
            'pending_sum' => $pendingSum,
            'approved_count' => $approvedCount,
            'approved_sum' => $approvedSum,
        ];

        if ($request->wantsJson()) {
            return response()->json([
                'requests' => $requests,
                'approved' => $approved,
                'reports' => $reports,
                'filters' => $filters,
            ]);
        }

        return Inertia::render('admin/payments/manual-requests', [
            'requests' => $requests,
            'approved' => $approved,
            'reports' => $reports,
            'filters' => $filters,
        ]);
    }

    public function approve(Request $request, Payment $payment)
    {
        if (!$this->authorized()) {
            abort(403);
        }

        // Ensure this is a manual request and still pending
        if ($payment->status !== 'pending' || empty($payment->metadata['manual_request'] ?? null)) {
            return response()->json(['error' => 'Payment is not a pending manual request'], 422);
        }

        DB::transaction(function () use ($payment) {
            $payment->update([
                'status' => 'captured',
                'paid_at' => now(),
            ]);

            // Add funds to user balance
            $payment->user->addFunds((float)$payment->amount);
            $payment->user->refresh();

            Ledger::create([
                'user_id' => $payment->user->id,
                'type' => 'credit',
                'amount' => number_format((float)$payment->amount, 2, '.', ''),
                'balance' => number_format((float)$payment->user->balance, 2, '.', ''),
                'reference_type' => 'payment',
                'reference_id' => $payment->id,
                'description' => 'Manual wallet load approved by admin',
            ]);
        });

        // If request expects HTML, redirect back with success flash
        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->back()->with('success', 'Manual load approved');
    }

    public function reject(Request $request, Payment $payment)
    {
        if (!$this->authorized()) {
            abort(403);
        }

        if ($payment->status !== 'pending' || empty($payment->metadata['manual_request'] ?? null)) {
            return response()->json(['error' => 'Payment is not a pending manual request'], 422);
        }

        $payment->update([
            'status' => 'failed',
            'metadata' => array_merge((array)$payment->metadata, ['rejected_by' => Auth::id(), 'rejected_reason' => $request->input('reason')]),
        ]);

        return response()->json(['success' => true]);
    }

    public function export(Request $request)
    {
        if (!$this->authorized()) {
            abort(403);
        }

        $query = Payment::where('metadata->manual_request', true)->with('user')->orderByDesc('created_at');

        if ($userEmail = $request->query('user_email')) {
            $query->whereHas('user', function ($q) use ($userEmail) {
                $q->where('email', 'like', '%' . $userEmail . '%');
            });
        }

        if ($start = $request->query('start_date')) {
            $query->where('created_at', '>=', $start . ' 00:00:00');
        }

        if ($end = $request->query('end_date')) {
            $query->where('created_at', '<=', $end . ' 23:59:59');
        }

        if ($min = $request->query('min_amount')) {
            $query->where('amount', '>=', (float)$min);
        }

        if ($max = $request->query('max_amount')) {
            $query->where('amount', '<=', (float)$max);
        }

        $rows = $query->get();

        $filename = 'manual-requests-' . date('Ymd_His') . '.csv';

        // For testing convenience, support inline CSV output
        if ($request->query('inline') === '1') {
            $out = fopen('php://memory', 'r+');
            fputcsv($out, ['id', 'user_email', 'amount', 'currency', 'status', 'description', 'created_at', 'paid_at', 'metadata']);

            foreach ($rows as $r) {
                fputcsv($out, [
                    $r->id,
                    $r->user->email ?? null,
                    number_format((float)$r->amount, 2, '.', ''),
                    $r->currency,
                    $r->status,
                    $r->description,
                    $r->created_at,
                    $r->paid_at,
                    json_encode($r->metadata),
                ]);
            }

            rewind($out);
            $csv = stream_get_contents($out);
            fclose($out);

            return response($csv, 200, [
                'Content-Type' => 'text/csv; charset=utf-8',
                'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            ]);
        }

        return response()->streamDownload(function () use ($rows) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['id', 'user_email', 'amount', 'currency', 'status', 'description', 'created_at', 'paid_at', 'metadata']);

            foreach ($rows as $r) {
                fputcsv($out, [
                    $r->id,
                    $r->user->email ?? null,
                    number_format((float)$r->amount, 2, '.', ''),
                    $r->currency,
                    $r->status,
                    $r->description,
                    $r->created_at,
                    $r->paid_at,
                    json_encode($r->metadata),
                ]);
            }

            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }
}
