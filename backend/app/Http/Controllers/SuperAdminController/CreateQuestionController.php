<?php

namespace App\Http\Controllers\SuperAdminController;

use App\Http\Controllers\Controller;
use App\Models\FeedbackQuestion;
use Illuminate\Http\Request;

class CreateQuestionController extends Controller
{
    /**
     * Show the form for creating a new feedback question.
     */
    public function create()
    {
        //return view;
        return response()->json([
    'message' => "your feedback question creation page will be displayed."
]);
    }

    /**
     * Store a newly created feedback question in storage.
     */


  public function store(Request $request)

{
    // Validate the incoming request data
    $validated = $request->validate([
        'question_text' => 'required|string|max:255',
        'category' => 'required|string|max:255',
        'type' => 'required|string|in:scale,yes/no,open',
    ]);

    // Create a new FeedbackQuestion instance and save it to the database
    $feedbackQuestion = FeedbackQuestion::create($validated);

    // Return JSON response instead of redirect
    return response()->json([
        'success' => true,
        'message' => 'Question added successfully!',
        'data' => $feedbackQuestion

    ], 201);



}
}
