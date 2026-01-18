<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Tests\TestCase;

class AdminManualRequestsExportTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_export_manual_requests_csv()
    {
        Config::set('app.admin_emails', ['admin@example.com']);

        $user = User::factory()->create(['email' => 'user@example.com']);
        $admin = User::factory()->create(['email' => 'admin@example.com']);

        Payment::create([
            'user_id' => $user->id,
            'amount' => 250.00,
            'currency' => 'INR',
            'status' => 'pending',
            'description' => 'Manual request',
            'metadata' => ['manual_request' => true, 'requested_by' => $user->id],
        ]);

        $res = $this->actingAs($admin)->get('/admin/payments/manual-requests/export?inline=1');
        $res->assertStatus(200);
        $res->assertHeader('Content-Type', 'text/csv; charset=utf-8');
        $content = $res->getContent();
        $this->assertStringContainsString('user_email', $content);
        $this->assertStringContainsString('amount', $content);
        $this->assertStringContainsString('currency', $content);
        $this->assertStringContainsString('user@example.com', $content);
    }
}
