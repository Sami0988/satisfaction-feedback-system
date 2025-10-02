<?php

namespace App\Http\Controllers\AdminController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\model\FeedbackAnswer;
use App\Models\FeedbackQuestion;


class FeedbackSummaryController extends Controller
{
    /**

     *
     * @param string $employeeId The ID of the employee to analyze.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEmployeeFeedbackSummary(Request $request, $employeeId)
    {
        // 1. Validation and Existence Check
        if (!Employee::where('employee_id', $employeeId)->exists()) {
            return response()->json(['message' => 'Employee not found.'], 404);
        }

        // Base Query for joining Feedback -> Answer -> Question
        $baseQuery = DB::table('feedback')
            ->join('feedback_answer', 'feedback.feedback_id', '=', 'feedback_answer.feedback_id')
            ->join('feedback_question', 'feedback_answer.question_id', '=', 'feedback_question.question_id')
            ->where('feedback.employee_id', $employeeId);

        // Query for Option-Based Responses (Scale and Yes/No)
        // Joins the answer_options table to retrieve the numerical value (option_value).
        $optionBasedQuery = (clone $baseQuery)
            ->join('answer_options', 'feedback_answer.option_id', '=', 'answer_options.option_id');

        // --- 1. Scale Questions Analysis (Average Rating) ---
        // Value (1-5) is read from answer_options.option_value

        $avgRatingResult = (clone $optionBasedQuery)
            ->where('feedback_question.type', 'scale')
            // Calculate AVG using the numeric option_value
            ->select(DB::raw('AVG(answer_options.option_value) AS average_rating'))
            ->first();

        $averageRating = $avgRatingResult->average_rating ? round((float) $avgRatingResult->average_rating, 2) : 0;

        // --- 2. Yes/No Questions Analysis (Positive/Negative Percentage) ---
        // Clarification: 1 means Positive ('Yes'), 0 means Negative ('No').

        $yesNoResponsesQuery = (clone $optionBasedQuery)
            ->where('feedback_question.type', 'yes/no');

        $yesNoCounts = (clone $yesNoResponsesQuery)
            ->select(
                DB::raw('COUNT(*) as total_responses'),
                // Sum the option_value (1=Positive, 0=Negative) to get the total positive count
                DB::raw("SUM(answer_options.option_value) AS positive_count")
            )
            ->first();

        $totalYesNoResponses = (int) $yesNoCounts->total_responses;
        $positiveCount = (int) $yesNoCounts->positive_count;
        $negativeCount = $totalYesNoResponses - $positiveCount;

        if ($totalYesNoResponses > 0) {
            $positivePercentage = round(($positiveCount / $totalYesNoResponses) * 100, 2);
            $negativePercentage = round(($negativeCount / $totalYesNoResponses) * 100, 2);
        } else {
            $positivePercentage = 0;
            $negativePercentage = 0;
        }

        // --- 3. Open-Ended Questions Analysis (Comments) ---
        // Open-ended questions are fetched using the $baseQuery as they use user_text, not option_id.
        $comments = (clone $baseQuery)
            ->where('feedback_question.type', 'open-ended')
            ->whereNotNull('feedback_answer.user_text')
            ->pluck('feedback_answer.user_text')
            ->toArray();

        // --- Final Result ---
        return response()->json([
            'employee_id' => $employeeId,
            'metrics' => [
                'scale_questions' => [
                    'type' => 'Average Rating (1-5)',
                    'result' => $averageRating,
                    'interpretation' => 'Overall satisfaction score based on 1-5 scale questions.'
                ],
                'yes_no_questions' => [
                    'type' => 'Positive/Negative Percentage',
                    'positive_percent' => $positivePercentage,
                    'negative_percent' => $negativePercentage,
                    'total_responses' => $totalYesNoResponses,
                ],
                'open_ended_comments' => [
                    'type' => 'Customer Comments',
                    'count' => count($comments),
                    'comments' => $comments, // The list of textual feedback
                ]
            ]
        ], 200);
    }
}
