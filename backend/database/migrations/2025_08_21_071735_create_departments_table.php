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
        Schema::create('departments', function (Blueprint $table) {
            $table->uuid('department_id')->primary();
            $table->String('name',150);
            $table->String('code',50);
            $table->string('type', 100);
            $table->String('email', 150)->nullable();
            $table->String('phone', 50)->nullable();
        
            $table->timestamps();

            $table->index('code');
            $table->index('type');
            $table->index('name');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
