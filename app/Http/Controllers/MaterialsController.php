<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class MaterialsController extends Controller
{
    public function index()
    {
        // Fetch paginated users from the database
        $materials = Material::select("id", "nome", "descricao", "valor")
            //->latest()
            //paginate(10);
            ->orderBy("id", "desc")
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

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            "nome" => ["required", "string", "max:255"],
            "descricao" => ["required", "string"],
            "valor" => ["required", "numeric", "min:0"],
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
}
