<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedbackQuestionTable extends Migration
{
    public function up()
    {
        Schema::create('feedback_question', function (Blueprint $table) {
            $table->id('question_id'); // Using id() for auto-incrementing primary key
            $table->string('question_text');
            $table->string('category');
            $table->string('type');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('feedback_question');
    }
}
