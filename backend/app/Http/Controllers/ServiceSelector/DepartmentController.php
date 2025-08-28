<?php

namespace App\Http\Controllers\ServiceSelector;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\Tag(
 *     name="Departments",
 *     description="Operations about departments"
 * )
 */


class DepartmentController extends Controller
{
    // List all departments
public function index()
    {
        $departments = Department::orderBy('created_at', 'desc')->paginate(6);
        return view('departments.index', compact('departments'));
    }

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
