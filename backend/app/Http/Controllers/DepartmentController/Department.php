<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the departments.
     */
    public function index()
    {
        $departments = Department::with('services')->get();
        return response()->json($departments, Response::HTTP_OK);
    }

    /**
     * Store a newly created department in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_id' => 'required|string|unique:departments,department_id',
            'name'          => 'required|string|max:255',
            'code'          => 'nullable|string|max:50',
            'type'          => 'nullable|string|max:100',
            'email'         => 'nullable|email|max:255',
            'phone'         => 'nullable|string|max:20',
        ]);

        $department = Department::create($validated);

        return response()->json($department, Response::HTTP_CREATED);
    }

    /**
     * Display the specified department.
     */
    public function show($id)
    {
        $department = Department::with('services')->findOrFail($id);
        return response()->json($department, Response::HTTP_OK);
    }

    /**
     * Update the specified department in storage.
     */
    public function update(Request $request, $id)
    {
        $department = Department::findOrFail($id);

        $validated = $request->validate([
            'name'  => 'sometimes|required|string|max:255',
            'code'  => 'nullable|string|max:50',
            'type'  => 'nullable|string|max:100',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $department->update($validated);

        return response()->json($department, Response::HTTP_OK);
    }

    /**
     * Remove the specified department from storage.
     */
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return response()->json(['message' => 'Department deleted successfully'], Response::HTTP_OK);
    }
}
