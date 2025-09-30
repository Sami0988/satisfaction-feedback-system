<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\FeedbackQuestion;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    /**
     * Retrieve all feedback questions
     */
    public function index()
    {
        $questions = FeedbackQuestion::all();

        return response()->json([
            'success' => true,
            'data' => $questions,
        ]);
    }

    /**
     * Retrieve a single feedback question by ID
     */
    public function show($id)
    {
        $question = FeedbackQuestion::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $question,
        ]);
    }
}
