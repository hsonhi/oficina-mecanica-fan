<?php

namespace App\Http\Controllers;

use App\Models\Mechanic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class MechanicController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("mechanics/index", [
            "mechanics"=> Mechanic::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('nome', 'like', "%{$search}%")
                          ->orWhere('telefone', 'like', "%{$search}%");
                })
                ->orderBy("nome", "asc")
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request,Mechanic $mechanic): RedirectResponse
    {
        $validated = $request->validate([
            "nome" => ["required", "string", "max:255"],
            "telefone" => ["required", "numeric", "min:0"]
        ]);

        $mechanic = Mechanic::create($validated);

        Inertia::flash("toast", ["type" => "success", "message" => __("Mecânico registado com successo")]);
        return to_route("mechanics.index", ["mechanics" => $mechanic->id]);
    }

    public function update(Request $request,Mechanic $mechanic): RedirectResponse {

        $validated = $request->validate([
            "nome" => ["required", "string", "max:255"],
            "telefone" => ["required", "numeric", "min:0"]
        ]);

        $mechanic = Mechanic::whereKey($mechanic->id)
            ->lockForUpdate()
            ->firstOrFail();

        $mechanic->update($validated);

        Inertia::flash("toast", ["type" => "success", "message" => __("Mecânico atualizado com successo"),]);
        return to_route("mechanics.index", ["mechanics" => $mechanic->id]);
    }

    public function destroy(Request $request,Mechanic $mechanic): RedirectResponse {

        $mechanic->delete();
        Inertia::flash("toast", ["type" => "success","message" => __("Mecânico removido com successo")]);
        return to_route("mechanics.index", ["mechanics" => $mechanic->id]);
    }
}
