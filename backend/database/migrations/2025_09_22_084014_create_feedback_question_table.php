<?php

namespace App\Http\Controllers\SuperdAdminController;

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
        return view('feedback.create');
    }

    /**
     * Store a newly created feedback question and its options.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'question_text' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'type' => 'required|string|in:scale,yes/no,open',
        ]);

        // Create the new question
        $question = FeedbackQuestion::create($validatedData);

        // Define the answer options based on the question type
        $options = [];
        switch ($question->type) {
            case 'scale':
                $options = [
                    ['option_text' => 'Very Poor', 'option_value' => '1'],
                    ['option_text' => 'Poor', 'option_value' => '2'],
                    ['option_text' => 'Fair', 'option_value' => '3'],
                    ['option_text' => 'Good', 'option_value' => '4'],
                    ['option_text' => 'Excellent', 'option_value' => '5'],
                ];
                break;
            case 'yes/no':
                $options = [
                    ['option_text' => 'Yes', 'option_value' => '1'],
                    ['option_text' => 'No', 'option_value' => '0'],
                ];
                break;
            // No options are needed for the 'open' type
            case 'open':
            default:
                break;
        }

        // Use the relationship to save the options
        if (!empty($options)) {
            $question->answerOptions()->createMany($options);
        }

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Question and options added successfully!');
    }
}
