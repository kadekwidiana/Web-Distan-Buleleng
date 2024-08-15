<?php

namespace App\Http\Controllers\Backpage\MasterData;

use App\Http\Controllers\Controller;
use App\Models\LayerGrup;
use App\Models\TypeAgriculture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeAgricultureController extends Controller
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

        $typeAgricultureQuery = TypeAgriculture::latest();

        $layerGroups = LayerGrup::all();

        if ($layerGroupId) {
            $typeAgricultureQuery->where('layer_group_id', $layerGroupId);
        }

        if ($search) {
            $typeAgricultureQuery->where('name', 'like', '%' . $search . '%');
        }

        $typeAgricultures = $typeAgricultureQuery->paginate($perpage);

        return Inertia::render('Backpage/MasterData/TypeAgriculture/Index', [
            'navName' => 'Master Data Jenis Pertanian',
            'searchValue' => $request->search ?? '',
            'layerGroupIdValue' => $request->layerGroupId ?? '',
            'typeAgricultures' => $typeAgricultures,
            'layerGroups' => $layerGroups,
        ]);
        // return response()->json($typeAgricultures);
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

        TypeAgriculture::create($validatedData);

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
        $typeAgriculture = TypeAgriculture::findOrFail($id);
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
        $typeAgriculture = TypeAgriculture::findOrFail($id);

        $typeAgriculture->delete();

        return redirect()->route('jenis-pertanian.index')->with('success', 'Layer Group deleted successfully.');
    }
}
