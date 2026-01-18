<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardSeriesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_series_for_orders_and_revenue()
    {
        $user = User::factory()->create();

        $days = 7;
        $now = Carbon::now();

        // create increasing amounts of orders and payments
        for ($i = 0; $i < $days; $i++) {
            $date = $now->copy()->subDays($i)->startOfDay();
            // create $i orders on that date
            for ($j = 0; $j < $i; $j++) {
                Order::create([
                    'user_id' => $user->id,
                    'service' => 'social',
                    'service_name' => 'Test Service',
                    'link' => 'https://example.com',
                    'quantity' => 1,
                    'cost' => 100 + $i,
                    'status' => 'completed',
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
            }

            // create one successful payment per day of amount 100 * (i+1)
            Payment::create([
                'user_id' => $user->id,
                'razorpay_payment_id' => 'p' . $i,
                'razorpay_order_id' => 'o' . $i,
                'amount' => 100 * ($i + 1),
                'currency' => 'INR',
                'status' => 'captured',
                'method' => 'card',
                'description' => null,
                'metadata' => null,
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }

        $response = $this->actingAs($user)->getJson('/dashboard/series?days=' . $days);

        $response->assertStatus(200);

        $data = $response->json();
        $this->assertCount($days, $data);

        // the most recent day (index $days-1) should have 0 orders (since loop started at 0 orders) and largest payment
        $this->assertArrayHasKey('date', $data[0]);
        $this->assertArrayHasKey('orders', $data[0]);
        $this->assertArrayHasKey('revenue', $data[0]);

        // verify revenue values are numeric
        foreach ($data as $point) {
            $this->assertIsNumeric($point['revenue']);
            $this->assertIsInt($point['orders']);
        }
    }
}
