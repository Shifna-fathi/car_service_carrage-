<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // List all users
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'branch_id')->get();
        return response()->json($users);
    }

    // Create a new user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
            'branch_id' => 'nullable|integer|exists:branches,id',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'branch_id' => $validated['branch_id'] ?? null,
        ]);
        return response()->json(['message' => 'User created', 'user' => $user], 201);
    }

    // Update a user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'nullable|string|min:6',
            'role' => 'sometimes|required|string',
            'branch_id' => 'nullable|integer|exists:branches,id',
        ]);
        $user->name = $validated['name'] ?? $user->name;
        $user->email = $validated['email'] ?? $user->email;
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->role = $validated['role'] ?? $user->role;
        $user->branch_id = array_key_exists('branch_id', $validated) ? $validated['branch_id'] : $user->branch_id;
        $user->save();
        return response()->json(['message' => 'User updated', 'user' => $user]);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
} 