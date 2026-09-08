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


Route::get('/mechanics', [MechanicController::class, 'index'])->name('mechanics.index');
Route::post("/mechanics/add", [MechanicController::class, "store"])->name("mechanics.store");
Route::put("mechanics/edit/{mechanic}", [MechanicController::class, "update"])->name("mechanics.update");
Route::delete("mechanics/delete/{mechanic}", [MechanicController::class,"destroy"])->name("mechanics.destroy");


Route::get("/aircrafts", [AircraftController::class, "index"])->name("aircrafts.index");
Route::get("/aircrafts/add", [AircraftController::class, "add"])->name("aircrafts.add");
Route::get("aircrafts/edit/{aircraft}", [AircraftController::class, "edit"])->name("aircrafts.edit");
Route::post("/aircrafts/add", [AircraftController::class, "store"])->name("aircrafts.store");
Route::put("aircrafts/edit/{aircraft}", [AircraftController::class, "update"])->name("aircrafts.update");
Route::delete("aircrafts/delete/{aircraft}", [AircraftController::class,"destroy"])->name("aircrafts.destroy");

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
