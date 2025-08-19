<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmployeeDepartment>
 */
class EmployeeDepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'employee_id' => \App\Models\Employee::inRandomOrder()->first()->id ?? \App\Models\Employee::factory(),
            'department_id' => \App\Models\Department::inRandomOrder()->first()->id ?? \App\Models\Department::factory(),
            'is_primary' => $this->faker->boolean(70),
            'start_date' => $this->faker->date(),
            'end_date' => null,
        ];
    }
}
