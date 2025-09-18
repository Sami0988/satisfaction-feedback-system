<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    /**
     * Update the authenticated user's password.
     */
    public function update(Request $request)
    {
        // Validation
        $request->validate([
            'current_password' => 'required',
            'new_password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',     // at least one uppercase
                'regex:/[0-9]/',     // at least one number
                'regex:/[@$!%*?&]/', // at least one special char
                'confirmed',         // must match new_password_confirmation
            ],
        ]);

        // ✅ Get user from Sanctum token
        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect.'
            ], 400);
        }

        // Update password
        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'message' => 'Password updated successfully.'
        ], 200);
    }
}
