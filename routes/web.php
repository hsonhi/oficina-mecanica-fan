<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\AircraftController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia("/", "welcome")->name("home");

//####################### FAN #####################

Route::get("/materials", [MaterialsController::class, "index"])->name("materials.index");
Route::get("/materials/add", [MaterialsController::class, "add"])->name("materials.add");
Route::get("materials/edit/{material}", [MaterialsController::class, "edit"])->name("materials.edit");

Route::post("/materials/add", [MaterialsController::class, "store"])->name("materials.store");
Route::put("materials/edit/{material}", [MaterialsController::class, "update"])->name("materials.update");
Route::delete("materials/delete/{material}", [MaterialsController::class,"destroy"])->name("materials.destroy");

//////////////////////////////////

//Route::get("/mechanics", [MechanicController::class, "index"])->name("mechanics",);
 
Route::middleware(['auth'])->group(function () {
    Route::get('/mechanics', [MechanicController::class, 'index'])->name('mechanics.index');
});
//####################### FAN #####################

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
