<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
        $questionType = $this->faker->randomElement(['rating', 'text', 'yes_no']);
        
        $responseText = null;
        $numericValue = null;
        
        if ($questionType === 'rating') {
            $numericValue = $this->faker->numberBetween(1, 5);
        } elseif ($questionType === 'text') {
            $responseText = $this->faker->paragraph;
        } elseif ($questionType === 'yes_no') {
            $responseText = $this->faker->randomElement(['Yes', 'No']);
        }
        
        return [
            'response_id' => Str::uuid(),
            'user_id' => \App\Models\User::factory(),
            'question_id' => \App\Models\FeedbackQuestion::factory(),
            'service_id' => \App\Models\Service::factory(),
            'response_text' => $responseText,
            'numeric_value' => $numericValue,
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }
}
