<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Bpp;
use App\Models\BuiltArea;
use App\Models\District;
use App\Models\Gapoktan;
use App\Models\LandAgriculture;
use App\Models\Poktan;
use App\Models\Ppl;
use App\Models\Subak;
use App\Models\Village;
use Illuminate\Http\Request;

class InformationAgricultureController extends Controller
{
    public function index(Request $request)
    {
        try {
            $districtId = $request->district_id;
            $villageId = $request->village_id;

            if (!$districtId && !$villageId) {
                return response()->json([
                    'success' => false,
                    'message' => 'district_id atau village_id diperlukan.',
                ], 400);  // 400 is for Bad Request
            }

            // Check if district_id exists in the districts table
            $district = District::find($districtId);
            if ($districtId && !$district) {
                return response()->json([
                    'success' => false,
                    'message' => 'district_id tidak valid.',
                ], 404);  // 404 is for Not Found
            }

            // Check if village_id exists in the villages table
            $village = Village::find($villageId);
            if ($villageId && !$village) {
                return response()->json([
                    'success' => false,
                    'message' => 'village_id tidak valid.',
                ], 404);  // 404 is for Not Found
            }

            // Get all village IDs associated with the district ID
            $villageIds = Village::where('district_id', $districtId)->pluck('id')->toArray();

            // Fetch data with filters applied
            $gapoktans = Gapoktan::when($districtId, function ($query) use ($villageIds) {
                return $query->whereIn('village_id', $villageIds);
            })->when($villageId, function ($query) use ($villageId) {
                return $query->where('village_id', $villageId);
            })->get();

            $poktans = Poktan::with(['gapoktan', 'commodities'])  // Eager load Gapoktan and Commodities relationships
                ->when($districtId, function ($query) use ($villageIds) {
                    return $query->whereIn('village_id', $villageIds);
                })
                ->when($villageId, function ($query) use ($villageId) {
                    return $query->where('village_id', $villageId);
                })
                ->get();

            $subaks = Subak::with(['commodities'])
                ->when($districtId, function ($query) use ($villageIds) {
                    return $query->whereIn('village_id', $villageIds);
                })->when($villageId, function ($query) use ($villageId) {
                    return $query->where('village_id', $villageId);
                })->get();

            $land_agricultures = LandAgriculture::with(['poktan', 'subak', 'commodities', 'owner', 'cultivator', 'typeLandAgriculture'])
                ->when($districtId, function ($query) use ($villageIds) {
                    return $query->whereIn('village_id', $villageIds);
                })->when($villageId, function ($query) use ($villageId) {
                    return $query->where('village_id', $villageId);
                })->get();

            // Corrected Bpp query with district_id as FK
            $bpps = Bpp::with(['ppls'])
                ->when($districtId, function ($query) use ($districtId) {
                    return $query->where('district_id', $districtId);
                })->when($villageId, function ($query) use ($villageId) {
                    $districtIdFromVillage = Village::where('id', $villageId)->value('district_id');
                    return $query->where('district_id', $districtIdFromVillage);
                })->get();

            $ppls = BuiltArea::with(['ppl', 'ppl.villages']) // Eager load the Ppl relationship
                ->when($districtId, function ($query) use ($villageIds) {
                    return $query->whereIn('village_id', $villageIds);
                })
                ->when($villageId, function ($query) use ($villageId) {
                    return $query->where('village_id', $villageId);
                })
                ->get();

            $result = [
                'gapoktans' => $gapoktans,
                'poktans' => $poktans,
                'subaks' => $subaks,
                'land_agricultures' => $land_agricultures,
                'bpps' => $bpps,
                'ppls' => $ppls,
            ];

            $response = [
                'success' => true,
                'message' => 'Data berhasil diambil.',
                'data' => $result,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            // if an error occurs, catch and return error response
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data pertanian. Silakan coba lagi.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
