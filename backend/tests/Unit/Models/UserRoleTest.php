<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\UserRole;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserRoleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $userRole = new UserRole();
        $this->assertEquals('user_roles', $userRole->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $userRole = new UserRole();
        $this->assertEquals('user_role_id', $userRole->getKeyName());
    }

    /** @test */
    public function it_has_correct_key_type()
    {
        $userRole = new UserRole();
        $this->assertEquals('string', $userRole->getKeyType());
    }

    /** @test */
    public function it_has_correct_incrementing_setting()
    {
        $userRole = new UserRole();
        $this->assertFalse($userRole->getIncrementing());
    }

    /** @test */
    public function it_has_fillable_attributes()
    {
        $userRole = new UserRole();
        $expectedFillable = [
            'user_role_id',
            'user_id',
            'role_id',
        ];
        $this->assertEquals($expectedFillable, $userRole->getFillable());
    }

    /** @test */
    public function it_has_correct_casts()
    {
        $userRole = new UserRole();
        $expectedCasts = [
            'user_role_id' => 'string',
            'user_id' => 'string',
            'role_id' => 'string',
        ];
        $this->assertEquals($expectedCasts, $userRole->getCasts());
    }

    /** @test */
    public function it_belongs_to_a_user()
    {
        $user = User::factory()->create();
        $userRole = UserRole::factory()->create(['user_id' => $user->user_id]);

        $this->assertInstanceOf(User::class, $userRole->user);
        $this->assertEquals($user->user_id, $userRole->user->user_id);
    }

    /** @test */
    public function it_belongs_to_a_role()
    {
        $role = Role::factory()->create();
        $userRole = UserRole::factory()->create(['role_id' => $role->role_id]);

        $this->assertInstanceOf(Role::class, $userRole->role);
        $this->assertEquals($role->role_id, $userRole->role->role_id);
    }
}
