<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
/**
    * List users with optional filtering, pagination, and relations.
     */
   public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('user_type')) {
           $query->where('user_type', $request->user_type);
        }

        if ($request->filled('active')) {
            $active = filter_var($request->active, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if ($active !== null) {
                $query->where('active', $active);
            }
        }

        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }

        // Load relations if requested
        if ($request->boolean('with_roles')) {
            $query->with('roles');
        }
        if ($request->boolean('with_feedback_responses')) {
            $query->with('feedbackResponses');
        }

        $users = $query->paginate($request->input('per_page', 10));

                 //return response()->json($users);

            return UserResource::collection($users);
    }

   /**
     * Store a new user, with password hashing.
    */
   public function store(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:150',
            'phone' => 'nullable|string|max:50',
           'email' => 'required|email|max:150|unique:app_users,email',
           'user_type' => ['required', Rule::in(['Citizen', 'Employee', 'Staff'])],
           'national_id' => 'nullable|string|max:50',
           'active' => 'nullable|boolean',
            'password' => 'required|string|min:6|confirmed',
            // 'password_confirmation' must be present for confirmed
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['active'] = $data['active'] ?? true;

        $user = User::create($data);
         return new UserResource($user);

        //return response()->json($user->load('roles', 'feedbackResponses'), Response::HTTP_CREATED);
    }

    /**
     * Show user by UUID, with optional relationships.
     */
    public function show(Request $request, $user_id)
    {
       $user = User::findOrFail($user_id);

        $query = User::where('user_id', $user_id);

        if ($request->boolean('with_roles')) {
            $query->with('roles');
        }
        if ($request->boolean('with_feedback_responses')) {
            $query->with('feedbackResponses');
        }

        $user = $query->firstOrFail();
          return new UserResource($user);

        //return response()->json($user);
    }

    /**
     * Update user by UUID, with optional password update.
     */
    public function update(Request $request, $user_id)
    {
         $user = User::findOrFail($user_id);

     
        //$user = User::findOrFail($user_id);

        $data = $request->validate([
            'full_name' => 'sometimes|required|string|max:150',
            'phone' => 'nullable|string|max:50',
            'email' => ['sometimes','required','email', 'max:150', Rule::unique('app_users','email')->ignore($user->user_id, 'user_id')],
            'user_type' => ['sometimes','required', Rule::in(['Citizen', 'Employee', 'Staff'])],
            'national_id' => 'nullable|string|max:50',
            'active' => 'nullable|boolean',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
         return new UserResource($user);

       //return response()->json($user->load('roles', 'feedbackResponses'));
    }

   /**
     * Delete user by UUID.
     * Be cautious: no soft deletes configured.
     */
    public function destroy($user_id)
    {
        $user = User::findOrFail($user_id);


    $user->delete();

    return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Login user and create token using Laravel Sanctum.
     */
    public function login(Request $request)
    {
       $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (! Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        /** @var User $user **/
        $user = Auth::user();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    /**
     * Logout user (revoke tokens).
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
