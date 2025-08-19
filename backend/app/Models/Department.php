<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'name', 'code', 'description', 'parent_id'
    ];

    public $incrementing = false;   // since id is String/UUID
    protected $keyType = 'string';

    public function employees()
    {
        return $this->hasMany(EmployeeDepartment::class);
    }

    public function forms()
    {
        return $this->hasMany(FeedbackForm::class);
    }
}
