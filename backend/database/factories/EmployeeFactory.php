<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Department;
use App\Models\Service;
use App\Models\Role;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    public function definition(): array
    {
        $department = Department::inRandomOrder()->first();
        $service = Service::inRandomOrder()->first();
        // Get a random role from the database to assign by default
        $role = Role::inRandomOrder()->first();

        return [
            'employee_id' => Str::uuid(),
            'full_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->optional(0.8)->phoneNumber(),
            'department_id' => $department ? $department->department_id : null,
            'service_id' => $service ? $service->service_id : null,
            'role_id' => $role ? $role->role_id : null,
            'active' => $this->faker->boolean(90),
            'password' => bcrypt('password'), // default password
            'hire_date' => $this->faker->date(),
        ];
    }
}
