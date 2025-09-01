<?php

namespace App\Http\Controllers\ServiceSelector;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/employees",
     *     summary="Get list of employees (with optional filters)",
     *     tags={"Employees"},
     *     @OA\Parameter(
     *         name="department_id",
     *         in="query",
     *         description="Filter by department ID",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="service_id",
     *         in="query",
     *         description="Filter by service ID",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="List of employees")
     * )
     */
    public function index(Request $request)
    {
        $query = Employee::query();

        if ($request->filled('department_id') && $request->filled('service_id')) {
            $query->where('department_id', $request->department_id)
                  ->where('service_id', $request->service_id);
        } elseif ($request->filled('department_id')) {
            $query->where('department_id', $request->department_id);
        } elseif ($request->filled('service_id')) {
            $query->where('service_id', $request->service_id);
        }

        return response()->json($query->paginate(10));
    }

    /**
     * @OA\Post(
     *     path="/api/employees",
     *     summary="Create a new employee",
     *     tags={"Employees"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"full_name","email","department_id","service_id","password"},
     *             @OA\Property(property="full_name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="phone", type="string", example="0911223344"),
     *             @OA\Property(property="department_id", type="string", example="dep-uuid"),
     *             @OA\Property(property="service_id", type="string", example="srv-uuid"),
     *             @OA\Property(property="active", type="boolean", example=true),
     *             @OA\Property(property="password", type="string", example="secret123")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Employee created successfully")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'     => 'required|string|max:255',
            'email'         => 'required|email|unique:employees,email',
            'phone'         => 'nullable|string|max:20',
            'department_id' => 'required|string|exists:departments,id',
            'service_id'    => 'required|string|exists:services,service_id',
            'active'        => 'boolean',
            'password'      => 'required|string|min:6'
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $employee = Employee::create($validated);

        return response()->json($employee, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/employees/{id}",
     *     summary="Get a single employee by ID",
     *     tags={"Employees"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Employee ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Employee details"),
     *     @OA\Response(response=404, description="Employee not found")
     * )
     */
     public function show($id)
    {
        try {
            // Use find() instead of findOrFail() to handle 404 manually
            $employee = Employee::find($id);
            
            if (!$employee) {
                return response()->json(['error' => 'Employee not found'], 404);
            }
            
            // Load relationships only if they exist
            $employee->load(['department', 'service']);
            
            return response()->json($employee);
        } catch (\Exception $e) {
            Log::error('Show Employee Error: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/employees/{id}",
     *     summary="Update an employee",
     *     tags={"Employees"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Employee ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="full_name", type="string", example="Jane Doe"),
     *             @OA\Property(property="email", type="string", example="jane@example.com"),
     *             @OA\Property(property="phone", type="string", example="0911334455"),
     *             @OA\Property(property="department_id", type="string", example="dep-uuid"),
     *             @OA\Property(property="service_id", type="string", example="srv-uuid"),
     *             @OA\Property(property="active", type="boolean", example=false),
     *             @OA\Property(property="password", type="string", example="newpass123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Employee updated successfully"),
     *     @OA\Response(response=404, description="Employee not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'full_name'     => 'sometimes|string|max:255',
            'email'         => ['sometimes','email',Rule::unique('employees')->ignore($employee->employee_id, 'employee_id')],
            'phone'         => 'nullable|string|max:20',
            'department_id' => 'sometimes|string|exists:departments,id',
            'service_id'    => 'sometimes|string|exists:services,service_id',
            'active'        => 'boolean',
            'password'      => 'nullable|string|min:6'
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $employee->update($validated);

        return response()->json($employee);
    } 

    /**
     * @OA\Delete(
     *     path="/api/employees/{id}",
     *     summary="Delete an employee",
     *     tags={"Employees"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Employee ID",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Employee deleted successfully"),
     *     @OA\Response(response=404, description="Employee not found")
     * )
     */
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
