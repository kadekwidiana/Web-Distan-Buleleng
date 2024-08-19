<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\DataSpatial;
use App\Models\Gapoktan;
use App\Models\OutreachActivities;
use App\Models\Poktan;
use App\Models\Ppl;
use App\Models\Subak;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $gapoktanCount = Gapoktan::count();
        $poktanCount = Poktan::count();
        $subakCount = Subak::count();
        $landAgricultureCount = Subak::count();
        $pplCount = Ppl::count();
        $outreachActivityCount = OutreachActivities::count();
        $dataSpatialCount = DataSpatial::count();

        // Hitung jumlah penyuluhan bulan ini
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $outreachActivitiesThisMonthCount = OutreachActivities::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();

        return Inertia::render('Backpage/Dashboard/Index', [
            'navName' => 'Dashboard',
            'gapoktanCount' => $gapoktanCount,
            'poktanCount' => $poktanCount,
            'subakCount' => $subakCount,
            'landAgricultureCount' => $landAgricultureCount,
            'pplCount' => $pplCount,
            'outreachActivityCount' => $outreachActivityCount,
            'dataSpatialCount' => $dataSpatialCount,
            'outreachActivitiesThisMonthCount' => $outreachActivitiesThisMonthCount,
        ]);
    }
}
