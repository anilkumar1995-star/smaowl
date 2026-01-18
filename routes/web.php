<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Dashboard stats for UI cards
    Route::get('dashboard/stats', [\App\Http\Controllers\DashboardController::class, 'stats'])->name('dashboard.stats');
    // Dashboard series for charts (orders & revenue)
    Route::get('dashboard/series', [\App\Http\Controllers\DashboardController::class, 'series'])->name('dashboard.series');

    // Manual wallet load (user submits a request, admin approves/rejects)
    Route::get('/payments/manual', [\App\Http\Controllers\PaymentController::class, 'manualForm'])->name('payments.manual.create');
    Route::post('/payments/manual', [\App\Http\Controllers\PaymentController::class, 'manualStore'])->name('payments.manual.store');

    // Admin approval routes (protected by admin_emails check)
    Route::prefix('admin')->middleware(['auth'])->group(function () {
        Route::get('/payments/manual-requests', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'index'])->name('admin.payments.index');
        Route::get('/payments/manual-requests/export', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'export'])->name('admin.payments.export');
        Route::post('/payments/{payment}/approve', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'approve'])->name('admin.payments.approve');
        Route::post('/payments/{payment}/reject', [\App\Http\Controllers\Admin\PaymentApprovalController::class, 'reject'])->name('admin.payments.reject');
    });

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
        Route::post('/', [OrderController::class, 'store'])->name('store');
    });
});

require __DIR__.'/settings.php';
