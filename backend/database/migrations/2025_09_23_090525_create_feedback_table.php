<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('feedback', function (Blueprint $table) {
            $table->id('feedback_id');
            $table->uuid('user_id')->nullable();
            $table->uuid('employee_id');
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('app_users')->onDelete('set null');
            $table->foreign('employee_id')->references('employee_id')->on('employees')->onDelete('cascade');
        });

        Schema::create('feedback_answer', function (Blueprint $table) {
            $table->id('answer_id');
            $table->unsignedBigInteger('feedback_id');
            $table->unsignedBigInteger('question_id');
            $table->unsignedBigInteger('option_id')->nullable();
            $table->text('user_text')->nullable();
            $table->timestamps();

            $table->foreign('feedback_id')->references('feedback_id')->on('feedback')->onDelete('cascade');
            $table->foreign('question_id')->references('question_id')->on('feedback_question')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('feedback_answer');
        Schema::dropIfExists('feedback');
    }
};
