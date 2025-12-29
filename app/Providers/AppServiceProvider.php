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
                    if ($user) {
                        $totalInvested = $user->payments()->whereNotIn('status', ['failed', 'cancelled'])->sum('amount');
                        $user->totalInvested = $totalInvested;
                    }
                    return [
                        'user' => $user,
                    ];
                },
            ]);
    }
}
