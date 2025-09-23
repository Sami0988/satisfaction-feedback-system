<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\Employee;

class ForgotPasswordController extends Controller
{
    /**
     * Step 1: Send reset password link to email
     */
  public function sendResetLink(Request $request)
{
    $request->validate([
        'email' => 'required|email|exists:employees,email',
    ]);

    // generate token
    $token = Str::random(60);

    // store token in password_resets table
    DB::table('password_resets')->updateOrInsert(
        ['email' => $request->email],
        [
            'token' => $token,
            'created_at' => Carbon::now(),
        ]
    );

    // get frontend URL from env
    $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
    $resetLink = $frontendUrl . '/reset-password/' . $token;

    // send email
    Mail::raw(
        "You requested a password reset.\n\nClick the link below to reset your password:\n$resetLink",
        function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Password Reset Request');
        }
    );

    return response()->json(['message' => 'Password reset link sent! Check your email.']);
}



    /**
     * Step 2: Reset password using token (no email required)
     */
    public function resetPassword(Request $request, $token)
    {
        $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Find reset record by token only
        $resetRecord = DB::table('password_resets')
            ->where('token', $token)
            ->first();

        if (!$resetRecord) {
            return response()->json(['message' => 'Invalid or expired token'], 400);
        }

        // Find the user by email from reset record
        $user = Employee::where('email', $resetRecord->email)->first();

        if (!$user) {
            return response()->json(['message' => 'No user found for this reset link'], 404);
        }

        // Update password
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete token after use
        DB::table('password_resets')->where('email', $resetRecord->email)->delete();

        return response()->json(['message' => 'Password has been successfully reset!']);
    }
}
