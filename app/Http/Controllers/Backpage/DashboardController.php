<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\BuiltArea;
use App\Models\DataSpatial;
use App\Models\Gapoktan;
use App\Models\LandAgriculture;
use App\Models\OutreachActivities;
use App\Models\Poktan;
use App\Models\Ppl;
use App\Models\Subak;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $userSession = Auth::user();
        $builtAreasPpl = [];
        $gapoktanCount = Gapoktan::count();
        $poktanCount = Poktan::count();
        $subakCount = Subak::count();
        $landAgricultureCount = LandAgriculture::count();
        $pplCount = Ppl::count();
        $outreachActivityCount = OutreachActivities::count();
        $dataSpatialCount = DataSpatial::count();
        // Hitung jumlah penyuluhan bulan ini
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $outreachActivitiesThisMonthCount = OutreachActivities::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();
            // Ensure unique villages based on ID
            $uniqueVillages = $villages->unique('id');

            $builtAreasPpl = $uniqueVillages->values()->toArray();

            // Count OutreachActivities based on the village IDs
            $outreachActivityCount = OutreachActivities::where('ppl_nip', $user->ppl->nip)->count();
            $outreachActivitiesThisMonthCount = OutreachActivities::where('ppl_nip', $user->ppl->nip)->whereIn('village_id', $villageIds)->whereMonth('created_at', $currentMonth)
                ->whereYear('created_at', $currentYear)
                ->count();
        }
        // dd([
        //     'navName' => 'Dashboard',
        //     'gapoktanCount' => $gapoktanCount,
        //     'poktanCount' => $poktanCount,
        //     'subakCount' => $subakCount,
        //     'landAgricultureCount' => $landAgricultureCount,
        //     'pplCount' => $pplCount,
        //     'outreachActivityCount' => $outreachActivityCount,
        //     'dataSpatialCount' => $dataSpatialCount,
        //     'outreachActivitiesThisMonthCount' => $outreachActivitiesThisMonthCount,
        //     'builtAreasPpl' => $builtAreasPpl,
        // ]);
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
            'builtAreasPpl' => $builtAreasPpl,
        ]);
    }
}
