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
        $this->assertEquals('feedback_questions', $question->getTable());
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
    public function it_has_fillable_attributes()
    {
        $question = new FeedbackQuestion();
        $expectedFillable = [
            'question_id',
            'form_id',
            'question_text',
            'question_type',
            'is_required',
            'display_order',
            'weight',
        ];
        $this->assertEquals($expectedFillable, $question->getFillable());
    }

    /** @test */
    public function it_has_correct_casts()
    {
        $question = new FeedbackQuestion();
        $expectedCasts = [
            'question_id' => 'string',
            'form_id' => 'string',
            'is_required' => 'boolean',
            'weight' => 'decimal:2',
        ];
        $this->assertEquals($expectedCasts, $question->getCasts());
    }

    /** @test */
    public function it_belongs_to_a_form()
    {
        $form = FeedbackForm::factory()->create();
        $question = FeedbackQuestion::factory()->create(['form_id' => $form->form_id]);

        $this->assertInstanceOf(FeedbackForm::class, $question->form);
        $this->assertEquals($form->form_id, $question->form->form_id);
    }

    /** @test */
    public function it_has_many_responses()
    {
        $question = FeedbackQuestion::factory()->create();
        $responses = FeedbackResponse::factory()->count(3)->create(['question_id' => $question->question_id]);

        $this->assertCount(3, $question->responses);
        $this->assertInstanceOf(FeedbackResponse::class, $question->responses->first());
    }
}
