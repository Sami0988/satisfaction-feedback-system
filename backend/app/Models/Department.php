<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    use HasFactory;

    protected $table = 'departments';
    protected $primaryKey = 'department_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'department_id',
        'name',
        'code',
        'email',
        'phone',
    ];

    protected $casts = [
        'department_id' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'department_id', 'department_id');
    }
}