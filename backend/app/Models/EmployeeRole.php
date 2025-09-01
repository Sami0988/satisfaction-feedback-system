<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EmployeeRole extends Pivot
{
    use HasFactory;

    protected $table = 'employee_role'; 
    protected $primaryKey = 'employee_role_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'employee_role_id',
        'employee_id',
        'role_id',
    ];

    protected $casts = [
        'employee_role_id' => 'string',
        'employee_id' => 'string',
        'role_id' => 'string',
    ];
}
