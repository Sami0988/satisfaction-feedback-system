<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Service;
use App\Models\Role;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use SimpleSoftwareIO\QrCode\Facades\QrCode;



class DepartmentAdminController extends Controller
{
    /**
     * Add employee and/or service to admin's department
     */
    public function addEmployeeAndService(Request $request)
    {
        $admin = $request->user();
        $departmentId = $admin->department_id;

        $data = $request->all();
        $employeeData = $data['employee'] ?? null;
        $serviceData  = $data['service'] ?? null;

        $createdEmployee = null;
        $createdService  = null;

        // Employee
        if ($employeeData) {
            $validator = Validator::make($employeeData, [
                'full_name' => 'required|string|max:255',
                'email'     => 'required|email|unique:employees,email',
                'phone'     => 'nullable|string|max:20',
                'role'      => 'required|string|max:100'
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
            }

            $role = Role::firstOrCreate(
                ['name' => $employeeData['role']],
                ['role_id' => Str::uuid()]
            );

            $createdEmployee = Employee::create([
                'employee_id'   => Str::uuid(),
                'full_name'     => $employeeData['full_name'],
                'email'         => $employeeData['email'],
                'phone'         => $employeeData['phone'] ?? null,
                'password'      => Hash::make('password123'), // default password
                'department_id' => $departmentId,
                'role_id'       => $role->role_id,
                'active'        => true,
            ]);
        }

        // Service
        if ($serviceData) {
            $validator = Validator::make($serviceData, [
                'name'        => 'required|string|max:255',
                'category'    => 'nullable|string|max:100',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
            }

            $createdService = Service::create([
                'service_id'    => Str::uuid(),
                'name'          => $serviceData['name'],
                'category'      => $serviceData['category'] ?? null,
                'description'   => $serviceData['description'] ?? null,
                'department_id' => $departmentId,
                'active'        => true,
            ]);
        }

        // 🔹 Link employee with service
        if ($createdEmployee && $createdService) {
            $createdEmployee->service_id = $createdService->service_id;
            $createdEmployee->save();
        }

        return response()->json([
            'status'   => 'success',
            'message'  => 'Employee and/or Service added successfully',
            'employee' => $createdEmployee,
            'service'  => $createdService,
        ]);
    }



    /**
     * Get all employees and services in admin's department
     */
public function getDepartmentData(Request $request)
{
    try {
        $admin = $request->user();
        $departmentId = $admin->department_id;

        // Fetch all employees except Department Admin
        $employees = Employee::where('employees.department_id', $departmentId)
            ->whereHas('role', fn($q) => $q->where('name', '!=', 'Department Admin'))
            ->join('roles', 'employees.role_id', '=', 'roles.role_id')
            ->join('departments', 'employees.department_id', '=', 'departments.department_id')
            ->select(
                'employees.employee_id',
                'employees.full_name',
                'employees.email',
                'employees.phone',
                'employees.role_id',
                'employees.department_id',
                'employees.service_id',
                'employees.hire_date',
                'employees.active',
                'employees.created_at',
                'employees.updated_at',
                'roles.name as role_name',
                'departments.name as department_name'
            )
            ->get();

        // Fetch all services in this department
        $services = Service::where('department_id', $departmentId)->get();

        // Attach service info to each employee
        $employeesWithService = $employees->map(function($employee) use ($services) {
            $employee->service = $employee->service_id
                ? $services->firstWhere('service_id', $employee->service_id)
                : null;
            return $employee;
        });

        return response()->json([
            'status'  => 'success',
            'message' => 'Department data retrieved successfully',
            'data'    => $employeesWithService, // employees with their service info
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'status'  => 'error',
            'message' => 'Failed to retrieve department data',
            'error'   => $e->getMessage()
        ], 500);
    }
}



/**
 * PATCH update service
 */
public function putUpdateEmployeeService(Request $request, $employeeId)
{
    return $this->updateEmployeeService($request, $employeeId, true);
}

public function patchUpdateEmployeeService(Request $request, $employeeId)
{
    return $this->updateEmployeeService($request, $employeeId, false);
}

private function updateEmployeeService(Request $request, $employeeId, bool $isFullUpdate = false)
{
    // 1️⃣ Find employee
    $employee = Employee::findOrFail($employeeId);

    // 2️⃣ Validation rules
    $rules = [
        'full_name' => $isFullUpdate ? 'required|string|max:255' : 'sometimes|required|string|max:255',
        'email'     => ($isFullUpdate ? 'required' : 'sometimes|required') .
                       '|email|unique:employees,email,' . $employee->employee_id . ',employee_id',
        'phone'     => $isFullUpdate ? 'nullable|string|max:20' : 'sometimes|nullable|string|max:20',
        'password'  => $isFullUpdate ? 'nullable|string|min:6' : 'sometimes|nullable|string|min:6',
        'role'      => $isFullUpdate ? 'required|string|max:100' : 'sometimes|required|string|max:100',
    ];

    // Service data validation if present
    $serviceData = $request->service ?? null;
    if ($serviceData) {
        $rules['service.name'] = $isFullUpdate ? 'required|string|max:255' : 'sometimes|required|string|max:255';
        $rules['service.category'] = $isFullUpdate ? 'nullable|string|max:100' : 'sometimes|nullable|string|max:100';
        $rules['service.description'] = $isFullUpdate ? 'nullable|string' : 'sometimes|nullable|string';
    }

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors()
        ], 422);
    }

    // 3️⃣ Update employee fields
    if ($request->has('role')) {
        $role = Role::firstOrCreate(['name' => $request->role], ['role_id' => Str::uuid()]);
        $employee->role_id = $role->role_id;
    }

    $employee->update([
        'full_name' => $request->full_name ?? $employee->full_name,
        'email'     => $request->email ?? $employee->email,
        'phone'     => $request->phone ?? $employee->phone,
        'password'  => $request->password ? Hash::make($request->password) : $employee->password,
    ]);

    $employee->refresh();

    // 4️⃣ Update linked service if service data provided
    $updatedService = null;
    if ($serviceData && $employee->service_id) {
        $service = Service::findOrFail($employee->service_id);
        $service->update([
            'name'        => $serviceData['name'] ?? $service->name,
            'category'    => $serviceData['category'] ?? $service->category,
            'description' => $serviceData['description'] ?? $service->description,
        ]);
        $service->refresh();
        $updatedService = $service;
    }

    // 5️⃣ Return response
    return response()->json([
        'status'   => 'success',
        'message'  => $isFullUpdate ? 'Employee and linked service fully updated.' : 'Employee and linked service partially updated.',
        'employee' => $employee,
        'service'  => $updatedService,
    ]);
}

// Generate QR code for employee feedback link
 public function generateQr($employee_id)
    {
        $employee = Employee::findOrFail($employee_id);

        $url = url("/feedback/EMP-{$employee->employee_id}");
        
        // Generate QR as SVG
        $qrCode = QrCode::size(200)->generate($url);

        return response($qrCode)->header('Content-Type', 'image/svg+xml');
    }







     /**
     * Delete employee or service
     */


     public function destroy(Request $request, $type, $id)
    {
        $admin = $request->user();
        $departmentId = $admin->department_id;

        if ($type === 'employee') {
            $employee = Employee::where('employee_id', $id)
                                ->where('department_id', $departmentId)
                                ->firstOrFail();
            $employee->delete();
            return response()->json(['status' => 'success', 'message' => 'Employee deleted']);
        }

        if ($type === 'service') {
            $service = Service::where('service_id', $id)
                              ->where('department_id', $departmentId)
                              ->firstOrFail();
            $service->delete();
            return response()->json(['status' => 'success', 'message' => 'Service deleted']);
        }

        return response()->json(['status' => 'error', 'message' => 'Invalid type'], 400);
    }

  public function generateQrEmployee($employee_id)
    {
        $employee = Employee::findOrFail($employee_id);

        // Use the frontend URL and append the employee ID
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3001');
        $qrContent = $frontendUrl . '/department/' . $employee->employee_id;

        // Generate QR code as SVG
        $qr = QrCode::size(200)->generate($qrContent);

        return response($qr)->header('Content-Type', 'image/svg+xml');
    }

    /**
     * Retrieve employee info
     */
    public function getEmployeeInfo($employee_id)
    {
        $employee = Employee::with(['role', 'department'])->findOrFail($employee_id);

        $data = [
            'id' => $employee->employee_id,
            'name' => $employee->full_name,
            'email' => $employee->email,
            'department' => $employee->department ? $employee->department->name : null,
            'role' => $employee->role ? $employee->role->name : null,
        ];

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    
// Get all services that belong to a specific department
      public function getByDepartment($department_id)
    {
        $services = Service::where('department_id', $department_id)->get();

        if ($services->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No services found for this department'
            ], 404);
        }

        return response()->json([
            'status'  => 'success',
            'data'    => $services
        ]);
    }
}


