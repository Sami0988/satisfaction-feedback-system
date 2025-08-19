<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'id','first_name','last_name','position','hire_date','barcode','employee_id','is_active'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function departments()
    {
        return $this->hasMany(EmployeeDepartment::class);
    }

    public function responses()
    {
        return $this->hasMany(FeedbackResponse::class);
    }
}
