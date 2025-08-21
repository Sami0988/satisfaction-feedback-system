<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FeedbackQuestion>
 */
class FeedbackQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question_id' => Str::uuid(),
            'form_id' => \App\Models\FeedbackForm::factory(),
            'question_text' => $this->faker->sentence(6, true),
            'question_type' => $this->faker->randomElement(['text', 'rating', 'multiple_choice','yes/No']),
           
            'is_required' => $this->faker->boolean(80),
            'display_order' => $this->faker->numberBetween(1, 20),
            'weight' => $this->faker->randomFloat(2, 0.5, 5.0),
            
        ];
    }
}
