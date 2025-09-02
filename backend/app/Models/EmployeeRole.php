<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EmployeeRole extends Pivot
{
    use HasFactory;

    protected $table = 'employee_role'; 
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [

        'employee_id',
        'role_id',
    ];

    protected $casts = [
  
        'employee_id' => 'string',
        'role_id' => 'string',
    ];
}
