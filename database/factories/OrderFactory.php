<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
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
            'service' => fake()->word(),
            'service_name' => fake()->sentence(),
            'link' => fake()->url(),
            'quantity' => fake()->numberBetween(1, 100),
            'cost' => fake()->randomFloat(2, 10, 1000),
            'external_id' => fake()->uuid(),
            'status' => fake()->randomElement(['pending', 'success', 'failed']),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => now(),
        ];
    }
}