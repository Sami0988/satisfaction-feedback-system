<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update(Request $request)
    {
        try {
            $request->validate([
                'current_password' => 'required',
                'new_password' => [
                    'required',
                    'string',
                    'min:8',
                    'regex:/[A-Z]/',
                    'regex:/[0-9]/',
                    'regex:/[@$!%*?&]/',
                    'confirmed',
                ],
            ]);

            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated.'], 401);
            }

            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json(['message' => 'Current password is incorrect.'], 400);
            }

            $user->update([
                'password' => Hash::make($request->new_password)
            ]);

            return response()->json(['message' => 'Password updated successfully.'], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()  // 🔍 helps you debug
            ], 500);
        }
    }
}
