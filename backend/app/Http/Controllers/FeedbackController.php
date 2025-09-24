<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\Employee;
use App\Models\Feedback;
use App\Models\FeedbackAnswer;
use App\Models\FeedbackQuestion;
use App\Models\ServiceRequest;
use App\Models\ServiceRequestDone;
use App\Models\User;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function showServiceCodeForm($employee_qr_code)
    {
        $employee = Employee::where('qr_code_identifier', $employee_qr_code)->firstOrFail();
       // return view('feedback.verify_code', compact('employee'));
       return response()->json([
    'message' => "verified"
]);
    }

    public function showFeedbackForm(Request $request)
    {
        $request->validate([
            'service_code' => 'required|digits:6|exists:service_request,service_code',
            'employee_id' => 'required|exists:employees,employee_id',
        ]);

        $serviceRequest = ServiceRequest::where('service_code', $request->service_code)->first();
        if ($serviceRequest->status !== 'done') {
            return back()->withErrors(['service_code' => 'Service has not been completed yet.']);
        }

        $serviceRequestDone = ServiceRequestDone::where('request_id', $serviceRequest->request_id)
            ->where('employee_id', $request->employee_id)
            ->first();

        if (!$serviceRequestDone) {
            return back()->withErrors(['service_code' => 'Service was not provided by this employee.']);
        }

        $employee = Employee::with('department')->find($request->employee_id);
        $questions = FeedbackQuestion::with('answerOptions')->get();

       // return view('feedback.form', compact('employee', 'questions'));
       return response()->json([
    'message' => "form generated"]);
    }

    public function store(Request $request)
    {
        $userId = null;
        if ($request->filled(['full_name', 'email', 'phone'])) {
            $user = User::firstOrCreate(
                ['email' => $request->email],
                ['full_name' => $request->full_name, 'phone' => $request->phone]
            );
            $userId = $user->user_id;
        }

        $feedback = Feedback::create([
            'user_id' => $userId,
            'employee_id' => $request->employee_id,
        ]);

        foreach ($request->all() as $key => $value) {
            if (str_starts_with($key, 'question_')) {
                $questionId = substr($key, 9);
                $question = FeedbackQuestion::find($questionId);
                $answerData = [
                    'feedback_id' => $feedback->feedback_id,
                    'question_id' => $questionId,
                ];

                if ($question->type === 'open') {
                    $answerData['user_text'] = $value;
                } else {
                    $answerData['option_id'] = $value;
                }
                FeedbackAnswer::create($answerData);
            }
        }
        return redirect('/')->with('success', 'Feedback submitted successfully!');
    }
}
