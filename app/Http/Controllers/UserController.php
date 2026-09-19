<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Team;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

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
            "email" => ["required", "string", Rule::unique('users', 'email')],
            "phone" => ["required", "numeric", "min:0", Rule::unique('users', 'phone')],
            "patent" => ["nullable", "string"],
            "taxid" =>  ["nullable", "string", Rule::unique('users', 'taxid')],
            "password" =>   ['required', 'string', Password::default()],
            "current_team_id" => ["required", "numeric", "min:0"],
        ]);

        /*if (User::where('email', $validated['email'])->exists()) {
        return back()->withErrors([
            'custom_error' => 'Email já encontra-se registado.'
        ]);
        }*/
       
        $role = Team::where('id', $validated['current_team_id'])->value('slug'); 
        $user = User::create(array_merge($validated,['role' => $role], ['password' => Hash::make($validated['password'])]));
        
        // Sync many-to-many relations with extra fields
        $user->teams()->attach($validated['current_team_id'], ['role' => 'member', //other fields..
                            ]);

        Inertia::flash("toast", ["type" => "success", "message" => __("Usuário registado com successo")]);
        return to_route("users.index", ["users" => $user->id]);
    }

    public function update(Request $request, User $user): RedirectResponse {
        
        $validated = $request->validate([
            "name" => ["required", "string", "max:255"],
            "email" => ["required", "string", Rule::unique('users', 'email')->ignore($user->id)],
            "phone" => ["required", "numeric", "min:0", Rule::unique('users', 'phone')->ignore($user->id)],
            "patent" => ["nullable", "string"],
            "taxid" =>  ["nullable", "string", Rule::unique('users', 'taxid')->ignore($user->id)],
            "current_team_id" => ["required", "numeric", "min:0"],
        ]);

        $user = User::whereKey($user->id)
            ->lockForUpdate()
            ->firstOrFail();
            
        $role = Team::where('id', $validated['current_team_id'])->value('slug'); 
        $user->update(array_merge($validated,['role' => $role]));
        //$user->update($validated);
        
        // Sync many-to-many relations with extra fields, remember the pivotValues
        $user->teams()->syncWithPivotValues($validated['current_team_id'], ['role' => 'member']);

        Inertia::flash("toast", ["type" => "success", "message" => __("Usuário atualizado com successo"),]);

        return to_route("users.index", ["users" => $user->id]);
    }

    public function destroy(Request $request,User $user): RedirectResponse {

        if (Service::where('user_id', $user->id)->exists()) {
        return back()->withErrors([
            'custom_error' => 'Usuário tem registo(s) de serviço(s).'
        ]);
        }

        DB::transaction(function () use ($user) {
           $user->memberships()->delete();
           $user->delete();
        });

        Inertia::flash("toast", ["type" => "success","message" => __("Usuário removido com successo")]);
        return to_route("users.index", ["users" => $user->id]);
    }
}
