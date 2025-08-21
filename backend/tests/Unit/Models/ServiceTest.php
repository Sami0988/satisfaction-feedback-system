<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Service;
use App\Models\Department;
use App\Models\FeedbackForm;
use App\Models\FeedbackResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ServiceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_has_correct_table_name()
    {
        $service = new Service();
        $this->assertEquals('services', $service->getTable());
    }

    /** @test */
    public function it_has_correct_primary_key()
    {
        $service = new Service();
        $this->assertEquals('service_id', $service->getKeyName());
    }

    /** @test */
    public function it_has_correct_key_type()
    {
        $service = new Service();
        $this->assertEquals('string', $service->getKeyType());
    }

    /** @test */
    public function it_has_correct_incrementing_setting()
    {
        $service = new Service();
        $this->assertFalse($service->getIncrementing());
    }

    /** @test */
    public function it_can_be_created_with_factory()
    {
        $service = Service::factory()->create();
        $this->assertNotNull($service);
    }

    /** @test */
    public function it_has_fillable_attributes()
    {
        $service = new Service();
        $expectedFillable = [
            'service_id',
            'department_id',
            'name',
            'category',
            'description',
            'active',
        ];
        $this->assertEquals($expectedFillable, $service->getFillable());
    }

    /** @test */
    public function it_belongs_to_a_department()
    {
        $department = Department::factory()->create();
        $service = Service::factory()->create(['department_id' => $department->department_id]);

        $this->assertInstanceOf(Department::class, $service->department);
        $this->assertEquals($department->department_id, $service->department->department_id);
    }

    /** @test */
    public function it_has_feedback_forms_relationship()
    {
        $service = Service::factory()->create();
        $form = FeedbackForm::factory()->create(['service_id' => $service->service_id]);

        $this->assertTrue($service->feedbackForms->contains($form));
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $service->feedbackForms);
    }

    /** @test */
    public function it_has_feedback_responses_relationship()
    {
        $service = Service::factory()->create();
        $response = FeedbackResponse::factory()->create(['service_id' => $service->service_id]);

        $this->assertTrue($service->feedbackResponses->contains($response));
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $service->feedbackResponses);
    }

    /** @test */
    public function it_has_correct_casts()
    {
        $service = new Service();
        $expectedCasts = [
            'service_id' => 'string',
            'department_id' => 'string',
            'active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
        $this->assertEquals($expectedCasts, $service->getCasts());
    }
}
