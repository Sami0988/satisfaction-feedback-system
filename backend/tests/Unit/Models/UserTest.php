<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\User;
use App\Models\FeedbackResponse;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $user = new User();
        $this->assertEquals('app_users', $user->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $user = new User();
        $this->assertEquals('user_id', $user->getKeyName());
    }

    /** @test */
    public function it_can_be_created_with_factory()
    {
        $user = User::factory()->create();
        $this->assertNotNull($user);
    }

    /** @test */
    public function it_has_fillable_attributes()
    {
        $user = new User();
        $expectedFillable = [
            'user_id',
            'full_name',
            'phone',
            'email',
            'user_type',
            'national_id',
            'active',
            'password',
        ];
        $this->assertEquals($expectedFillable, $user->getFillable());
    }

    /** @test */
    public function it_has_feedback_responses_relationship()
    {
        $user = User::factory()->create();
        $response = FeedbackResponse::factory()->create(['user_id' => $user->user_id]);

        $this->assertTrue($user->feedbackResponses->contains($response));
    }

    /** @test */
    public function it_has_user_roles_relationship()
    {
        $user = User::factory()->create();
        $userRole = UserRole::factory()->create(['user_id' => $user->user_id]);

        $this->assertTrue($user->userRoles->contains($userRole));
    }

    /** @test */
    public function it_has_correct_casts()
    {
        $user = new User();
        $expectedCasts = [
            'user_id' => 'string',
            'active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
        $this->assertEquals($expectedCasts, $user->getCasts());
    }

    /** @test */
   /** @test */
    public function it_returns_correct_user_type_values()
        {
            $citizen = User::factory()->create(['user_type' => 'Citizen']);
            $employee = User::factory()->create(['user_type' => 'Employee']);
            $staff = User::factory()->create(['user_type' => 'Staff']);

            $this->assertEquals('Citizen', $citizen->user_type);
            $this->assertEquals('Employee', $employee->user_type);
            $this->assertEquals('Staff', $staff->user_type);
        }

}