<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register logic
    public function register(Request $request)
    {
        $request->validate([
            'full_name'   => 'required|string|max:255',
            'phone'       => 'nullable|string|max:20',
            'email'       => 'required|string|email|max:255|unique:app_users,email',
            'password'    => 'required|string|min:6|confirmed',
            'user_type'   => 'nullable|string',
            'national_id' => 'nullable|string|max:50',
        ]);

        $user = User::create([
            'user_id'     => (string) Str::uuid(), // generate UUID
            'full_name'   => $request->full_name,
            'phone'       => $request->phone,
            'email'       => $request->email,
            'user_type'   => $request->user_type ?? 'customer',
            'national_id' => $request->national_id,
            'active'      => true,
            'password'    => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 201);
    }

    // Login logic
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }

    // Logout logic
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
