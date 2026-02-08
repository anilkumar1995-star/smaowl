<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class DeveloperKeyController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user && in_array($user->email, config('app.admin_emails', []));

        if ($isAdmin) {
            $keys = ApiKey::with('user')->orderByDesc('id')->get();
            $users = User::select('id', 'name', 'email')->orderBy('email')->limit(200)->get();

            return Inertia::render('admin/developer/keys', [
                'keys' => $keys,
                'users' => $users,
            ]);
        }

        // Non-admins: return only their own keys
        if (! $user) {
            abort(401);
        }

        $keys = ApiKey::where('user_id', $user->id)->orderByDesc('id')->get();
        return Inertia::render('admin/developer/keys', [
            'keys' => $keys,
            'users' => [],
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if (! $user) {
            abort(401);
        }

        $isAdmin = in_array($user->email, config('app.admin_emails', []));

        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'name' => 'nullable|string|max:255',
        ]);

        try {
            $plain = bin2hex(random_bytes(24));
            $hash = hash('sha256', $plain);

            // Non-admins may only create keys for themselves
            $userId = $isAdmin ? $request->input('user_id') : $user->id;

            $key = ApiKey::create([
                'user_id' => $userId,
                'name' => $request->input('name'),
                'token_hash' => $hash,
                'last_four' => substr($plain, -6),
            ]);

            return response()->json(['success' => true, 'token' => $plain, 'key' => $key]);
        } catch (\Exception $e) {
            Log::error('Failed to generate API key', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to generate key'], 500);
        }
    }

    public function revoke(Request $request, ApiKey $key)
    {
        $user = $request->user();
        if (! $user) {
            abort(401);
        }

        $isAdmin = in_array($user->email, config('app.admin_emails', []));
        if (! $isAdmin && $key->user_id !== $user->id) {
            abort(403);
        }

        $key->update(['revoked' => true]);

        return response()->json(['success' => true]);
    }
}
