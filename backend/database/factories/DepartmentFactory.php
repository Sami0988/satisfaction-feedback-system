<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'department_id'=> Str::uuid(),
            'name'=>$this->faker->company,
            'code' => 'DEP-' . \Illuminate\Support\Str::uuid(),
            'email'=>$this->faker->optional(0.7)->companyEmail,
            'phone'=>$this->faker->optional(0.7)->phoneNumber,
        ];
    }
}
