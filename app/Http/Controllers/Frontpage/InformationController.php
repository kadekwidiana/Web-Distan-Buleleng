<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformationController extends Controller
{
    public function index()
    {
        // Get all districts in Buleleng
        $districts = District::where('regency_id', 5108)->get();

        // Get all villages in Buleleng by filtering based on the district IDs
        $villageIds = $districts->pluck('id'); // Get the IDs of the districts
        $villages = Village::whereIn('district_id', $villageIds)->get(); // Get the villages that belong to these districts

        return Inertia::render('Frontpage/Information/Index', [
            'districts' => $districts,
            'villages' => $villages
        ]);
    }
}
