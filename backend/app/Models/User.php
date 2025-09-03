<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // 👈 change from Model
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'app_users';
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'email',
        'user_type',
        'national_id',
        'active',
        'password',   // ✅ must be fillable
    ];

    protected $hidden = [
        'password',   // ✅ hide password in responses
    ];

    protected $casts = [
        'user_id' => 'string',
        'active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(
            Role::class,
            'user_role',
            'user_id',
            'role_id',
            'user_id',
            'role_id'
        );
    }

    public function feedbackResponses(): HasMany
    {
        return $this->hasMany(FeedbackResponse::class, 'user_id', 'user_id');
    }

    
}
