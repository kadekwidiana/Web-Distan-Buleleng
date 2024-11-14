<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKeyValid = env('API_KEY_INTEGRATION', 'default_fallback_key');
        $apiKey = $request->header('X-API-KEY');

        if (!$apiKey || $apiKey !== $apiKeyValid) {
            return response()->json(['message' => 'Invalid API Key'], 401);
        }

        return $next($request);
    }
}
