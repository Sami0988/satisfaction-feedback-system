<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userType = $this->faker->randomElement(['Citizen', 'Employee', 'Staff']);

        return [
            'user_id'=>Str::uuid(),
            'full_name'=>$this->faker->name(3,true),
            'phone'=>$this->faker->optional(0.7)->phoneNumber,
            'email' => $this->faker->unique()->safeEmail(),

            'user_type'=>$userType,
            'national_id'=>$userType==='Citizen'? $this->faker->numerify('#########'):null,
            'active'=>$this->faker->boolean(90),


        ];
    }
}
