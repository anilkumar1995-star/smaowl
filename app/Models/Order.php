<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service',
        'service_name',
        'link',
        'quantity',
        'cost',
        'external_id',
        'status',
        'api_response',
    ];

    protected $casts = [
        'api_response' => 'array',
        'cost' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
