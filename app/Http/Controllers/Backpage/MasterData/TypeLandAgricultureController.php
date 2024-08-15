<?php

namespace App\Http\Controllers\Backpage\MasterData;

use App\Http\Controllers\Controller;
use App\Models\LayerGrup;
use App\Models\TypeLandAgriculture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeLandAgricultureController extends Controller
{
    private $validationMessages = [
        'layer_group_id.required' => 'Layer grup harus diisi.',
        'layer_group_id.exists' => 'Layer grup tidak ditemukan.',
        'name.required' => 'Nama harus diisi.',
        'name.max' => 'Nama tidak boleh lebih dari :max karakter.'
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $layerGroupId = $request->layerGroupId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $typeLandAgricultureQuery = TypeLandAgriculture::latest();

        $layerGroups = LayerGrup::all();

        if ($layerGroupId) {
            $typeLandAgricultureQuery->where('layer_group_id', $layerGroupId);
        }

        if ($search) {
            $typeLandAgricultureQuery->where('name', 'like', '%' . $search . '%');
        }

        $typeLandAgricultures = $typeLandAgricultureQuery->paginate($perpage);

        return Inertia::render('Backpage/MasterData/TypeLandAgriculture/Index', [
            'navName' => 'Master Data Jenis Lahan Pertanian',
            'searchValue' => $request->search ?? '',
            'layerGroupIdValue' => $request->layerGroupId ?? '',
            'typeLandAgricultures' => $typeLandAgricultures,
            'layerGroups' => $layerGroups,
        ]);
        // return response()->json($typeLandAgricultures);
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
        // dd($request);
        $validatedData = $request->validate([
            'layer_group_id' => 'required|string|max:50',
            'name' => 'required|string|max:50',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        TypeLandAgriculture::create($validatedData);

        return response()->json([
            'message' => 'Data berhasil ditambahkan.',
        ], 201);
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
        $typeAgriculture = TypeLandAgriculture::findOrFail($id);
        $validatedData = $request->validate([
            'layer_group_id' => 'required|string|max:50',
            'name' => 'required|string|max:50',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        $typeAgriculture->update($validatedData);

        return response()->json([
            'message' => 'Data berhasil diperbarui.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $typeAgriculture = TypeLandAgriculture::findOrFail($id);

        $typeAgriculture->delete();

        return redirect()->route('jenis-lahan-pertanian.index')->with('success', 'Layer Group deleted successfully.');
    }
}
