<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\FeedbackForm;
use App\Models\FeedbackQuestion;
use App\Models\FeedbackResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FeedbackQuestionTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $question = new FeedbackQuestion();
        $this->assertEquals('feedback_question', $question->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $question = new FeedbackQuestion();
        $this->assertEquals('question_id', $question->getKeyName());
    }



    /** @test */
    
}
