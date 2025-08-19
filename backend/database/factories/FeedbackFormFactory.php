<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FeedbackForm>
 */
class FeedbackFormFactory extends Factory
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
            'department_id' => \App\Models\Department::inRandomOrder()->first()->id ?? \App\Models\Department::factory(),
            'name' => $this->faker->catchPhrase(),
            'description' => $this->faker->sentence(),
            'language' => 'en',
            'is_active' => $this->faker->boolean(80),
        ];
    }
}
