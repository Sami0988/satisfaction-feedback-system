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
        Schema::create('app_users', function (Blueprint $table) {
            $table->uuid('user_id')->primary();
            $table->string('full_name', 150);
            $table->string('phone', 50)->nullable();
            $table->string('email', 150)->unique();
            $table->enum('user_type', ['Citizen','Employee','Staff']);
            $table->string('national_id', 50)->nullable();
            $table->boolean('active')->default(true);
            
            
            $table->index('user_type');
            $table->index('email');
            $table->index('active');
            $table->index('national_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_users');
    }
};
