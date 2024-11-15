<?php

namespace App\Http\Controllers\API\MasterData;

use App\Http\Controllers\Controller;
use App\Models\Village;
use Illuminate\Http\Request;

class VillageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perpage = $request->perpage ?? 10;
        $search = $request->search;
        $regencyId = $request->regency_id ?? 5108; // Default to 5108 if not provided
        $districtId = $request->district_id; // Optional district filter

        $villagesQuery = Village::with(['district.regency'])
            ->whereHas('district', function ($query) use ($regencyId, $districtId) {
                $query->where('regency_id', $regencyId);

                if ($districtId) {
                    $query->where('id', $districtId);
                }
            });

        if ($search) {
            $villagesQuery->where('name', 'like', '%' . $search . '%');
        }

        $villages = $villagesQuery->paginate($perpage);

        return response()->json($villages);
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
