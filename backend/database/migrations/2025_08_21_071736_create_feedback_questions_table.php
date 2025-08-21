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
            $table->id();
             $table->uuid('question_id')->primary();
            $table->uuid('form_id');
            $table->text('question_text');
            $table->string('question_type', 50); 
            $table->boolean('is_required')->default(true);
            $table->integer('display_order')->default(0);
            $table->decimal('weight', 5, 2)->default(1.00);
            
            $table->foreign('form_id')
                  ->references('form_id')
                  ->on('feedback_forms')
                  ->onDelete('cascade');
                  
            $table->index('form_id');
            $table->index('question_type');
            $table->index('display_order');
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
