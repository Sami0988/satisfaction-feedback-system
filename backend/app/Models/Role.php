<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';
    protected $primaryKey = 'role_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'role_id',
        'name',
        'description',
    ];

    protected $casts = [
        'role_id' => 'string',
    ];

    /**
     * Many-to-many relationship between roles and employees.
     */
    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(
            Employee::class,
            'employee_role', 
            'role_id',          
            'employee_id',     
            'role_id',         
            'employee_id'      
        )->using(EmployeeRole::class);
    }

    /**
     * One-to-many relationship with the pivot itself.
     */
    public function employeeRoles(): HasMany
    {
        return $this->hasMany(EmployeeRole::class, 'role_id', 'role_id');
    }
}
