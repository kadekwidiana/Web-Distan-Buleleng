<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if ($role == 'ADMIN' && auth()->user()->role != 'ADMIN') {
            // abort(403);
            return Inertia::render('Error/ErrorPage', ['status' => 403])
                ->toResponse(request())
                ->setStatusCode(403);
        }
        return $next($request);
    }
}
