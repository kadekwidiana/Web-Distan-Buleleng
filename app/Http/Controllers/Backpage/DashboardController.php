<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\Gapoktan;
use App\Models\Poktan;
use App\Models\Ppl;
use App\Models\Subak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $gapoktanCount = Gapoktan::count();
        $poktanCount = Poktan::count();
        $subakCount = Subak::count();
        $landAgricultureCount = Subak::count();
        $pplCount = Ppl::count();

        return Inertia::render('Backpage/Dashboard/Index', [
            'navName' => 'Dashboard',
            'gapoktanCount' => $gapoktanCount,
            'poktanCount' => $poktanCount,
            'subakCount' => $subakCount,
            'landAgricultureCount' => $landAgricultureCount,
            'pplCount' => $pplCount,
        ]);
    }
}
