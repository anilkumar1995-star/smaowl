<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\StaticPageController;

Route::get('/', [StaticPageController::class, 'home'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'is_admin' => in_array(Auth::user()->email, config('app.admin_emails', [])),
        ]);
    })->name('dashboard');

    // Dashboard stats for UI cards
    Route::get('dashboard/stats', [\App\Http\Controllers\DashboardController::class, 'stats'])->name('dashboard.stats');
    // Dashboard series for charts (orders & revenue)
    Route::get('dashboard/series', [\App\Http\Controllers\DashboardController::class, 'series'])->name('dashboard.series');

    // Manual wallet load (user submits a request, admin approves/rejects)
    Route::get('/payments/manual', [\App\Http\Controllers\PaymentController::class, 'manualForm'])->name('payments.manual.create');
    Route::post('/payments/manual', [\App\Http\Controllers\PaymentController::class, 'manualStore'])->name('payments.manual.store');
    // Developer keys
        Route::get('/developer/keys', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'index'])->name('admin.developer.keys');
        Route::post('/developer/keys', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'store'])->name('admin.developer.keys.store');
        Route::post('/developer/keys/{key}/revoke', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'revoke'])->name('admin.developer.keys.revoke');
    });

      Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/create', [OrderController::class, 'create'])->name('create');
        Route::get('/status', [OrderController::class, 'status'])->name('status');
        Route::post('/', [OrderController::class, 'store'])->name('store');
    });

      Route::get('/developer/keys', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'index'])->name('admin.developer.keys');
        Route::post('/developer/keys', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'store'])->name('admin.developer.keys.store');
        Route::post('/developer/keys/{key}/revoke', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'revoke'])->name('admin.developer.keys.revoke');
      Route::prefix('payments')->name('payments.')->group(function () {
        Route::get('/add-funds', [PaymentController::class, 'create'])->name('create');
        Route::post('/order', [PaymentController::class, 'createOrder'])->name('order');
        Route::post('/success', [PaymentController::class, 'success'])->name('success');
        Route::post('/failure', [PaymentController::class, 'failure'])->name('failure');
        Route::get('/history', [PaymentController::class, 'history'])->name('history');
        Route::get('/ledger', [PaymentController::class, 'ledger'])->name('ledger');
    });

    // Admin approval routes (protected by admin_emails check)
    Route::prefix('admin')->middleware(['auth'])->group(function () {
        Route::get('/payments/manual-requests', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'index'])->name('admin.payments.index');
        Route::get('/payments/manual-requests/export', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'export'])->name('admin.payments.export');
        Route::post('/payments/{payment}/approve', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'approve'])->name('admin.payments.approve');
        Route::post('/payments/{payment}/reject', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'reject'])->name('admin.payments.reject');
        // Generic admin status update for any payment
        Route::post('/payments/{payment}/status', [\App\Http\Controllers\PaymentController::class, 'adminUpdateStatus'])->name('admin.payments.update_status');
        Route::post('/payments/{payment}/check', [\App\Http\Controllers\PaymentController::class, 'adminCheckStatus'])->name('admin.payments.check');
       
 Route::get('/developer/keys', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'index'])->name('admin.developer.keys');
        Route::post('/developer/keys', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'store'])->name('admin.developer.keys.store');
        Route::post('/developer/keys/{key}/revoke', [\App\Http\Controllers\Admin\DeveloperKeyController::class, 'revoke'])->name('admin.developer.keys.revoke');
    // Payment routes
    Route::prefix('payments')->name('payments.')->group(function () {
        Route::get('/add-funds', [PaymentController::class, 'create'])->name('create');
        Route::post('/order', [PaymentController::class, 'createOrder'])->name('order');
        Route::post('/success', [PaymentController::class, 'success'])->name('success');
        Route::post('/failure', [PaymentController::class, 'failure'])->name('failure');
        Route::get('/history', [PaymentController::class, 'history'])->name('history');
        Route::get('/ledger', [PaymentController::class, 'ledger'])->name('ledger');
    });

    // Order routes
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/create', [OrderController::class, 'create'])->name('create');
        Route::get('/status', [OrderController::class, 'status'])->name('status');
        Route::post('/', [OrderController::class, 'store'])->name('store');
    });

    // Static pages
});

require __DIR__.'/settings.php';

    // Public static pages (not behind auth)
    Route::get('/about', [StaticPageController::class, 'about'])->name('about');
    Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
    Route::get('/services', [StaticPageController::class, 'services'])->name('services');
    Route::get('/terms', [StaticPageController::class, 'terms'])->name('terms');
    Route::get('/api-docs', [StaticPageController::class, 'api'])->name('api.docs');
