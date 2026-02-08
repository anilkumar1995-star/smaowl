<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'razorpay_payment_id' => fake()->uuid(),
            'razorpay_order_id' => fake()->uuid(),
            'amount' => fake()->randomFloat(2, 10, 1000),
            'currency' => 'INR',
            'status' => fake()->randomElement(['pending', 'captured', 'failed']),
            'method' => fake()->randomElement(['card', 'netbanking', 'upi']),
            'description' => fake()->sentence(),
            'paid_at' => fake()->optional()->dateTimeBetween('-1 year', 'now'),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => now(),
        ];
    }
}