<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_role', function (Blueprint $table) {
          
            $table->uuid('employee_id');
            $table->uuid('role_id');

            $table->timestamps();

            // Add indexes (safe). 
            $table->index('employee_id');
            $table->index('role_id');

            // Optional: if you know both tables exist with those PKs you can uncomment FK lines:
            $table->foreign('employee_id')->references('employee_id')->on('employees')->onDelete('cascade');
            $table->foreign('role_id')->references('role_id')->on('roles')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_role');
    }
};
