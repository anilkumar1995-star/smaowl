<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class DashboardController
{
    public function stats(): JsonResponse
    {
        $totalUsers = User::count();
        $totalOrders = Order::count();
        $totalRevenue = (float) Payment::where('status', 'captured')->sum('amount');

        // Month over month comparisons
        $now = Carbon::now();
        $startOfThisMonth = $now->copy()->startOfMonth();
        $startOfLastMonth = $now->copy()->subMonthNoOverflow()->startOfMonth();
        $endOfLastMonth = $now->copy()->subMonthNoOverflow()->endOfMonth();

        $usersThisMonth = User::where('created_at', '>=', $startOfThisMonth)->count();
        $usersLastMonth = User::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        $ordersThisMonth = Order::where('created_at', '>=', $startOfThisMonth)->count();
        $ordersLastMonth = Order::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        $revenueThisMonth = (float) Payment::where('status', 'captured')->where('created_at', '>=', $startOfThisMonth)->sum('amount');
        $revenueLastMonth = (float) Payment::where('status', 'captured')->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->sum('amount');

        $percentChange = function (float $current, float $previous): string {
            if ($previous <= 0) {
                return $current > 0 ? '+100%' : '+0%';
            }

            $diff = (($current - $previous) / max(1, $previous)) * 100;
            return sprintf("%+.1f%%", $diff);
        };

        return response()->json([
            'users' => [
                'value' => $totalUsers,
                'this_month' => $usersThisMonth,
                'last_month' => $usersLastMonth,
                'change' => $percentChange($usersThisMonth, $usersLastMonth),
            ],
            'orders' => [
                'value' => $totalOrders,
                'this_month' => $ordersThisMonth,
                'last_month' => $ordersLastMonth,
                'change' => $percentChange($ordersThisMonth, $ordersLastMonth),
            ],
            'revenue' => [
                'value' => round($totalRevenue, 2),
                'this_month' => round($revenueThisMonth, 2),
                'last_month' => round($revenueLastMonth, 2),
                'change' => $percentChange($revenueThisMonth, $revenueLastMonth),
            ],
        ]);
    }

    public function series(\Illuminate\Http\Request $request): JsonResponse
    {
        $days = max(1, (int) $request->query('days', 30));
        $now = Carbon::now();
        $start = $now->copy()->subDays($days - 1)->startOfDay();
        $end = $now->copy()->endOfDay();

        $orderCounts = Order::selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date')
            ->toArray();

        $paymentSums = Payment::selectRaw("DATE(created_at) as date, SUM(amount) as sum")
            ->where('status', 'captured')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('sum', 'date')
            ->toArray();

        $data = [];
        for ($i = 0; $i < $days; $i++) {
            $day = $start->copy()->addDays($i);
            $key = $day->toDateString();
            $data[] = [
                'date' => $key,
                'orders' => isset($orderCounts[$key]) ? (int) $orderCounts[$key] : 0,
                'revenue' => isset($paymentSums[$key]) ? (float) round($paymentSums[$key], 2) : 0.0,
            ];
        }

        return response()->json($data);
    }
}
