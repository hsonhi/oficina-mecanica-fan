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
        // Fetch paginated users from the database
      /*  $materials = Material::select("id", "nome", "descricao", "valor")
            //->latest()
            //paginate(10);
            ->orderBy("id", "desc")
            ->paginate(10);

        // Pass data to the frontend component via Inertia props
        return Inertia::render("materials", [
            "materials" => $materials,
        ]);
*/

 return Inertia::render("materials", [
            // Pass filtered and paginated results as a prop
            "materials"=> Material::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('nome', 'like', "%{$search}%")
                          ->orWhere('descricao', 'like', "%{$search}%");
                })
                ->orderBy("id", "desc")
                ->paginate(10)
                ->withQueryString(), // Keeps ?search=XYZ in pagination links

            // Send the current search term back to populate the input field
            'filters' => $request->only(['search']),
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

    public function update(
        Request $request,
        Material $material,
    ): RedirectResponse {
        // Enable query logging for debugging
        //DB::enableQueryLog();
        //dd($request->all(), $material->toArray());

        $validated = $request->validate([
            "nome" => ["required", "string", "max:255"],
            "descricao" => ["required", "string"],
            "valor" => ["required", "numeric", "min:0"],
        ]);

        $material = Material::whereKey($material->id)
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

    /**
     * Delete the specified team.
     */
    public function destroy(
        Request $request,
        Material $material,
    ): RedirectResponse {
        $material->delete();

        Inertia::flash("toast", [
            "type" => "success",
            "message" => __("Material deleted."),
        ]);

        return to_route("materials", ["materials" => $material->id]);
    }
}
