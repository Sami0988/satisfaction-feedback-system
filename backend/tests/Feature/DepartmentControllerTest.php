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
 
}
