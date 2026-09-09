<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("users/index", [
            "users"=> User::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                })
                ->orderBy("name", "asc")
                ->with('teams:id,name')
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
            'authid' => auth()->id(),
        ]);
    }

    public function add()
    {
        return Inertia::render('users/add', [ 'teams' => Team::all(),]);
    }
    public function edit(User $user)
    {
        return Inertia::render("users/edit", ['teams' => Team::all(),"user" => $user]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "name" => ["required", "string", "max:255"],
            "email" => ["required", "string"],
            "phone" => ["required", "numeric", "min:0"],
            "patent" => ["nullable", "string"],
            "taxid" =>  ["nullable", "string"],
            "password" =>  ["required", "string"],
            "current_team_id" => ["required", "numeric", "min:0"],
        ]);

        $user = User::create(array_merge($validated, ['password' => Hash::make($validated['password'])]));
        
        // Sync many-to-many relations with extra fields
        $user->teams()->attach($validated['current_team_id'], ['role' => 'member',
                           //other fields..
                            ]);

        Inertia::flash("toast", ["type" => "success", "message" => __("Usuário registado com successo")]);
        return to_route("users.index", ["users" => $user->id]);
    }

    public function update(Request $request, User $user): RedirectResponse {
        
         $validated = $request->validate([
            "name" => ["required", "string", "max:255"],
            "email" => ["required", "string"],
            "phone" => ["required", "numeric", "min:0"],
            "patent" => ["nullable", "string"],
            "taxid" =>  ["nullable", "string"],
            "current_team_id" => ["required", "numeric", "min:0"],
        ]);

        $user = User::whereKey($user->id)
            ->lockForUpdate()
            ->firstOrFail();

        $user->update($validated);
        
        // Sync many-to-many relations with extra fields, remember the pivotValues
        $user->teams()->syncWithPivotValues($validated['current_team_id'], ['role' => 'member']);

        Inertia::flash("toast", ["type" => "success", "message" => __("Usuário atualizado com successo"),]);

        return to_route("users.index", ["users" => $user->id]);
    }

    public function destroy(Request $request,User $user): RedirectResponse {

        DB::transaction(function () use ($user) {
           $user->memberships()->delete();
           $user->delete();
        });

        Inertia::flash("toast", ["type" => "success","message" => __("Usuário removido com successo")]);
        return to_route("users.index", ["users" => $user->id]);
    }
}
