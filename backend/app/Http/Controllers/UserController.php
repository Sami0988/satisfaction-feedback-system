.<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="Get a list of all users",
     *     @OA\Response(
     *         response=200,
     *         description="A list of users"
     *     )
     * )
     */
    public function index()
    {
        return User::all();
    }
}
