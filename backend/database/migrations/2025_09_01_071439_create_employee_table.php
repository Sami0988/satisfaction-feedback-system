<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            // UUID primary key
            $table->uuid('employee_id')->primary();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('password');
            // store references as UUID/string for flexibility
            $table->uuid('department_id')->nullable(); // match departments PK type
            $table->uuid('service_id')->nullable();    // match services PK type
            $table->date('hire_date')->nullable(); // ✅ add this

            $table->boolean('active')->default(true);
            $table->timestamps();

            // Indexes for lookups
            $table->index('department_id');
            $table->index('service_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
