<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\DataSpatial;
use App\Models\District;
use App\Models\Gapoktan;
use App\Models\LandAgriculture;
use App\Models\LayerGrup;
use App\Models\Poktan;
use App\Models\Province;
use App\Models\Subak;
use App\Models\TypeAgriculture;
use App\Models\TypeLandAgriculture;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestDataController extends Controller
{
    // public function testPage()
    // {
    //     $datas = LandAgriculture::with('commodities')->get();
    //     $lahanPertanianById = LandAgriculture::with('commodities')->find(1);
    //     $commodity = ['5', '6', '7'];
    //     $lahanPertanianById->commodities()->sync($commodity);
    //     echo ($lahanPertanianById);
    // }
    // public function testPage(Request $request)
    // {
    //     // $district_id = $request->district_id;
    //     // $layerGroups = LayerGrup::all();
    //     // $typeAgricultures = TypeAgriculture::all();
    //     // $districts = District::where('regency_id', 5108)->with('villages')->get(); // kecamatan di kab. buleleng

    //     // $villages = Village::where('district_id', $district_id)->with('gapoktans')->get();
    //     // $villageGapoktans = Village::where('id', 5108050010)->withCount('gapoktans')->first();
    //     // $gapoktansCount = $villageGapoktans->gapoktans->count();
    //     // $datas = Gapoktan::all();
    //     $districts = District::where('regency_id', 5108)->with(['villages' => function ($query) {
    //         $query->withCount('gapoktans');
    //     }])->get();

    //     $districts = $districts->map(function ($district) {
    //         $districtGapoktansCount = $district->villages->sum('gapoktans_count');
    //         $district->gapoktans_count = $districtGapoktansCount;
    //         return $district;
    //     });

    //     echo ($districts);
    // }

    public function testPage(Request $request)
    {
        // $district_id = $request->district_id;
        // $layerGroups = LayerGrup::all();
        // $typeAgricultures = TypeAgriculture::all();
        // $districts = District::where('regency_id', 5108)->with('villages')->get(); // kecamatan di kab. buleleng

        // $villages = Village::where('district_id', $district_id)->with('gapoktans')->get();
        // $villageGapoktans = Village::where('id', 5108050010)->withCount('gapoktans')->first();
        // $gapoktansCount = $villageGapoktans->gapoktans->count();
        // $datas = Gapoktan::all();
        // $districts = District::where('regency_id', 5108)->with(['villages' => function ($query) {
        //     $query->with('gapoktans');
        // }])->get();

        // $districts = $districts->map(function ($district) {
        //     $districtGapoktansCount = $district->villages->sum('gapoktans_count');
        //     $district->gapoktans_count = $districtGapoktansCount;
        //     return $district;
        // });

        // Mengambil desa-desa yang ada di kecamatan dengan id 5108050
        $villages = Village::where('district_id', 5108050)->with('gapoktans')->get();

        // Mengambil semua Gapoktan yang terkait dengan desa-desa tersebut
        $gapoktans = $villages->flatMap(function ($village) {
            return $village->gapoktans;
        });

        // Menampilkan hasil
        echo $gapoktans;
    }
}
