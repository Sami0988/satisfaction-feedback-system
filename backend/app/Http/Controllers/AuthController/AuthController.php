<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Employee;
use App\Models\Role;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     tags={"Authentication"},
     *     summary="Login user using email or phone",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"username","password"},
     *             @OA\Property(property="username", type="string", example="user@example.com or 0912345678"),
     *             @OA\Property(property="password", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Successful login"),
     *     @OA\Response(response=401, description="Invalid credentials")
     * )
     */
   public function login(Request $request)
{
    $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = Employee::where('email', $request->username)
                    ->orWhere('phone', $request->username)
                    ->with('role') // 👈 eager load role
                    ->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user'  => [
            'employee_id'   => $user->employee_id,
            'full_name'     => $user->full_name,
            'email'         => $user->email,
            'phone'         => $user->phone,
            'role'          => $user->role->name, 
            'department_id' => $user->department_id,
            'service_id'    => $user->service_id,
            'hire_date'     => $user->hire_date,
            'active'        => $user->active,
            'created_at'    => $user->created_at,
            'updated_at'    => $user->updated_at,
        ],
    ], 200);
}

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     tags={"Authentication"},
     *     summary="Logout current user",
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="Logged out successfully")
     * )
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }

  
    
}
