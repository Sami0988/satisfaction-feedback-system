<?php

namespace App\Http\Controllers\SuperAdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Employee; // Make sure your Employee model exists
use App\Models\Role;     // Make sure your Role model exists

class AddSuperAdminController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/super-admin/create",
     *     tags={"SuperAdmin"},
     *     summary="Create a Super Admin",
     *     description="Adds a Super Admin to the employees table",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"full_name","email","phone","password"},
     *             @OA\Property(property="full_name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="john@company.com"),
     *             @OA\Property(property="phone", type="string", example="0912345678"),
     *             @OA\Property(property="password", type="string", example="StrongPass123!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Super Admin created successfully"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error"
     *     )
     * )
     */
   public function store(Request $request)
    {
        // 1️⃣ Validate input from frontend
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email'     => 'required|email|unique:employees,email',
            'phone'     => 'required|string|max:20|unique:employees,phone',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2️⃣ Check or create Super Admin role
        $superAdminRole = Role::firstOrCreate(
            ['name' => 'Super Admin'],
            ['description' => 'Full access to the system']
        );

        // 3️⃣ Check if a Super Admin already exists
        $existingAdmin = Employee::where('role_id', $superAdminRole->role_id)->first();
        if ($existingAdmin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Super Admin already exists',
                'super_admin' => $existingAdmin
            ], 409);
        }

        // 4️⃣ Create Super Admin with default password "admin"
        $superAdmin = Employee::create([
            'full_name'    => $request->full_name,
            'email'        => $request->email,
            'phone'        => $request->phone,
            'password'     => Hash::make('admin'), // default password
            'role_id'      => $superAdminRole->role_id,
            'active'       => 1,
            'department_id'=> null,
            'service_id'   => null,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Super Admin created successfully',
            'super_admin' => $superAdmin
        ], 201);
    }
}
