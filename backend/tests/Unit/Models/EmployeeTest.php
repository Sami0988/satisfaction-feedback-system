<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Employee;
use App\Models\Department;
use App\Models\Service;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EmployeeTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $employee = new Employee();
        $this->assertEquals('employees', $employee->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $employee = new Employee();
        $this->assertEquals('employee_id', $employee->getKeyName());
    }

    /** @test */
    public function it_has_correct_key_type()
    {
        $employee = new Employee();
        $this->assertEquals('string', $employee->getKeyType());
    }

    /** @test */
    public function it_has_correct_incrementing_setting()
    {
        $employee = new Employee();
        $this->assertFalse($employee->getIncrementing());
    }

    /** @test */
    public function it_has_fillable_attributes()
    {
        $employee = new Employee();
        $expectedFillable = [
            'employee_id',
            'full_name',
            'email',
            'phone',
            'password',
            'department_id',
            'service_id',
            'role_id',
            'active',
        ];
        $this->assertEquals($expectedFillable, $employee->getFillable());
    }

    /** @test */
    public function it_has_hidden_attributes()
    {
        $employee = new Employee();
        $expectedHidden = ['password'];
        $this->assertEquals($expectedHidden, $employee->getHidden());
    }

    /** @test */
    public function it_can_be_created_with_factory()
    {
        $employee = Employee::factory()->create();
        $this->assertNotNull($employee);
    }

    /** @test */
    public function it_belongs_to_a_department()
    {
        $department = Department::factory()->create();
        $employee = Employee::factory()->for($department)->create();

        $this->assertInstanceOf(Department::class, $employee->department);
        $this->assertEquals($department->department_id, $employee->department->department_id);
    }

    /** @test */
    public function it_belongs_to_a_service()
    {
        $service = Service::factory()->create();
        $employee = Employee::factory()->for($service)->create();

        $this->assertInstanceOf(Service::class, $employee->service);
        $this->assertEquals($service->service_id, $employee->service->service_id);
    }
    
  
}
