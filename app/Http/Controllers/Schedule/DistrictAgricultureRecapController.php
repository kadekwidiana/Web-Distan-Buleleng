<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\Controller;
use App\Models\Bpp;
use App\Models\BuiltArea;
use App\Models\District;
use App\Models\DistrictAgricultureRecap;
use App\Models\Gapoktan;
use App\Models\LandAgriculture;
use App\Models\Poktan;
use App\Models\Ppl;
use App\Models\Subak;
use App\Models\Village;

class DistrictAgricultureRecapController extends Controller
{
    public static function generateRecap()
    {
        try {
            // Get district IDs in Buleleng
            $districts = District::where('regency_id', 5108)->pluck('id')->toArray();

            foreach ($districts as $districtId) {
                // Ambil village_id yang ada di dalam district_id
                $villageIds = Village::where('district_id', $districtId)->pluck('id')->toArray();

                // Hitung jumlah Gapoktan, Poktan, Subak, BPP, PPL, dan data lainnya berdasarkan district_id
                $gapoktanCount = Gapoktan::whereIn('village_id', $villageIds)->count();
                $poktanCount = Poktan::whereIn('village_id', $villageIds)->count();
                $subakCount = Subak::whereIn('village_id', $villageIds)->count();
                $bppCount = Bpp::where('district_id', $districtId)->count();
                $landAgricultureCount = LandAgriculture::whereIn('village_id', $villageIds)->count();
                $landArea = LandAgriculture::whereIn('village_id', $villageIds)->sum('land_area'); // Asumsikan 'area' adalah kolom yang menyimpan luas tanah
                $pplCount = BuiltArea::whereIn('village_id', $villageIds)->count();

                // Get current timestamp
                $currentTimestamp = now()->timezone('Asia/Makassar');

                // Data yang akan disimpan atau diupdate
                $recapData = [
                    'district_id' => $districtId,
                    'gapoktan_count' => $gapoktanCount,
                    'poktan_count' => $poktanCount,
                    'subak_count' => $subakCount,
                    'bpp_count' => $bppCount,
                    'land_agriculture_count' => $landAgricultureCount,
                    'land_area' => $landArea,
                    'ppl_count' => $pplCount,
                    'updated_at' => $currentTimestamp,
                ];

                // Check if record exists to set created_at
                if (!DistrictAgricultureRecap::where('district_id', $districtId)->exists()) {
                    $recapData['created_at'] = $currentTimestamp;
                }

                // Update if district_id exists, otherwise insert
                DistrictAgricultureRecap::updateOrInsert(
                    ['district_id' => $districtId], // Condition to check
                    $recapData // Data to insert or update
                );
            }

            // Return success message as JSON response
            return response()->json([
                'success' => true,
                'message' => 'District agriculture recap has been successfully generated.'
            ]);
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Error generating district agriculture recap: ' . $e->getMessage());

            // Return an error response or view
            return response()->json([
                'error' => 'There was an issue generating the district agriculture recap. Please try again later.',
                'message' => $e->getMessage()
            ], 500); // HTTP Status Code 500 (Internal Server Error)
        }
    }
}
