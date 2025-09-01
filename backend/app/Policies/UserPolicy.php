<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any users.
     */
    public function viewAny(User $authUser)
    {
        // Example: allow if admin or staff with particular roles
        return $authUser->roles->contains('admin') || $authUser->roles->contains('manager');
    }

    /**
     * Determine whether the user can view the user.
     */
    public function view(User $authUser, User $user)
    {
        // Example: user can view self or admin can view all
        return $authUser->user_id === $user->user_id || $this->viewAny($authUser);
    }

    /**
     * Determine whether the user can create users.
     */
    public function create(User $authUser)
    {
        return $authUser->roles->contains('admin');
    }

    /**
     * Determine whether the user can update the user.
     */
    public function update(User $authUser, User $user)
    {
        return $authUser->roles->contains('admin') || $authUser->user_id === $user->user_id;
    }

    /**
     * Determine whether the user can delete the user.
     */
    public function delete(User $authUser, User $user)
    {
        return $authUser->roles->contains('admin') && $authUser->user_id !== $user->user_id;
    }
}
