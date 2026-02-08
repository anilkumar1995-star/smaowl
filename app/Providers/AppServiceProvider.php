<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
            Schema::defaultStringLength(191);

            Inertia::share([
                'auth' => function () {
                    $user = Auth::user();
                    $isAdmin = $user && in_array($user->email, config('app.admin_emails', []));

                    if ($user) {
                        // Compute net invested amount from ledger entries related to orders
                        $debits = (float) $user->ledgers()->where('type', 'debit')->where('reference_type', 'order')->sum('amount');
                        $credits = (float) $user->ledgers()->where('type', 'credit')->where('reference_type', 'order')->sum('amount');
                        $totalInvested = round($debits - $credits, 2);

                        // Ensure we return a plain array for Inertia so the computed field is always present
                        $userArray = $user->toArray();
                        $userArray['totalInvested'] = $totalInvested;

                        return [
                            'user' => $userArray,
                            'isAdmin' => $isAdmin,
                        ];
                    }

                    return [
                        'user' => null,
                        'isAdmin' => false,
                    ];
                },
                // Feature flag to enable admin developer controls UI
                'developer_controls' => function () {
                    return (bool) config('app.developer_controls', false);
                },
                // Also share a top-level flag for legacy components expecting `props.is_admin`
                'is_admin' => function () {
                    $user = Auth::user();
                    return $user && in_array($user->email, config('app.admin_emails', []));
                },
            ]);
    }
}
