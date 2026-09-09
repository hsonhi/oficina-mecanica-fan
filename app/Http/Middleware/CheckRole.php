<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        // 1. Ensure the user is logged in
        // 2. Check if the user's role exists anywhere inside the permitted $roles array
        if (! $request->user() || ! in_array($request->user()->role, $roles, true)) {
            abort(403, 'Não tem permissão para aceder este conteúdo.');
        }

        return $next($request);
    }
}
