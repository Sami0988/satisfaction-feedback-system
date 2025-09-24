<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\FeedbackResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
//     use RefreshDatabase;

//     /** @test */
//     public function it_has_correct_table_name()
//     {
//         $user = new User();
//         $this->assertEquals('app_users', $user->getTable());
//     }

//     /** @test */
//     public function it_has_correct_primary_key()
//     {
//         $user = new User();
//         $this->assertEquals('user_id', $user->getKeyName());
//     }

//     /** @test */
//     public function it_has_correct_key_type()
//     {
//         $user = new User();
//         $this->assertEquals('string', $user->getKeyType());
//     }

//     /** @test */
//     public function it_has_correct_incrementing_setting()
//     {
//         $user = new User();
//         $this->assertFalse($user->getIncrementing());
//     }

//     /** @test */
//     public function it_has_fillable_attributes()
//     {
//         $user = new User();
//         $expectedFillable = [
//             'user_id',
//             'full_name',
//             'phone',
//             'email',
//             'user_type',
//             'national_id',
//             'active',
//             'password',
//         ];
//         $this->assertEquals($expectedFillable, $user->getFillable());
//     }

//     /** @test */
//     public function it_has_hidden_attributes()
//     {
//         $user = new User();
//         $expectedHidden = ['password'];
//         $this->assertEquals($expectedHidden, $user->getHidden());
//     }

//     /** @test */
//     public function it_can_be_created_with_factory()
//     {
//         $user = User::factory()->create();
//         $this->assertNotNull($user);
//     }



//     /** @test */
//     public function it_has_many_feedback_responses()
//     {
//         $user = User::factory()->create();
//         $feedbackResponses = FeedbackResponse::factory()->count(3)->for($user)->create();

//         $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $user->feedbackResponses);
//         $this->assertCount(3, $user->feedbackResponses);
//         $this->assertTrue($user->feedbackResponses->contains($feedbackResponses->first()));
//     }

//     /** @test */
//     public function it_has_correct_casts()
//     {
//         $user = new User();
//         $expectedCasts = [
//             'user_id' => 'string',
//             'active' => 'boolean',
//             'created_at' => 'datetime',
//             'updated_at' => 'datetime',
//         ];
//         $this->assertEquals($expectedCasts, $user->getCasts());
//     }
}
