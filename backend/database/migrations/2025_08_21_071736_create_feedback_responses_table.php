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
            $table->id();
             $table->uuid('response_id')->primary();
            $table->uuid('user_id');
            $table->uuid('question_id');
            $table->uuid('service_id');
            $table->text('response_text')->nullable();
            $table->decimal('numeric_value', 5, 2)->nullable();
        
            
            $table->foreign('user_id')
                  ->references('user_id')
                  ->on('app_users')
                  ->onDelete('cascade');
                  
            $table->foreign('question_id')
                  ->references('question_id')
                  ->on('feedback_questions')
                  ->onDelete('cascade');
                  
            $table->foreign('service_id')
                  ->references('service_id')
                  ->on('services')
                  ->onDelete('cascade');
                  
            $table->index('user_id');
            $table->index('question_id');
            $table->index('service_id');
            $table->index('created_at');
            $table->timestamps();
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
