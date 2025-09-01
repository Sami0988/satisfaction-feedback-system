<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
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
            ['role_id' => Str::uuid(), 'description' => 'System administrator']
        );

        $managerRole = \App\Models\Role::firstOrCreate(
            ['name' => 'Manager'],
            ['role_id' => Str::uuid(), 'description' => 'Department manager']
        );

        $employeeRole = \App\Models\Role::firstOrCreate(
            ['name' => 'Employee'],
            ['role_id' => Str::uuid(), 'description' => 'Regular employee']
        );

        // 5️⃣ Create Admin employee
        $admin = \App\Models\Employee::factory()->create([
            'full_name' => 'System Admin',
            'email' => 'admin@example.com',
            'department_id' => null,
            'service_id' => null,
            'password' => bcrypt('password'),
        ]);
        $admin->roles()->attach($adminRole->role_id);

        // 6️⃣ Create one manager per department
        $departments->each(function ($department) use ($managerRole) {
            $manager = \App\Models\Employee::factory()->create([
                'department_id' => $department->department_id,
                'service_id' => null,
                'password' => bcrypt('password'),
            ]);
            $manager->roles()->attach($managerRole->role_id);
        });

        // 7️⃣ Create other employees
        $employees = \App\Models\Employee::factory()->count(15)->create([
            'password' => bcrypt('password'),
        ]);

        $employees->each(function ($employee) use ($employeeRole) {
            $employee->roles()->attach($employeeRole->role_id);

            // Assign a random service directly
            $service = \App\Models\Service::inRandomOrder()->first();
            if ($service) {
                $employee->service_id = $service->service_id;
                $employee->save();
            }
        });

        // 8️⃣ Create feedback forms for services
        $services = \App\Models\Service::all();
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
