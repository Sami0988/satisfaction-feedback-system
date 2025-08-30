<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Run DepartmentSeeder (which also seeds services)
        $this->call(DepartmentSeeder::class);

        // Create users
        $users = \App\Models\User::factory()->count(50)->create();

        // Create roles
        $roles = \App\Models\Role::factory()->count(10)->create();

        // Assign roles to users
        $users->each(function ($user) use ($roles) {
            $assignedRoles = $roles->shuffle()->take(rand(1, 3));
            foreach ($assignedRoles as $role) {
                \App\Models\UserRole::factory()->create([
                    'user_id' => $user->user_id,
                    'role_id' => $role->role_id
                ]);
            }
        });

        // Create feedback forms for services
        $services = \App\Models\Service::all();
        $services->each(function ($service) {
            \App\Models\FeedbackForm::factory()->count(rand(1, 3))->create([
                'service_id' => $service->service_id
            ]);
        });

        // Create questions for forms
        $forms = \App\Models\FeedbackForm::all();
        $forms->each(function ($form) {
            \App\Models\FeedbackQuestion::factory()->count(rand(5, 15))->create([
                'form_id' => $form->form_id
            ]);
        });

        // Create feedback responses
        \App\Models\FeedbackResponse::factory()->count(200)->create();
    }
}
