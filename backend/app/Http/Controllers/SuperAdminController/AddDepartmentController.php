<?php

namespace App\Http\Controllers\SuperAdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AddDepartmentController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/departments/create",
     *     tags={"Departments"},
     *     summary="Create a new Department with a Department Admin (Super Admin only)",
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
     *         description="Department and Admin created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Department and Admin created successfully."),
     *             @OA\Property(property="department", type="object"),
     *             @OA\Property(property="admin", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized: Only Super Admin can create departments",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Unauthorized: Only Super Admin can create departments.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
{
    // Only Super Admins can create
    if ($request->user()->role->name !== 'Super Admin') {
        return response()->json([
            'status'       => 'error',
            'current_role' => $request->user()->role,
            'message'      => 'Unauthorized: Only Super Admin can create departments.'
        ], 403);
    }

    // Validate input based on JSON keys
    $validator = Validator::make($request->all(), [
        'departmentName'  => 'required|string|max:255',
        'floor'           => 'nullable|string|max:50',
        'departmentEmail' => 'required|email|unique:departments,email',
        'departmentPhone' => 'nullable|string|max:20',
        'adminFullName'   => 'required|string|max:255',
        'adminEmail'      => 'required|email|unique:employees,email',
        'adminPhone'      => 'nullable|string|max:20',
        'adminRole'       => 'required|string|in:Department Admin',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors()
        ], 422);
    }

    // Create Department
    $department = Department::create([
        'name'  => $request->departmentName,
        'floor' => $request->floor,
        'email' => $request->departmentEmail,
        'phone' => $request->departmentPhone,
    ]);

    // Create Role for Department Admin
    $role = Role::firstOrCreate(
        ['name' => 'Department Admin'], // Check by name
        ['description' => 'Admin for department'] // Only used if creating new
    );

    // Create Employee
    $employee = Employee::create([
        'full_name'     => $request->adminFullName,
        'email'         => $request->adminEmail,
        'phone'         => $request->adminPhone,
        'password'      => Hash::make('password123'), // default password
        'department_id' => $department->department_id,
        'role_id'       => $role->role_id,
        'active'        => true,
    ]);

    return response()->json([
        'status'     => 'success',
        'message'    => 'Department, Role, and Admin created successfully.',
        'department' => $department,
        'role'       => $role,
        'employee'   => $employee
    ], 201);
}

public function index(Request $request)
{
    // Only Super Admin can fetch employees
    if ($request->user()->role->name !== 'Super Admin') {
        return response()->json([
            'status'  => 'error',
            'current_role' => $request->user()->role,
            'message' => 'Unauthorized: Only Super Admin can view employees.'
        ], 403);
    }

    // Optional filter by department_id
    $query = Employee::query();

    if ($request->has('department_id')) {
        $query->where('department_id', $request->department_id);
    }

    // Eager load department and role
    $employees = $query->with(['department', 'role'])->get();

    // Exclude Super Admin
    $employees = $employees->filter(function ($emp) {
        return $emp->role->name !== 'Super Admin';
    });

    // Map to desired response format
    $response = $employees->map(function ($emp) {
        return [
            'employee_id'     => $emp->employee_id,
            'department_id'   => $emp->department_id,
            'adminEmail'      => $emp->email,
            'adminFullName'   => $emp->full_name,
            'adminPhone'      => $emp->phone,
            'adminRole'       => $emp->role->name ?? null,
            'departmentEmail' => $emp->department->email ?? null,
            'departmentName'  => $emp->department->name ?? null,
            'departmentPhone' => $emp->department->phone ?? null,
            'floor'           => $emp->department->floor ?? null,
            'status'          => $emp->active ? 'Active' : 'Inactive',
        ];
    });

    // Return the mapped response, not the original $employees
    return response()->json([
        'status'    => 'success',
        'employees' => $response->values() 
    ]);
}


public function putUpdate(Request $request, $id)
{
    return $this->updateDepartment($request, $id, true);
}

public function patchUpdate(Request $request, $id)
{
    return $this->updateDepartment($request, $id, false);
}

private function updateDepartment(Request $request, $id, $isFullUpdate = false)
{
    $department = Department::findOrFail($id);
    $employee   = Employee::where('department_id', $department->department_id)->first();

    $rules = [
        'departmentName'  => $isFullUpdate ? 'required|string|max:255' : 'sometimes|required|string|max:255',
        'floor'           => $isFullUpdate ? 'nullable|string|max:50' : 'sometimes|nullable|string|max:50',
        'departmentEmail' => ($isFullUpdate ? 'required' : 'sometimes|required') .
                             '|email|unique:departments,email,' . $department->department_id . ',department_id',
        'departmentPhone' => $isFullUpdate ? 'nullable|string|max:20' : 'sometimes|nullable|string|max:20',
    ];

    if ($employee) {
        $rules += [
            'full_name' => $isFullUpdate ? 'required|string|max:255' : 'sometimes|required|string|max:255',
            'email'     => ($isFullUpdate ? 'required' : 'sometimes|required') .
                           '|email|unique:employees,email,' . $employee->employee_id . ',employee_id',
            'phone'     => $isFullUpdate ? 'nullable|string|max:20' : 'sometimes|nullable|string|max:20',
            'password'  => $isFullUpdate ? 'nullable|string|min:6' : 'sometimes|nullable|string|min:6',
        ];
    }

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors()
        ], 422);
    }

    // Update department
    $department->update([
        'name'  => $request->departmentName ?? $department->name,
        'floor' => $request->floor ?? $department->floor,
        'email' => $request->departmentEmail ?? $department->email,
        'phone' => $request->departmentPhone ?? $department->phone,
    ]);

    // Update employee
    if ($employee) {
        $employee->update([
            'full_name' => $request->full_name ?? $employee->full_name,
            'email'     => $request->email ?? $employee->email,
            'phone'     => $request->phone ?? $employee->phone,
            'password'  => $request->password ? bcrypt($request->password) : $employee->password,
        ]);
    }

    $department->refresh();
    if ($employee) $employee->refresh();

    return response()->json([
        'status'     => 'success',
        'message'    => $isFullUpdate ? 'Department fully updated.' : 'Department partially updated.',
        'department' => $department,
        'employee'   => $employee
    ]);
}


    /**
     * DELETE - Remove department
     */
public function destroy($id)
{
    // Find the department
    $department = Department::findOrFail($id);

    // Find all employees with this department_id
    $employees = \App\Models\Employee::where('department_id', $department->department_id)->get();

    // Delete each employee
    foreach ($employees as $employee) {
        $employee->delete();
    }

    // Delete the department
    $department->delete();

    return response()->json([
        'status'  => 'success',
        'message' => 'Department and its employees deleted successfully.'
    ]);
}






 

}
