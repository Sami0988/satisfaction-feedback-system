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
    Schema::create('feedback_responses', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->uuid('citizen_id')->nullable();
        $table->uuid('employee_id');
        $table->uuid('department_id');
        $table->uuid('question_id');
        $table->text('response_text')->nullable();
        $table->double('numeric_value')->nullable();
        $table->timestamp('created_at')->useCurrent();

        $table->foreign('citizen_id')->references('id')->on('citizens')->onDelete('set null');
        $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
        $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
        $table->foreign('question_id')->references('id')->on('feedback_questions')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback_responses');
    }
};
