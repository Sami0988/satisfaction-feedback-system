<?php

namespace App\Http\Controllers\ServiceSelector;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


/**
 * @OA\Schema(
 *     schema="Department",
 *     type="object",
 *     title="Department",
 *     required={"id","name","code","email","phone"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Finance"),
 *     @OA\Property(property="code", type="string", example="FIN"),
 *     @OA\Property(property="email", type="string", example="finance@company.com"),
 *     @OA\Property(property="phone", type="string", example="+251912345678"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */



class DepartmentController extends Controller
{
/**
     * @OA\Get(
     *     path="/api/departments",
     *     tags={"Departments"},
     *     summary="Get a list of all departments",
     *     @OA\Response(
     *         response=200,
     *         description="A list of departments",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Department")
     *         )
     *     )
     * )
     */

    public function apiIndex()
{
    $departments = Department::orderBy('created_at', 'desc')->get();
    return response()->json($departments);
}


    // API route - returns JSON for Swagger


    // Show form to create new department
    public function create()
    {
        return view('departments.create');
    }

    // Store new department
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'code' => 'required|string|max:50|unique:departments,code',
            'email' => 'required|email|unique:departments,email',
            'phone' => 'required|string|max:20',
        ]);

        Department::create($data);

        return redirect()->route('departments.index')->with('success', 'Department created successfully.');
    }

    // Show a single department (optional)
    public function show(Department $department)
    {
        return view('departments.show', compact('department'));
    }

    // Show form to edit department
    public function edit(Department $department)
    {
        return view('departments.edit', compact('department'));
    }

    // Update department
    public function update(Request $request, Department $department)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name,' . $department->id,
            'code' => 'required|string|max:50|unique:departments,code,' . $department->id,
            'email' => 'required|email|unique:departments,email,' . $department->id,
            'phone' => 'required|string|max:20',
        ]);

        $department->update($data);

        return redirect()->route('departments.index')->with('success', 'Department updated successfully.');
    }

    // Delete a department
    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route('departments.index')->with('success', 'Department deleted successfully.');
    }
}
