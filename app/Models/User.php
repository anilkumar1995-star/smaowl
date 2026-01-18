<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'balance',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'balance' => 'decimal:2',
        ];
    }

    /**
     * Get the user's payments.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get user's ledger entries
     */
    public function ledgers()
    {
        return $this->hasMany(Ledger::class);
    }

    /**
     * Add funds to user balance with fixed 2-decimal arithmetic.
     */
    public function addFunds(float $amount): void
    {
        $amt = number_format((float)$amount, 2, '.', '');
        $this->increment('balance', $amt);
    }

    /**
     * Deduct funds from user balance using bc math for safe comparison.
     */
    public function deductFunds(float $amount): bool
    {
        $amt = number_format((float)$amount, 2, '.', '');

        // Ensure we compare with 2 decimal precision to avoid float rounding issues
        if (bccomp((string)$this->balance, $amt, 2) >= 0) {
            $this->decrement('balance', $amt);
            return true;
        }

        return false;
    }
}
