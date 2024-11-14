<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\Controller;
use App\Models\Bpp;
use App\Models\BuiltArea;
use App\Models\Gapoktan;
use App\Models\LandAgriculture;
use App\Models\Poktan;
use App\Models\Subak;
use App\Models\Village;
use App\Models\VillageAgricultureRecap;
use Illuminate\Http\Request;

class VillageAgricultureRecapController extends Controller
{
    public static function generateRecap()
    {
        try {
            // Get village IDs in Buleleng
            $villages = Village::whereHas('district', function ($query) {
                $query->where('regency_id', 5108);
            })->get();

            foreach ($villages as $village) {
                // Hitung jumlah Gapoktan, Poktan, Subak, BPP, PPL, dan data lainnya berdasarkan village_id
                $gapoktanCount = Gapoktan::where('village_id', $village->id)->count();
                $poktanCount = Poktan::where('village_id', $village->id)->count();
                $subakCount = Subak::where('village_id', $village->id)->count();
                $bppCount = Bpp::where('district_id', $village->district_id)->count();
                $landAgricultureCount = LandAgriculture::where('village_id', $village->id)->count();
                $landArea = LandAgriculture::where('village_id', $village->id)->sum('land_area'); // Asumsikan 'area' adalah kolom yang menyimpan luas tanah
                $pplCount = BuiltArea::where('village_id', $village->id)->count();

                // Get current timestamp
                $currentTimestamp = now()->timezone('Asia/Makassar');

                // Data yang akan disimpan atau diupdate
                $recapData = [
                    'village_id' => $village->id,
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
                if (!VillageAgricultureRecap::where('village_id', $village->id)->exists()) {
                    $recapData['created_at'] = $currentTimestamp;
                }

                // Update if village_id exists, otherwise insert
                VillageAgricultureRecap::updateOrInsert(
                    ['village_id' => $village->id], // Condition to check
                    $recapData // Data to insert or update
                );
            }

            // Return success message as JSON response
            return response()->json([
                'success' => true,
                'message' => 'Village agriculture recap has been successfully generated.'
            ]);
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Error generating village agriculture recap: ' . $e->getMessage());

            // Return an error response or view
            return response()->json([
                'error' => 'There was an issue generating the village agriculture recap. Please try again later.',
                'message' => $e->getMessage()
            ], 500); // HTTP Status Code 500 (Internal Server Error)
        }
    }
}
