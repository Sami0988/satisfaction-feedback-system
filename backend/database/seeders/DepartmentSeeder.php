<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Department::insert([
        [
            'name' => 'Finance',
            'code' => 'FIN',
            'email' => 'finance@company.com',
            'phone' => '+251912345678',
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'HR',
            'code' => 'HR',
            'email' => 'hr@company.com',
            'phone' => '+251987654321',
            'created_at' => now(),
            'updated_at' => now(),
        ]
    ]);
    }
}
