<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class AdminManualRequestsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_manual_requests_index()
    {
        Config::set('app.admin_emails', ['admin@example.com']);

        $user = User::factory()->create(['email' => 'user@example.com']);
        $admin = User::factory()->create(['email' => 'admin@example.com']);

        $payment = Payment::create([
            'user_id' => $user->id,
            'amount' => 250.00,
            'currency' => 'INR',
            'status' => 'pending',
            'description' => 'Manual request',
            'metadata' => ['manual_request' => true, 'requested_by' => $user->id],
        ]);

        $res = $this->actingAs($admin)->getJson('/admin/payments/manual-requests');
        $res->assertStatus(200);

        $data = $res->json();
        $this->assertArrayHasKey('data', $data);
        $this->assertEquals($payment->id, $data['data'][0]['id']);
    }
}
