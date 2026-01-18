<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class AdminManualRequestsFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_filter_manual_requests()
    {
        Config::set('app.admin_emails', ['admin@example.com']);

        $user1 = User::factory()->create(['email' => 'alice@example.com']);
        $user2 = User::factory()->create(['email' => 'bob@example.com']);
        $admin = User::factory()->create(['email' => 'admin@example.com']);

        Payment::create([
            'user_id' => $user1->id,
            'amount' => 100.00,
            'currency' => 'INR',
            'status' => 'pending',
            'description' => 'Manual A',
            'metadata' => ['manual_request' => true, 'requested_by' => $user1->id],
            'created_at' => now()->subDays(5),
        ]);

        Payment::create([
            'user_id' => $user2->id,
            'amount' => 500.00,
            'currency' => 'INR',
            'status' => 'pending',
            'description' => 'Manual B',
            'metadata' => ['manual_request' => true, 'requested_by' => $user2->id],
            'created_at' => now()->subDays(1),
        ]);

        // Filter by user_email
        $res = $this->actingAs($admin)->getJson('/admin/payments/manual-requests?user_email=alice');
        $res->assertStatus(200);
        $data = $res->json();
        $this->assertEquals(1, $data['requests']['total']);

        // Filter by min_amount
        $res = $this->actingAs($admin)->getJson('/admin/payments/manual-requests?min_amount=200');
        $res->assertStatus(200);
        $data = $res->json();
        $this->assertEquals(1, $data['requests']['total']);

        // Filter by date range
        $start = now()->subDays(2)->format('Y-m-d');
        $res = $this->actingAs($admin)->getJson('/admin/payments/manual-requests?start_date=' . $start);
        $res->assertStatus(200);
        $data = $res->json();
        // ensure returned items (if any) meet the date filter
        foreach ($data['requests']['data'] as $row) {
            $this->assertTrue(strtotime($row['created_at']) >= strtotime($start . ' 00:00:00'));
        }
    }
}
