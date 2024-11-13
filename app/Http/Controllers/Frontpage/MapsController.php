<?php

namespace App\Http\Controllers\Frontpage;

use App\Http\Controllers\Controller;
use App\Models\Bpp;
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
        // Fetch all layer groups
        $layerGroups = LayerGrup::all();

        // Fetch type agricultures
        $typeAgricultures = TypeAgriculture::all();

        // Fetch type land agricultures
        $typeLandAgricultures = TypeLandAgriculture::all();

        // Fetch data spatials with ACTIVE status
        $dataSpatials = DataSpatial::where('status', 'ACTIVE')->get();

        // Fetch gapoktans with ACTIVE status
        $gapoktans = Gapoktan::where('status', 'ACTIVE')->get();

        // Fetch poktans with ACTIVE status
        $poktans = Poktan::where('status', 'ACTIVE')->get();

        // Fetch subaks with ACTIVE status
        $subaks = Subak::where('status', 'ACTIVE')->get();

        // Fetch poktans with ACTIVE status
        $bpps = Bpp::where('status', 'ACTIVE')->get();

        // Fetch land agricultures with ACTIVE status and their related data
        $landAgricultures = LandAgriculture::with(['owner', 'cultivator', 'typeLandAgriculture', 'poktan', 'subak', 'commodities'])
            ->where('status', 'ACTIVE')
            ->get();

        // Fetch commodities with ACTIVE land agricultures
        $commodities = Commodity::with(['landAgricultures' => function ($query) {
            $query->where('status', 'ACTIVE');
        }])
            ->get();

        // Prepare data for the view
        $data = [
            'layerGroups' => $layerGroups,
            'typeAgricultures' => $typeAgricultures,
            'commodities' => $commodities,
            'typeLandAgricultures' => $typeLandAgricultures,
            'dataSpatials' => $dataSpatials,
            'gapoktans' => $gapoktans,
            'poktans' => $poktans,
            'subaks' => $subaks,
            'bpps' => $bpps,
            'landAgricultures' => $landAgricultures,
        ];

        return Inertia::render('Frontpage/Maps/Index', $data);
    }
}
