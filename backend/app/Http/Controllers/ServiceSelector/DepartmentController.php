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
    // ...
}
