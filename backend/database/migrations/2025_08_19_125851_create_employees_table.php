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
                $table->uuid('id')->primary();
                $table->string('first_name');
                $table->string('last_name');
                $table->string('position');
                $table->date('hire_date');
                $table->string('barcode')->unique();
                $table->string('employee_id')->unique();
                $table->boolean('is_active')->default(true);

                $table->timestamps();
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
