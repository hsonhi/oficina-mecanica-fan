<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceMechanic;
use App\Models\ServiceOrder;
use App\Models\Mechanic;
use App\Models\Material;
use App\Models\Aircraft;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
       // Use default query
       /*$services = Service::join('users', 'posts.user_id', '=', 'users.id')
        ->select([
            'posts.*',                          // Get all columns from the main table
            'users.name as author_name',        // Get 'name' from users table and alias it
        ])
        ->get();*/

        return Inertia::render("services/index", [
            "services"=> Service::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('descricao', 'like', "%{$search}%");
                         // ->orWhere('marca', 'like', "%{$search}%")
                         // ->orWhere('modelo', 'like', "%{$search}%");
                })
                ->orderBy("id", "desc")
                ->with('aircrafts:id,chassi,marca,modelo') // Using Eloquent relationships with the with() method
                ->with('mechanics:id,nome')   // Many-to-many relations inside Service Model
                ->with('materials:id,nome')
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),

            //'services' => Service::with('mechanics:id,nome')->get(),
        ]);

    }

    public function add()
    {
         return Inertia::render('services/add', [
        'mechanics' => Mechanic::all(),
        'materials' => Material::all(),
        'aircrafts' => Aircraft::all(),
    ]);
    }

    public function edit(Aircraft $aircraft)
    {
        return Inertia::render("services/edit", ["aircraft" => $aircraft]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "aeronave_id" => ["required", "numeric", "min:0"],
            "data_inicio" => ["required", "date"],
            "data_fim" => ["required", "date"],
            "descricao" => ["required", "string"],
          
            'mecanicos_id' => ["required","array"],       // Must be sent as an array
            'mecanicos_id.*' => 'exists:_mecanicos,id',    // Each item must map to a real DB record

            'material_id' => ["required","array"],      
            'material_id.*' => 'exists:_material,id',    
        ]);

        // Get the current user's ID
        //$userId = auth()->id(); 

        // Option A: Associate using the relationship (Recommended)
        $service = $request->user()->services()->create($validated);

        // Option B: Manually inject the user ID
        //  $service = Post::create(array_merge($validated, ['utilizador_id' => Auth::id()]));
        
        // Sync many-to-many relations
        $service->mechanics()->sync($validated['mecanicos_id']);
        $service->materials()->sync($validated['material_id']);

        Inertia::flash("toast", ["type" => "success", "message" => __("Serviço registado com successo")]);
        return to_route("services.index", ["services" => $service->id]);
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

    public function destroy(Request $request,Service $service): RedirectResponse {

        DB::transaction(function () use ($service) {
           $service->mecs()->delete();
           $service->mats()->delete();
           $service->delete();
        });
 
        Inertia::flash("toast", ["type" => "success","message" => __("Serviço removido com successo")]);
        return to_route("services.index", ["services" => $service->id]);
    }
}
