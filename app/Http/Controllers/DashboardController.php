<?php

namespace App\Http\Controllers;

use App\Models\TeamInvitation;
use App\Models\Aircraft;
use App\Models\Material;
use App\Models\Mechanic;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $email = strtolower($request->user()->email);

        $today = now()->toDateString();
        $services = Service::query();

        $recentServices = Service::query()
            ->with('aircrafts:id,chassi,marca,modelo')
            ->latest('data_inicio')
            ->limit(5)
            ->get()
            ->map(fn (Service $service) => [
                'id' => $service->id,
                'aircraft' => $service->aircrafts
                    ? trim("{$service->aircrafts->marca} {$service->aircrafts->modelo}")
                    : 'Aeronave não identificada',
                'chassi' => $service->aircrafts?->chassi,
                'startDate' => $service->data_inicio,
                'endDate' => $service->data_fim,
            ]);

        return Inertia::render('dashboard', [
            'statistics' => [
                'aircraft' => Aircraft::count(),
                'services' => $services->count(),
                'mechanics' => Mechanic::count(),
                'materials' => Material::count(),
                'activeServices' => (clone $services)
                    ->where('data_inicio', '<=', $today)
                    ->where('data_fim', '>=', $today)
                    ->count(),
                'upcomingServices' => (clone $services)
                    ->where('data_inicio', '>', $today)
                    ->count(),
                'recentServices' => $recentServices,
            ],
        ]);
    }
}
