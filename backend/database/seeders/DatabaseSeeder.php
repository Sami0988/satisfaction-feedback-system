<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // 1️⃣ Create departments
        $departments = \App\Models\Department::factory()->count(15)->create();

        // 2️⃣ Create services for each department
        $departments->each(function ($department) {
            \App\Models\Service::factory()->count(rand(3, 8))->create([
                'department_id' => $department->department_id
            ]);
        });

        // 3️⃣ Create clients (users)
        \App\Models\User::factory()->count(50)->create();

        // 4️⃣ Create roles manually
        $adminRole = \App\Models\Role::firstOrCreate(
            ['name' => 'Admin'],
            ['role_id' => (string) Str::uuid(), 'description' => 'System administrator']
        );

        $managerRole = \App\Models\Role::firstOrCreate(
            ['name' => 'Manager'],
            ['role_id' => (string) Str::uuid(), 'description' => 'Department manager']
        );

        $employeeRole = \App\Models\Role::firstOrCreate(
            ['name' => 'Employee'],
            ['role_id' => (string) Str::uuid(), 'description' => 'Regular employee']
        );

        // 5️⃣ Create Admin employee with the admin role_id
        \App\Models\Employee::factory()->create([
            'full_name' => 'System Admin',
            'email' => 'admin@example.com',
            'department_id' => null,
            'service_id' => null,
            'password' => bcrypt('password'),
            'role_id' => $adminRole->role_id,
        ]);

        // 6️⃣ Create one manager per department with the manager role_id
        $departments->each(function ($department) use ($managerRole) {
            \App\Models\Employee::factory()->create([
                'department_id' => $department->department_id,
                'service_id' => null,
                'password' => bcrypt('password'),
                'role_id' => $managerRole->role_id,
            ]);
        });

        // 7️⃣ Create other employees with the employee role_id and a random service
        $services = \App\Models\Service::all();
        \App\Models\Employee::factory()->count(15)->create([
            'password' => bcrypt('password'),
            'role_id' => $employeeRole->role_id,
            'service_id' => $services->random()->service_id,
        ]);

        // 8️⃣ Create feedback forms for services
        $services->each(function ($service) {
            \App\Models\FeedbackForm::factory()->count(rand(1, 3))->create([
                'service_id' => $service->service_id
            ]);
        });

        // 9️⃣ Create questions for forms
        $forms = \App\Models\FeedbackForm::all();
        $forms->each(function ($form) {
            \App\Models\FeedbackQuestion::factory()->count(rand(5, 15))->create([
                'form_id' => $form->form_id
            ]);
        });

        // 🔟 Create feedback responses
        \App\Models\FeedbackResponse::factory()->count(200)->create();
    }
}
