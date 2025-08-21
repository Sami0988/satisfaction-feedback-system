<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $role = new Role();
        $this->assertEquals('roles', $role->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $role = new Role();
        $this->assertEquals('role_id', $role->getKeyName());
    }

    /** @test */
    public function it_has_correct_key_type()
    {
        $role = new Role();
        $this->assertEquals('string', $role->getKeyType());
    }

    /** @test */
    public function it_has_correct_incrementing_setting()
    {
        $role = new Role();
        $this->assertFalse($role->getIncrementing());
    }

    /** @test */
    public function it_has_fillable_attributes()
    {
        $role = new Role();
        $expectedFillable = [
            'role_id',
            'name',
            'description',
        ];
        $this->assertEquals($expectedFillable, $role->getFillable());
    }

    /** @test */
    public function it_has_correct_casts()
    {
        $role = new Role();
        $expectedCasts = [
            'role_id' => 'string',
        ];
        $this->assertEquals($expectedCasts, $role->getCasts());
    }


    /** @test */
    public function it_has_many_user_roles()
    {
        $role = Role::factory()->create();
        $userRole = UserRole::factory()->create(['role_id' => $role->role_id]);

        $this->assertTrue($role->userRoles->contains($userRole));
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $role->userRoles);
    }
}
