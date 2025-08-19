<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Citizen extends Model
{
    use HasFactory;

    protected $fillable = [
        'id','first_name','phone','password','is_anonymous'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $hidden = ['password'];

    public function responses()
    {
        return $this->hasMany(FeedbackResponse::class);
    }
}
