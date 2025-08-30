<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Service;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        // Create 15 departments
        $departments = Department::factory()->count(15)->create();

        // For each department, create 3-8 services with the same department_id
        $departments->each(function ($department) {
            Service::factory()->count(rand(3, 8))->create([
                'department_id' => $department->department_id
            ]);
        });
    }
}
