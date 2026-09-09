<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeUser;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;

class MaterialsController extends Controller
{
    public function index(Request $request)
    {
        //  $materials = Material::select("id", "nome", "descricao", "valor")
        //    ->orderBy("id", "desc")
        //    ->paginate(10);

        return Inertia::render("materials/index", [
            "materials"=> Material::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('nome', 'like', "%{$search}%")
                          ->orWhere('descricao', 'like', "%{$search}%");
                })
                ->orderBy("nome", "asc")
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function add()
    {
        return Inertia::render("materials/add", ["materials" => null,]);
    }
    public function edit(Material $material)
    {
        return Inertia::render("materials/edit", ["material" => $material]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "nome" => ["required", "string", "max:255"],
            "descricao" => ["required", "string"],
            "valor" => ["required", "numeric", "min:0"],
        ]);

        $material = Material::create($validated);

         //Mail::to($request->user())->send(new WelcomeUser($request->user()));
         //Mail::to('heraldosonhi@gmail.com')->send(new WelcomeUser($request->user()));

        Inertia::flash("toast", ["type" => "success", "message" => __("Material registado com successo")]);
        return to_route("materials.index", ["materials" => $material->id]);
    }

    public function update(Request $request,Material $material): RedirectResponse {
        
        //DB::enableQueryLog(); // Enable query logging for debugging
        //dd($request->all(), $material->toArray()); // Debug request and material data

        $validated = $request->validate([
            "nome" => ["required", "string", "max:255"],
            "descricao" => ["required", "string"],
            "valor" => ["required", "numeric", "min:0"],
        ]);

        $material = Material::whereKey($material->id)
            ->lockForUpdate()
            ->firstOrFail();

        $material->update($validated);

        Inertia::flash("toast", ["type" => "success", "message" => __("Material atualizado com successo"),]);

        //dd(DB::getQueryLog()); // Catch query log for debugging purposes
        return to_route("materials.index", ["materials" => $material->id]);
    }

    public function destroy(Request $request,Material $material): RedirectResponse {

        $material->delete();
        Inertia::flash("toast", ["type" => "success","message" => __("Material removido com successo")]);
        return to_route("materials.index", ["materials" => $material->id]);
    }
}
