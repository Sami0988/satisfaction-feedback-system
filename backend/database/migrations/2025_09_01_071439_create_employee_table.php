<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('employees', function (Blueprint $table) {
            // UUID primary key
            $table->uuid('employee_id')->primary();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('password');


            // Add the role_id column and foreign key constraint
            $table->uuid('role_id')->nullable();

            // Foreign key constraints
            $table->foreign('role_id')->references('role_id')->on('roles')->onDelete('set null');
            $table->foreignUuid('department_id')->nullable()->constrained('departments', 'department_id')->onDelete('set null');
            $table->foreignUuid('service_id')->nullable()->constrained('services', 'service_id')->onDelete('set null');

            $table->date('hire_date')->nullable();
            $table->boolean('active')->default(true);

            $table->timestamps();

            // Indexes for lookups
            $table->index('department_id');
            $table->index('service_id');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');


}
};
