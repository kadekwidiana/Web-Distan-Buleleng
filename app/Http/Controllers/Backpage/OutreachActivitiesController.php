<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\OutreachActivities;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutreachActivitiesController extends Controller
{
    public function outreachActivitiesRegency(Request $request)
    {
        // regency_id buleleng
        $districtWithOutreachActivities = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->withCount('outreachActivities');
        }])->get();

        $districtWithOutreachActivities = $districtWithOutreachActivities->map(function ($district) {
            $districtOutreachActivityCount = $district->villages->sum('outreach_activities_count'); // ternyata nama atribute nya harus sama (misal land_agricultures_count untuk landAgricultures) dan pake snake case
            $district->outreach_activities_count = $districtOutreachActivityCount;
            return $district;
        });

        return Inertia::render('Backpage/KegiatanPenyuluhan/ListKegiatanPenyuluhanRegency', [
            'navName' => 'Kegiatan Penyuluhan',
            "districtWithOutreachActivities" => $districtWithOutreachActivities
        ]);
    }

    public function outreachActivitiesDistrict(Request $request)
    {
        $districtId = $request->districtId;
        $villageId = $request->villageId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districtWithOutreachActivities = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->with('landAgricultures');
        }])->get();

        $districtData = $districtWithOutreachActivities->firstWhere('id', $districtId);

        $villagesByDistrictId = Village::where('district_id', $districtId)->get();

        // Filter landAgricultures berdasarkan district_id
        $outreachActivityQuery = OutreachActivities::whereHas('village', function ($query) use ($districtId) {
            $query->where('district_id', $districtId);
        });

        if ($villageId) {
            $outreachActivityQuery->where('village_id', $villageId);
        }

        if ($search) {
            $outreachActivityQuery->where('title', 'like', '%' . $search . '%');
        }

        $outreachActivitiesInDiscrict = $outreachActivityQuery->with(['village'])->latest()->paginate($perpage);
        // dd($outreachActivitiesInDiscrict);
        return Inertia::render('Backpage/KegiatanPenyuluhan/ListKegiatanPenyuluhanDistrict', [
            'navName' => 'Kegiatan Penyuluhan',
            'districtData' => $districtData,
            'searchValue' => $request->search ?? '',
            'villageIdValue' => $request->villageId ?? '',
            'villagesByDistrictId' => $villagesByDistrictId,
            'outreachActivitiesInDiscrict' => $outreachActivitiesInDiscrict
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
