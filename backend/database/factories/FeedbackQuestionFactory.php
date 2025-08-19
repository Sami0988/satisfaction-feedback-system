<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
            'id' => $this->faker->uuid(),
            'form_id' => \App\Models\FeedbackForm::inRandomOrder()->first()->id ?? \App\Models\FeedbackForm::factory(),
            'question_text' => $this->faker->sentence(),
            'question_type' => $this->faker->randomElement(['text', 'rating', 'choice']),
            'is_required' => $this->faker->boolean(70),
            'display_order' => $this->faker->numberBetween(1, 10),
            'weight' => $this->faker->randomFloat(1, 0.5, 5),
        ];
    }
}
