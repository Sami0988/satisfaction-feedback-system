<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

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
        'floor',
        'email',
        'phone',
    ];

    protected $casts = [
        'department_id' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

  protected static function booted()
{
    static::creating(function ($model) {
        // Generate department_id if empty
        if (empty($model->{$model->getKeyName()})) {
            $model->{$model->getKeyName()} = (string) Str::uuid();
        }

        // Generate department code if empty
        if (empty($model->code)) {
            $model->code = 'DEP-' . strtoupper(substr(uniqid(), -8));
        }
    });
}


    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'department_id', 'department_id');
    }


}
