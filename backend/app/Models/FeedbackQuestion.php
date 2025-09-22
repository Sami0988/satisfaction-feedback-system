<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FeedbackQuestion extends Model
{
   use HasFactory;

    protected $table = 'feedback_question'; // Specify the custom table name

    protected $primaryKey = 'question_id'; // Specify the custom primary key name

    protected $fillable = [
        'question_text',
        'category',
        'type',
    ];
}
