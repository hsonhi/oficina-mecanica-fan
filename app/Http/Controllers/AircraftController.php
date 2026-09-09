<?php

namespace App\Http\Controllers;

use App\Models\Aircraft;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class AircraftController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("aircrafts/index", [
            "aircrafts"=> Aircraft::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('chassi', 'like', "%{$search}%")
                          ->orWhere('marca', 'like', "%{$search}%")
                          ->orWhere('modelo', 'like', "%{$search}%");
                })
                ->orderBy("ano", "desc")
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function add()
    {
        return Inertia::render("aircrafts/add", ["aircrafts" => null,]);
    }
    public function edit(Aircraft $aircraft)
    {
        return Inertia::render("aircrafts/edit", ["aircraft" => $aircraft]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "chassi" => ["required", "string", "max:64"],
            "ano" => ["required", "numeric", "min:0"],
            "marca" => ["required", "string", "max:255"],
            "modelo" => ["required", "string", "max:255"],
            "cor" => ["required", "string", "max:64"],
        ]);

        $aircraft = Aircraft::create($validated);

        Inertia::flash("toast", ["type" => "success", "message" => __("Aeronave registada com successo")]);
        return to_route("aircrafts.index", ["aircrafts" => $aircraft->id]);
    }

    public function update(Request $request,Aircraft $aircraft): RedirectResponse {
        
        $validated = $request->validate([
            "chassi" => ["required", "string", "max:64"],
            "ano" => ["required", "numeric", "min:0"],
            "marca" => ["required", "string", "max:255"],
            "modelo" => ["required", "string", "max:255"],
            "cor" => ["required", "string", "max:64"],
        ]);

        $aircraft = Aircraft::whereKey($aircraft->id)
            ->lockForUpdate()
            ->firstOrFail();

        $aircraft->update($validated);

        Inertia::flash("toast", ["type" => "success", "message" => __("Aeronave atualizada com successo"),]);
        return to_route("aircrafts.index", ["aircrafts" => $aircraft->id]);
    }

    public function destroy(Request $request,Aircraft $aircraft): RedirectResponse {

        $aircraft->delete();
        Inertia::flash("toast", ["type" => "success","message" => __("Aeronave removida com successo")]);
        return to_route("aircrafts.index", ["aircrafts" => $aircraft->id]);
    }
}
