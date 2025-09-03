<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';
    protected $primaryKey = 'role_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'role_id',
        'name',
        'description',
    ];

    protected $casts = [
        'role_id' => 'string',
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

    /**
     * One-to-many relationship: A Role has many Employees.
     */
    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'role_id', 'role_id');
    }
}
