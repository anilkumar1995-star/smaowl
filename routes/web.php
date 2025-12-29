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

    // Payment routes
    Route::prefix('payments')->name('payments.')->group(function () {
        Route::get('/add-funds', [PaymentController::class, 'create'])->name('create');
        Route::post('/order', [PaymentController::class, 'createOrder'])->name('order');
        Route::post('/success', [PaymentController::class, 'success'])->name('success');
        Route::post('/failure', [PaymentController::class, 'failure'])->name('failure');
        Route::get('/history', [PaymentController::class, 'history'])->name('history');
    });

    // Order routes
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/create', [OrderController::class, 'create'])->name('create');
        Route::post('/', [OrderController::class, 'store'])->name('store');
    });
});

require __DIR__.'/settings.php';
