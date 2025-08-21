<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserRole extends Model
{
    use HasFactory;

    protected $table = 'user_roles';
    protected $primaryKey = 'user_role_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_role_id',
        'user_id',
        'role_id',
    ];

    protected $casts = [
        'user_role_id' => 'string',
        'user_id' => 'string',
        'role_id' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }
}