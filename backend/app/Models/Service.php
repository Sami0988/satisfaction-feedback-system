<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';
    protected $primaryKey = 'service_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'service_id',
        'department_id',
        'name',
        'category',
        'description',
        'active',
    ];

    protected $casts = [
        'service_id' => 'string',
        'department_id' => 'string',
        'active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }

    public function feedbackForms(): HasMany
    {
        return $this->hasMany(FeedbackForm::class, 'service_id', 'service_id');
    }

    public function feedbackResponses(): HasMany
    {
        return $this->hasMany(FeedbackResponse::class, 'service_id', 'service_id');
    }
}