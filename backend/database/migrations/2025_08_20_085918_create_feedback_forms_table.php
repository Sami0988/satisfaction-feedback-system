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
    Schema::create('feedback_forms', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->uuid('department_id');
        $table->string('name');
        $table->text('description')->nullable();
        $table->string('language')->default('en');
        $table->boolean('is_active')->default(true);

        $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback_forms');
    }
};
