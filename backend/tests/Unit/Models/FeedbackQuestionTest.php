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
    public function it_has_correct_key_type()
    {
        $question = new FeedbackQuestion();
        $this->assertEquals('string', $question->getKeyType());
    }

    /** @test */
    public function it_has_correct_incrementing_setting()
    {
        $question = new FeedbackQuestion();
        $this->assertFalse($question->getIncrementing());
    }

    /** @test */


    /** @test */


    /** @test */

    /** @test */
    public function it_has_many_responses()
    {
        $question = FeedbackQuestion::factory()->create();
        $responses = FeedbackResponse::factory()->count(3)->create(['question_id' => $question->question_id]);

        $this->assertCount(3, $question->responses);
        $this->assertInstanceOf(FeedbackResponse::class, $question->responses->first());
    }
}
