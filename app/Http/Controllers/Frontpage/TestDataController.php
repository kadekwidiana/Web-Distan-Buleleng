<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\DataSpatial;
use App\Models\LandAgriculture;
use App\Models\LayerGrup;
use App\Models\Province;
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
        $datas = LayerGrup::with(['typeAgricultures', 'typeLandAgricultures', 'dataSpatials', 'gapoktans', 'poktans', 'subaks', 'landAgricultures'])->get();

        echo ($datas);
    }
}
