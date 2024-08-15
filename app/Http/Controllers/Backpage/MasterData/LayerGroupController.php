<?php

namespace App\Http\Controllers\Backpage\MasterData;

use App\Http\Controllers\Controller;
use App\Models\LayerGrup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LayerGroupController extends Controller
{
    private $validationMessages = [
        'name.required' => 'Nama komoditas harus diisi.',
        'name.max' => 'Nama komoditas tidak boleh lebih dari :max karakter.',
        'status.required' => 'Status harus diisi.',
        'status.max' => 'Status tidak boleh lebih dari :max karakter.',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->status;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $layerGroupQuery = LayerGrup::latest();

        if ($status) {
            $layerGroupQuery->where('status', $status);
        }

        if ($search) {
            $layerGroupQuery->where('name', 'like', '%' . $search . '%');
        }

        $layerGroups = $layerGroupQuery->paginate($perpage);

        return Inertia::render('Backpage/MasterData/LayerGroup/Index', [
            'navName' => 'Master Data Layer Grup',
            'searchValue' => $request->search ?? '',
            'statusValue' => $request->status ?? '',
            'layerGroups' => $layerGroups,
        ]);
        // return response()->json($layerGroups);
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
            'name' => 'required|string|max:50',
            'status' => 'required|string|max:50',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        LayerGrup::create($validatedData);

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
        $layerGroup = LayerGrup::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'status' => 'required|string|max:50',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        $layerGroup->update($validatedData);

        return response()->json([
            'message' => 'Data berhasil diperbarui.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $layerGroup = LayerGrup::findOrFail($id);

        $layerGroup->delete();

        return redirect()->route('layer-grup.index')->with('success', 'Layer Group deleted successfully.');
    }
}
