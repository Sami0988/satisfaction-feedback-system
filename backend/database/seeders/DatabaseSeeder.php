<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

    \App\Models\Department::factory(5)->create();

    // Employees
    \App\Models\Employee::factory(20)->create();

    // Employee-Department assignments
    \App\Models\EmployeeDepartment::factory(20)->create();

    // Citizens
    \App\Models\Citizen::factory(10)->create();

    // Feedback Forms
    \App\Models\FeedbackForm::factory(5)->create();

    // Feedback Questions
    \App\Models\FeedbackQuestion::factory(15)->create();

    // Feedback Responses
    \App\Models\FeedbackResponse::factory(30)->create();

    }
}
