<?php

namespace Tests\Feature;

use App\Models\Payment;
use App\Models\User;
use App\Models\Ledger;
use Carbon\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ManualWalletRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_submit_manual_request_and_admin_can_approve()
    {
        // set admin email config for authorization
        Config::set('app.admin_emails', ['admin@example.com']);

        $user = User::factory()->create(['email' => 'user@example.com', 'balance' => 0]);
        $admin = User::factory()->create(['email' => 'admin@example.com']);

        // User submits a manual request
        $res = $this->actingAs($user)->postJson('/payments/manual', ['amount' => 500, 'note' => 'Bank transfer']);
        $res->assertStatus(200)->assertJson(['success' => true]);

        $paymentId = $res->json('payment_id');

        $payment = Payment::find($paymentId);
        $this->assertNotNull($payment);
        // Payment should be pending with manual_request flag in metadata
        $this->assertEquals('pending', $payment->status);
        $this->assertTrue(!empty($payment->metadata['manual_request']));
        $this->assertEquals($user->id, $payment->metadata['requested_by']);

        // Admin approves
        $approve = $this->actingAs($admin)->postJson("/admin/payments/{$payment->id}/approve");
        $approve->assertStatus(200)->assertJson(['success' => true]);

        $payment->refresh();
        $this->assertEquals('captured', $payment->status);
        $this->assertNotNull($payment->paid_at);

        $user->refresh();
        $this->assertEquals(500.00, (float)$user->balance);

        // Ledger entry exists
        $ledger = Ledger::where('reference_type', 'payment')->where('reference_id', $payment->id)->first();
        $this->assertNotNull($ledger);
        $this->assertEquals('credit', $ledger->type);
    }
}
