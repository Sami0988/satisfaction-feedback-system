<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/employees",
     *     summary="Get list of employees",
     *     tags={"Employees"},
     *     @OA\Response(
     *         response=200,
     *         description="List of employees",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Employee"))
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Employee::all());
    }
}
