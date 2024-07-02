<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\DataSpatial;
use App\Models\Gapoktan;
use App\Models\LandAgriculture;
use App\Models\LayerGrup;
use App\Models\Poktan;
use App\Models\Province;
use App\Models\Subak;
use App\Models\TypeAgriculture;
use App\Models\TypeLandAgriculture;
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
    public function testPage()
    {
        $layerGroups = LayerGrup::all();
        $typeAgricultures = TypeAgriculture::all();
        $datas = LandAgriculture::with(['typeLandAgriculture', 'poktan', 'subak', 'commodities'])->get();

        echo ($datas);
    }
}
