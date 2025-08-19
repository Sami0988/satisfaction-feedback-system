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
        Schema::create('feedback_questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('form_id');
            $table->text('question_text');
            $table->string('question_type'); // text, rating, multiple-choice, etc.
            $table->boolean('is_required')->default(false);
            $table->integer('display_order')->default(0);
            $table->double('weight')->default(1);

            $table->foreign('form_id')->references('id')->on('feedback_forms')->onDelete('cascade');

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback_questions');
    }
};
