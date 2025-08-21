<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\User;
use App\Models\Service;
use App\Models\FeedbackQuestion;
use App\Models\FeedbackResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FeedbackResponseTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $response = new FeedbackResponse();
        $this->assertEquals('feedback_responses', $response->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $response = new FeedbackResponse();
        $this->assertEquals('response_id', $response->getKeyName());
    }

    /** @test */
    public function it_has_correct_key_type()
    {
        $response = new FeedbackResponse();
        $this->assertEquals('string', $response->getKeyType());
    }

    /** @test */
    public function it_has_correct_incrementing_setting()
    {
        $response = new FeedbackResponse();
        $this->assertFalse($response->getIncrementing());
    }

    /** @test */
    public function it_has_fillable_attributes()
    {
        $response = new FeedbackResponse();
        $expectedFillable = [
            'response_id',
            'user_id',
            'question_id',
            'service_id',
            'response_text',
            'numeric_value',
        ];
        $this->assertEquals($expectedFillable, $response->getFillable());
    }

    /** @test */
    public function it_has_correct_casts()
    {
        $response = new FeedbackResponse();
        $expectedCasts = [
            'response_id' => 'string',
            'user_id' => 'string',
            'question_id' => 'string',
            'service_id' => 'string',
            'numeric_value' => 'decimal:2',
            'created_at' => 'datetime',
        ];
        $this->assertEquals($expectedCasts, $response->getCasts());
    }

    /** @test */
    public function it_belongs_to_a_user()
    {
        $user = User::factory()->create();
        $response = FeedbackResponse::factory()->create(['user_id' => $user->user_id]);

        $this->assertInstanceOf(User::class, $response->user);
        $this->assertEquals($user->user_id, $response->user->user_id);
    }

    /** @test */
    public function it_belongs_to_a_question()
    {
        $question = FeedbackQuestion::factory()->create();
        $response = FeedbackResponse::factory()->create(['question_id' => $question->question_id]);

        $this->assertInstanceOf(FeedbackQuestion::class, $response->question);
        $this->assertEquals($question->question_id, $response->question->question_id);
    }

    /** @test */
    public function it_belongs_to_a_service()
    {
        $service = Service::factory()->create();
        $response = FeedbackResponse::factory()->create(['service_id' => $service->service_id]);

        $this->assertInstanceOf(Service::class, $response->service);
        $this->assertEquals($service->service_id, $response->service->service_id);
    }
}
