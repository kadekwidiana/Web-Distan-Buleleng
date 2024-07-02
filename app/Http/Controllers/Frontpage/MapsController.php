<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\DataSpatial;
use App\Models\Gapoktan;
use App\Models\LandAgriculture;
use App\Models\LayerGrup;
use App\Models\Poktan;
use App\Models\Subak;
use App\Models\TypeAgriculture;
use App\Models\TypeLandAgriculture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapsController extends Controller
{
    public function index()
    {
        $layerGroups = LayerGrup::all();
        $typeAgricultures = TypeAgriculture::all();
        $typeLandAgricultures = TypeLandAgriculture::all();
        $dataSpatials = DataSpatial::all();
        $gapoktans = Gapoktan::all();
        $poktans = Poktan::all();
        $subaks = Subak::all();
        $landAgricultures = LandAgriculture::with(['typeLandAgriculture', 'poktan', 'subak', 'commodities'])->get();
        $commodities = Commodity::with(['landAgricultures'])->get();

        $data = [
            'layerGroups' => $layerGroups,
            'typeAgricultures' => $typeAgricultures,
            'commodities' => $commodities,
            'typeLandAgricultures' => $typeLandAgricultures,
            'dataSpatials' => $dataSpatials,
            'gapoktans' => $gapoktans,
            'poktans' => $poktans,
            'subaks' => $subaks,
            'landAgricultures' => $landAgricultures,
        ];

        return Inertia::render('Frontpage/Maps/Index', $data);
    }
}
