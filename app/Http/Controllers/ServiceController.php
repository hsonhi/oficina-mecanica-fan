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

        $search = $request->input('search');

        return Inertia::render("services/index", [
            "services"=> Service::query()
                ->orderBy("id", "desc")
                ->with('aircrafts')
                ->whereHas('aircrafts', function ($query) use ($search) {
                       $query->where('chassi', 'LIKE', '%' . $search . '%');})
                ->with('mechanics:id,nome')  
                ->with('materials:id,nome')
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
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

    public function edit(Service $service)
    {
        return Inertia::render('services/edit', [
        'service' => $service::
        with('aircrafts:id,chassi,marca,modelo')
        ->with('mechanics:id')   
        ->with('materials:id')
        ->where('id', $service->id)->get(),
        
        'mechanics' => Mechanic::all(),
        'materials' => Material::all(),
        'aircrafts' => Aircraft::all(),
    ]);

    }

    public function view(Service $service)
    {
        return Inertia::render('services/view', [
        'service' => $service::
        with('aircrafts:id,chassi,marca,modelo')
        ->with('mechanics:id,nome')   
        ->with('materials:id,nome')
        ->with('user:id,name')
        ->where('id', $service->id)->get(),

        'mechanics' => Mechanic::all(),
        'materials' => Material::all(),
        'aircrafts' => Aircraft::all(),
    ]);

    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "aeronave_id" => ["required", "numeric", "min:0"],
            "data_inicio" => ["required", "date"],
            'data_fim'   => ['required', 'date', 'after:data_inicio'],
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

    public function update(Request $request,Service $service): RedirectResponse {
        
        $validated = $request->validate([
            "aeronave_id" => ["required", "numeric", "min:0"],
            "data_inicio" => ["required", "date"],
            'data_fim'   => ['required', 'date', 'after:data_inicio'],
            "descricao" => ["required", "string"],
          
            'mecanicos_id' => ["required","array"],       
            'mecanicos_id.*' => 'exists:_mecanicos,id',  

            'material_id' => ["required","array"],      
            'material_id.*' => 'exists:_material,id',    
        ]);

        $service = Service::whereKey($service->id)
            ->lockForUpdate()
            ->firstOrFail();

        $service->update($validated);
       
        $service->mechanics()->sync($validated['mecanicos_id']);
        $service->materials()->sync($validated['material_id']);

        Inertia::flash("toast", ["type" => "success", "message" => __("Serviço atualizado com successo")]);
        return to_route("services.index", ["services" => $service->id]);
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
