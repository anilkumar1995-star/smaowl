<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'external_id',
        'name',
        'category',
        'rate',
        'min',
        'max',
        'refill',
        'cancel',
        'meta',
    ];

    protected $casts = [
        'rate' => 'decimal:4',
        'min' => 'integer',
        'max' => 'integer',
        'refill' => 'boolean',
        'cancel' => 'boolean',
        'meta' => 'array',
    ];
}
