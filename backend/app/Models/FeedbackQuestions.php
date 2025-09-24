<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FeedbackQuestions extends Model
{
    use HasFactory;

    protected $table = 'feedback_questions';
    protected $primaryKey = 'question_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'question_id',
        'form_id',
        'question_text',
        'question_type',
        'is_required',
        'display_order',
        'weight',
    ];

    protected $casts = [
        'question_id' => 'string',
        'form_id' => 'string',
        'is_required' => 'boolean',
        'weight' => 'decimal:2',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(FeedbackForm::class, 'form_id', 'form_id');
    }

    public function responses(): HasMany
    {
        return $this->hasMany(FeedbackResponse::class, 'question_id', 'question_id');
    }
}
