<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'id','citizen_id','employee_id','department_id','question_id',
        'response_text','numeric_value','created_at'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false; // since we use created_at manually

    public function citizen()
    {
        return $this->belongsTo(Citizen::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function question()
    {
        return $this->belongsTo(FeedbackQuestion::class,'question_id');
    }
}
