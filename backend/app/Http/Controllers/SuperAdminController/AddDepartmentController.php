<?php

namespace App\Http\Controllers\SuperAdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AddDepartmentController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/departments/create",
     *     tags={"Departments"},
     *     summary="Create a new Department (Super Admin only)",
     *     description="Allows a Super Admin to create a department and assign a Department Admin.",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"department_name","department_email","full_name","email","role"},
     *             @OA\Property(property="department_name", type="string", example="IT Department"),
     *             @OA\Property(property="floor", type="string", example="2nd Floor"),
     *             @OA\Property(property="department_email", type="string", example="it@company.com"),
     *             @OA\Property(property="department_phone", type="string", example="123456789"),
     *             @OA\Property(property="full_name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="john.doe@company.com"),
     *             @OA\Property(property="phone", type="string", example="987654321"),
     *             @OA\Property(property="role", type="string", example="Department Admin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Department and Admin created successfully"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized: Only Super Admin can create departments"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error"
     *     )
     * )
     */
    public function store(Request $request)
    {
        // ✅ Only Super Admins can create
        if ($request->user()->role !== 'Super Admin') {
            return response()->json([
                'status'  => 'error',
                'message' => 'Unauthorized: Only Super Admin can create departments.'
            ], 403);
        }

        // ✅ Validate input
        $validator = Validator::make($request->all(), [
            'department_name'   => 'required|string|max:255',
            'floor'             => 'nullable|string|max:50',
            'department_email'  => 'required|email|unique:departments,email',
            'department_phone'  => 'nullable|string|max:20',

            'full_name'         => 'required|string|max:255',
            'email'             => 'required|email|unique:users,email',
            'phone'             => 'nullable|string|max:20',
            'role'              => 'required|string|in:Department Admin',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 'error',
                'errors'  => $validator->errors()
            ], 422);
        }

        // ✅ Create Department
        $department = Department::create([
            'name'   => $request->department_name,
            'floor'  => $request->floor,
            'email'  => $request->department_email,
            'phone'  => $request->department_phone,
        ]);

        // ✅ Create Department Admin
        $admin = User::create([
            'name'          => $request->full_name,
            'email'         => $request->email,
            'phone'         => $request->phone,
            'role'          => $request->role,
            'department_id' => $department->id,
            'password'      => Hash::make('password123'), // default password
        ]);

        return response()->json([
            'status'     => 'success',
            'message'    => 'Department and Admin created successfully.',
            'department' => $department,
            'admin'      => $admin
        ], 201);
    }
}
