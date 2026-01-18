<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class AdminManualRequestsReportsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_sees_reports_and_approved_manual_payments()
    {
        Config::set('app.admin_emails', ['admin@example.com']);

        $user = User::factory()->create(['email' => 'user@example.com']);
        $admin = User::factory()->create(['email' => 'admin@example.com']);

        // pending manual request
        Payment::create([
            'user_id' => $user->id,
            'amount' => 250.00,
            'currency' => 'INR',
            'status' => 'pending',
            'description' => 'Manual request',
            'metadata' => ['manual_request' => true, 'requested_by' => $user->id],
        ]);

        // approved manual payment
        $approved = Payment::create([
            'user_id' => $user->id,
            'amount' => 500.00,
            'currency' => 'INR',
            'status' => 'captured',
            'paid_at' => now(),
            'description' => 'Manual approved',
            'metadata' => ['manual_request' => true, 'requested_by' => $user->id],
        ]);

        $res = $this->actingAs($admin)->getJson('/admin/payments/manual-requests');
        $res->assertStatus(200);

        $data = $res->json();
        $this->assertArrayHasKey('reports', $data);
        $this->assertEquals(1, $data['reports']['pending_count']);
        $this->assertEquals(250.00, (float)$data['reports']['pending_sum']);
        $this->assertEquals(1, $data['reports']['approved_count']);
        $this->assertEquals(500.00, (float)$data['reports']['approved_sum']);

        $this->assertArrayHasKey('approved', $data);
        $this->assertEquals($approved->id, $data['approved']['data'][0]['id']);
    }
}
