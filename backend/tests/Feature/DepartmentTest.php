<?php

use App\Models\Department;

test('can create a department', function () {
    $department = Department::factory()->create([
        'name' => 'IT Department', 
        'code' => 'IT001',
    ]);

    $this->assertEquals('IT Department', $department->name);
    $this->assertEquals('IT001', $department->code);
});