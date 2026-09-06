<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia("/", "welcome")->name("home");

//Route::inertia('/materials', 'materials'); //Simple route to render the materials page without a controller and data fetching. --- IGNORE ---
Route::get("/materials", [MaterialsController::class, "index"])->name(
    "materials",
);
Route::get("/addmaterial", [MaterialsController::class, "add"])->name(
    "addmaterial",
);
Route::post("/addmaterial", [MaterialsController::class, "store"])->name(
    "materials.store",
); //This route is for storing new materials. --- IGNORE ---

Route::prefix("{current_team}")
    ->middleware(["auth", "verified", EnsureTeamMembership::class])
    ->group(function () {
        Route::get("dashboard", DashboardController::class)->name("dashboard");
    });

Route::middleware(["auth"])->group(function () {
    Route::post("invitations/{invitation}/accept", [
        TeamInvitationController::class,
        "accept",
    ])->name("invitations.accept");
    Route::delete("invitations/{invitation}", [
        TeamInvitationController::class,
        "decline",
    ])->name("invitations.decline");
});

require __DIR__ . "/settings.php";
