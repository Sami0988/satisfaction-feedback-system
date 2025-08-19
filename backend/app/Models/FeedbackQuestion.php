<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'id','form_id','question_text','question_type','is_required','display_order','weight'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function form()
    {
        return $this->belongsTo(FeedbackForm::class,'form_id');
    }

    public function responses()
    {
        return $this->hasMany(FeedbackResponse::class,'question_id');
    }
}
