<?php

namespace App\Http\Controllers\Backpage\MasterData;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\TypeAgriculture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CommodityController extends Controller
{
    // Validation messages in Indonesian
    private $validationMessages = [
        'type_agriculture_id.required' => 'Jenis pertanian harus diisi.',
        'type_agriculture_id.exists' => 'Jenis pertanian tidak valid.',
        'name.required' => 'Nama komoditas harus diisi.',
        'name.max' => 'Nama komoditas tidak boleh lebih dari :max karakter.',
        'icon.required' => 'Ikon komoditas harus diunggah.',
        'icon.file' => 'Ikon harus berupa file.',
        'icon.mimes' => 'Ikon harus berupa file bertipe: :values.',
        'icon.max' => 'Ukuran ikon tidak boleh lebih dari :max kilobyte.',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $typeAgriculture = $request->typeAgriculture;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $typeAgricultures = TypeAgriculture::all();
        $commoditiesQuery = Commodity::with(['typeAgriculture'])->latest();

        if ($typeAgriculture) {
            $commoditiesQuery->where('type_agriculture_id', $typeAgriculture);
        }

        if ($search) {
            $commoditiesQuery->where('name', 'like', '%' . $search . '%');
        }

        $commodities = $commoditiesQuery->paginate($perpage);

        return Inertia::render('Backpage/MasterData/Commodity/Index', [
            'navName' => 'Master Data Komoditas',
            'searchValue' => $request->search ?? '',
            'typeAgricultureValue' => $request->typeAgriculture ?? '',
            'commodities' => $commodities,
            'typeAgricultures' => $typeAgricultures,
        ]);
        // return response()->json($commodities);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('commodities.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type_agriculture_id' => 'required|exists:type_agricultures,id',
            'name' => 'required|string|max:50',
            'icon' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        if ($request->hasFile('icon')) {
            $validatedData['icon'] = $request->file('icon')->store('master-data-commodity-icon');
        }

        Commodity::create($validatedData);

        return response()->json([
            'message' => 'Data berhasil ditambahkan.',
        ], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commodity $commodity)
    {
        return view('commodities.edit', compact('commodity'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $commodity = Commodity::findOrFail($id);
        $validatedData = $request->validate([
            'type_agriculture_id' => 'required|exists:type_agricultures,id',
            'name' => 'required|string|max:50',
            'icon' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        if ($request->hasFile('icon')) {
            if ($commodity->icon) {
                Storage::delete($commodity->icon);
            }

            $validatedData['icon'] = $request->file('icon')->store('master-data-commodity-icon');
        }

        $commodity->update($validatedData);

        return response()->json([
            'message' => 'Data berhasil diperbarui.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $commodity = Commodity::findOrFail($id);
        if ($commodity->icon) {
            Storage::delete($commodity->icon);
        }

        $commodity->delete();

        return redirect()->route('komoditas.index')->with('success', 'Commodity deleted successfully.');
    }
}
