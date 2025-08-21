<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Service;
use App\Models\FeedbackForm;
use App\Models\FeedbackQuestion;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FeedbackFormTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $form = new FeedbackForm();
        $this->assertEquals('feedback_forms', $form->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $form = new FeedbackForm();
        $this->assertEquals('form_id', $form->getKeyName());
    }

    /** @test */
    public function it_has_correct_key_type()
    {
        $form = new FeedbackForm();
        $this->assertEquals('string', $form->getKeyType());
    }

    /** @test */
    public function it_has_correct_incrementing_setting()
    {
        $form = new FeedbackForm();
        $this->assertFalse($form->getIncrementing());
    }

    /** @test */
    public function it_can_be_created_with_factory()
    {
        $form = FeedbackForm::factory()->create();
        $this->assertNotNull($form);
    }

    /** @test */
    public function it_has_fillable_attributes()
    {
        $form = new FeedbackForm();
        $expected = [
            'form_id',
            'service_id',
            'name',
            'description',
            'language',
            'active',
        ];
        $this->assertEquals($expected, $form->getFillable());
    }

    /** @test */
    public function it_belongs_to_a_service()
    {
        $service = Service::factory()->create();
        $form = FeedbackForm::factory()->create(['service_id' => $service->service_id]);

        $this->assertInstanceOf(Service::class, $form->service);
        $this->assertEquals($service->service_id, $form->service->service_id);
    }

    /** @test */
    public function it_has_many_questions()
    {
        $form = FeedbackForm::factory()->create();
        $questions = FeedbackQuestion::factory()->count(3)->create(['form_id' => $form->form_id]);

        $this->assertCount(3, $form->questions);
        $this->assertInstanceOf(FeedbackQuestion::class, $form->questions->first());
    }

    /** @test */
    public function it_has_correct_casts()
    {
        $form = new FeedbackForm();
        $expected = [
            'form_id' => 'string',
            'service_id' => 'string',
            'active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
        $this->assertEquals($expected, $form->getCasts());
    }
}
