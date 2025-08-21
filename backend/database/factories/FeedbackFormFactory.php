<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
            'form_id' => Str::uuid(),
            'service_id' => \App\Models\Service::factory(),
            'name' => $this->faker->word(3, true) . ' Feedback Form',
            
           
            'description' => $this->faker->paragraph(),
            'language' => $this->faker->randomElement(['en', 'am']),
            'active' => $this->faker->boolean(90),
           
        ];
    }
}
