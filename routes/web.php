<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\AircraftController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;

//Route::inertia("/", "welcome")->name("home");
Route::get('/', function () {
    return redirect()->route('login');
})->name('home'); 

//####################### FAN #####################

Route::middleware(['auth', 'verified'])->group(function () {
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

    Route::get("/services", [ServiceController::class, "index"])->name("services.index");
    Route::get("/services/add", [ServiceController::class, "add"])->name("services.add");
    Route::get("services/edit/{service}", [ServiceController::class, "edit"])->name("services.edit");
    Route::post("/services/add", [ServiceController::class, "store"])->name("services.store");
    Route::put("services/edit/{service}", [ServiceController::class, "update"])->name("services.update");
    Route::delete("services/delete/{service}", [ServiceController::class,"destroy"])->name("services.destroy");

    

Route::middleware(['auth', 'role:administrador'])->group(function () {
      
Route::get("/users", [UserController::class, "index"])->name("users.index");
    Route::get("/users/add", [UserController::class, "add"])->name("users.add");
    Route::get("users/edit/{user}", [UserController::class, "edit"])->name("users.edit");
    Route::post("/users/add", [UserController::class, "store"])->name("users.store");
    Route::put("users/edit/{user}", [UserController::class, "update"])->name("users.update");
    Route::delete("users/delete/{user}", [UserController::class,"destroy"])->name("users.destroy");

    });
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
