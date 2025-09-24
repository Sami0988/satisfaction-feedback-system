<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Department;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DepartmentTest extends TestCase
{
    use RefreshDatabase;

    // /** @test */
    // public function it_has_correct_table_name()
    // {
    //     $department = new Department();
    //     $this->assertEquals('departments', $department->getTable());
    // }

    // /** @test */
    // public function it_has_correct_primary_key()
    // {
    //     $department = new Department();
    //     $this->assertEquals('department_id', $department->getKeyName());
    // }

    // /** @test */
    // public function it_has_correct_key_type()
    // {
    //     $department = new Department();
    //     $this->assertEquals('string', $department->getKeyType());
    // }

    // /** @test */
    // public function it_has_correct_incrementing_setting()
    // {
    //     $department = new Department();
    //     $this->assertFalse($department->getIncrementing());
    // }

    // /** @test */
    // public function it_can_be_created_with_factory()
    // {
    //     $department = Department::factory()->create();
    //     $this->assertNotNull($department);
    // }

    // /** @test */
    // public function it_has_fillable_attributes()
    // {
    //     $department = new Department();
    //     $expectedFillable = [
    //         'department_id',
    //         'name',
    //         'code',
    //         'floor',
    //         'email',
    //         'phone',
    //     ];
    //     $this->assertEquals($expectedFillable, $department->getFillable());
    // }

    // /** @test */
    // public function it_has_services_relationship()
    // {
    //     $department = Department::factory()->create();
    //     $service = Service::factory()->create(['department_id' => $department->department_id]);

    //     $this->assertTrue($department->services->contains($service));
    //     $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $department->services);
    // }

    // /** @test */
    // public function it_has_correct_casts()
    // {
    //     $department = new Department();
    //     $expectedCasts = [
    //         'department_id' => 'string',
    //         'created_at' => 'datetime',
    //         'updated_at' => 'datetime',
    //     ];
    //     $this->assertEquals($expectedCasts, $department->getCasts());
    // }
}
