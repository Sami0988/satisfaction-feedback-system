<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Employee",
 *     type="object",
 *     title="Employee",
 *     required={"id","first_name","last_name"},
 *     @OA\Property(property="id", type="string", example="emp_123"),
 *     @OA\Property(property="first_name", type="string", example="John"),
 *     @OA\Property(property="last_name", type="string", example="Doe"),
 *     @OA\Property(property="position", type="string", example="Manager"),
 *     @OA\Property(property="hire_date", type="string", format="date", example="2023-05-12"),
 *     @OA\Property(property="barcode", type="string", example="123456789"),
 *     @OA\Property(property="employee_id", type="string", example="E-001"),
 *     @OA\Property(property="is_active", type="boolean", example=true),
 * )
 */
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
