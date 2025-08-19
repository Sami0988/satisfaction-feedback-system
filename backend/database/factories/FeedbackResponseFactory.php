<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FeedbackResponse>
 */
class FeedbackResponseFactory extends Factory
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
            'citizen_id' => \App\Models\Citizen::inRandomOrder()->first()->id ?? \App\Models\Citizen::factory(),
            'employee_id' => \App\Models\Employee::inRandomOrder()->first()->id ?? \App\Models\Employee::factory(),
            'department_id' => \App\Models\Department::inRandomOrder()->first()->id ?? \App\Models\Department::factory(),
            'question_id' => \App\Models\FeedbackQuestion::inRandomOrder()->first()->id ?? \App\Models\FeedbackQuestion::factory(),
            'response_text' => $this->faker->sentence(),
            'numeric_value' => $this->faker->numberBetween(1, 5),
            'created_at' => now(),
        ];
    }
}
