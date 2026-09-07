<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class MaterialsController extends Controller
{
    public function index()
    {
        // Fetch paginated users from the database
        $materials = Material::select("ID", "NOME", "DESCRICAO", "VALOR")
            //->latest()
            //paginate(10);
            ->orderBy("ID", "desc")
            ->paginate(10);

        // Pass data to the frontend component via Inertia props
        return Inertia::render("materials", [
            "materials" => $materials,
        ]);
    }

    public function add()
    {
        // Fetch paginated users from the database
        $materials = Material::select("id", "nome", "descricao", "valor")
            //->latest()
            //paginate(10);
            ->orderBy("id", "desc")
            ->paginate(10);

        // Pass data to the frontend component via Inertia props
        return Inertia::render("addmaterial", [
            "materials" => $materials,
        ]);
    }
    public function edit(Material $material)
    {
        return Inertia::render("editmaterial", [
            "material" => $material,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "NOME" => ["required", "string", "max:255"],
            "DESCRICAO" => ["required", "string"],
            "VALOR" => ["required", "numeric", "min:0"],
        ]);

        /* $team = Material::create([
                'nome' => $request->validated('nome'),
                'descricao' => $request->validated('descricao'),
                'valor' => $request->validated('valor'),
            ]);*/

        $material = Material::create($validated);
        //$team = $createTeam->handle($request->user(), $request->validated('name'));

        Inertia::flash("toast", [
            "type" => "success",
            "message" => __("Material created."),
        ]);

        return to_route("materials", ["materials" => $material->id]);
    }

    public function update(
        Request $request,
        Material $material,
    ): RedirectResponse {
        // Enable query logging for debugging
        //DB::enableQueryLog();
        //dd($request->all(), $material->toArray());

        $validated = $request->validate([
            "NOME" => ["required", "string", "max:255"],
            "DESCRICAO" => ["required", "string"],
            "VALOR" => ["required", "numeric", "min:0"],
        ]);

        $material = Material::whereKey($material->ID)
            ->lockForUpdate()
            ->firstOrFail();

        $material->update($validated);

        Inertia::flash("toast", [
            "type" => "success",
            "message" => __("Material updated."),
        ]);

        // Catch query log for debugging purposes
        //dd(DB::getQueryLog());
        return to_route("materials", ["materials" => $material->id]);
    }
}
