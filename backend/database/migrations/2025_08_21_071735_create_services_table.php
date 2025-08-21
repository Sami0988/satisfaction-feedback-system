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
        Schema::create('services', function (Blueprint $table) {
             $table->uuid('service_id')->primary();
            $table->uuid('department_id');
            $table->string('name', 150);
            $table->string('category', 100)->nullable(); 
            $table->text('description')->nullable();
            $table->boolean('active')->default(true);
           

            $table->foreign('department_id')
                  ->references('department_id')
                  ->on('departments')
                  ->onDelete('cascade');

            $table->index('department_id');
            $table->index('category');
            $table->index('name');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
