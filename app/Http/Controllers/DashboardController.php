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

        $pendingInvitations = TeamInvitation::query()
            ->with(['inviter', 'team'])
            ->whereRaw('LOWER(email) = ?', [$email])
            ->whereNull('accepted_at')
            ->where(fn ($query) => $query
                ->whereNull('expires_at')
                ->orWhere('expires_at', '>=', now()))
            ->latest()
            ->get()
            ->map(fn (TeamInvitation $invitation) => [
                'code' => $invitation->code,
                'inviterName' => $invitation->inviter->name,
                'team' => [
                    'name' => $invitation->team->name,
                    'slug' => $invitation->team->slug,
                ],
            ]);

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
            'pendingInvitations' => $pendingInvitations,
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
