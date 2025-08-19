<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'id','department_id','name','description','language','is_active'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function questions()
    {
        return $this->hasMany(FeedbackQuestion::class,'form_id');
    }
}
