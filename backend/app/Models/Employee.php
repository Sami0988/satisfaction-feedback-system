<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Employee extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $table = 'employees';
    protected $primaryKey = 'employee_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'employee_id',
        'full_name',
        'email',
        'phone',
        'password',
        'department_id',
        'service_id',
        'active',
    ];

    protected $hidden = [
        'password',
    ];

    // Auto-generate UUID on create
    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    // Relationship to department 
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id', 'id');
    }

    // Relationship to service 
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }

    // Roles many-to-many via employee_role pivot
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(
            Role::class,
            'employee_role',
            'employee_id',
            'role_id',
            'employee_id',
            'role_id'
        )->using(EmployeeRole::class);
    }

    public function services(): BelongsToMany
{
    return $this->belongsToMany(
        \App\Models\Service::class,
        'employee_service', 
        'employee_id',    
        'service_id'      
    );
}
}
