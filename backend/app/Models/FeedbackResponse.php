<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeedbackResponse extends Model
{
    use HasFactory;

    protected $table = 'feedback_responses';
    protected $primaryKey = 'response_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'response_id',
        'user_id',
        'question_id',
        'service_id',
        'response_text',
        'numeric_value',
    ];

    protected $casts = [
        'response_id' => 'string',
        'user_id' => 'string',
        'question_id' => 'string',
        'service_id' => 'string',
        'numeric_value' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(FeedbackQuestion::class, 'question_id', 'question_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }
}