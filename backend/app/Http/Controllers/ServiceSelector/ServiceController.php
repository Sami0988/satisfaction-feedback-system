<?php

namespace App\Http\Controllers\ServiceSelector;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
/**
 * @OA\Get(
 *     path="/api/departments/{department_id}/services",
 *     summary="Get services by department",
 *     description="Fetch a paginated list of services that belong to the given department",
 *     tags={"Services"},
 *
 *     @OA\Parameter(
 *         name="department_id",
 *         in="path",
 *         required=true,
 *         description="The UUID of the department",
 *         @OA\Schema(type="string", format="uuid", example="0065f9a0-ce4d-422f-9640-e2a03ea888ce")
 *     ),
 *
 *     @OA\Parameter(
 *         name="page",
 *         in="query",
 *         required=false,
 *         description="Page number for pagination",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="List of services retrieved successfully",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="current_page", type="integer", example=1),
 *             @OA\Property(property="data", type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="service_id", type="string", format="uuid", example="123e4567-e89b-12d3-a456-426614174000"),
 *                     @OA\Property(property="department_id", type="string", format="uuid", example="0065f9a0-ce4d-422f-9640-e2a03ea888ce"),
 *                     @OA\Property(property="name", type="string", example="IT Support"),
 *                     @OA\Property(property="category", type="string", example="Technical"),
 *                     @OA\Property(property="description", type="string", example="Handles all IT-related issues"),
 *                     @OA\Property(property="active", type="boolean", example=true),
 *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-30T10:15:30Z"),
 *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-30T10:15:30Z")
 *                 )
 *             ),
 *             @OA\Property(property="first_page_url", type="string", example="http://localhost:8080/api/departments/0065f9a0-ce4d-422f-9640-e2a03ea888ce/services?page=1"),
 *             @OA\Property(property="last_page", type="integer", example=5),
 *             @OA\Property(property="per_page", type="integer", example=10),
 *             @OA\Property(property="total", type="integer", example=50)
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=404,
 *         description="Department not found",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="error", type="string", example="Department not found")
 *         )
 *     )
 * )
 */

class ServiceController extends Controller
{
    public function index(Request $request, $departmentId)
    {
        $services = Service::where('department_id', $departmentId)
            ->paginate(10);

        return response()->json($services);
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('name');

        if (!$searchTerm) {
            return response()->json([
                'message' => 'Please provide a service name to search.'
            ], 400);
        }

        $services = Service::where('name', 'like', "%{$searchTerm}%")
            ->paginate(10);

        return response()->json($services);
    }
}
