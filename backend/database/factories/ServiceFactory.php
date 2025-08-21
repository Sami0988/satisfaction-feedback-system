<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Department;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_id'=> Str::uuid(),
            'department_id'=> Department::factory(),
            'name'=>$this->faker->word(3,true) .'service',
            'category'=>$this->faker->randomElement(['Recruitment', 'Training', 'Consultation', 'Support', 
                'Registration', 'Certification', 'Licensing', 'Complaint']),
            'description'=>$this->faker->paragraph(),
            'active'=>$this->faker->boolean(90),

        ];
    }
}
