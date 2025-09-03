<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DepartmentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        // Create a user to act as authenticated
        $this->user = User::factory()->create();
    }

    /** @test */
    public function a_user_can_get_a_paginated_list_of_departments()
    {
        // Create 15 departments to test pagination
        Department::factory()->count(15)->create();

        $response = $this->actingAs($this->user)->getJson('/api/departments');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['department_id', 'name', 'code', 'email', 'phone']
                     ],
                     'meta' => [
                         'current_page',
                         'per_page',
                         'total',
                         'last_page',
                     ]
                 ])
                 ->assertJsonCount(12, 'data'); 
    }

   


    /** @test */
    public function a_user_can_view_a_single_department()
    {
        $department = Department::factory()->create();

        $response = $this->actingAs($this->user)->getJson('/api/departments/' . $department->department_id);

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'department_id' => $department->department_id,
                     'name' => $department->name,
                 ]);
    }



    /** @test */
    public function a_user_can_delete_a_department()
    {
        $department = Department::factory()->create();

        $response = $this->actingAs($this->user)->deleteJson('/api/departments/' . $department->department_id);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('departments', ['department_id' => $department->department_id]);
    }

}
