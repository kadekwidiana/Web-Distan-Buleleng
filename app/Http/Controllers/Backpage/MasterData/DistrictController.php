<?php

namespace App\Http\Controllers\Backpage\MasterData;

use App\Http\Controllers\Controller;
use App\Models\District;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    private $validationMessages = [
        'id.required' => 'ID harus diisi.',
        'id.string' => 'ID harus berupa teks.',
        'id.min' => 'ID harus terdiri dari minimal 7 karakter.',
        'id.max' => 'ID tidak boleh lebih dari 7 karakter.',
        'id.unique' => 'ID sudah digunakan, silakan gunakan ID lain.',

        'regency_id.required' => 'ID kabupaten harus diisi.',
        'regency_id.exists' => 'ID kabupaten tidak ditemukan dalam data kabupaten.',

        'name.required' => 'Nama kecamatan harus diisi.',
        'name.string' => 'Nama kecamatan harus berupa teks.',
        'name.max' => 'Nama kecamatan tidak boleh lebih dari 50 karakter.',

        'wide.required' => 'Luas wilayah harus diisi.',
        'wide.numeric' => 'Luas wilayah harus berupa angka.',

        'center_coordinate.required' => 'Koordinat tengah harus diisi.',
        'center_coordinate.json' => 'Koordinat tengah harus dalam format JSON yang valid.',

        'area_json.required' => 'Area JSON harus diisi.',
        'area_json.json' => 'Area JSON harus dalam format JSON yang valid.',

        // Custom validation messages
        'center_coordinate.custom_array' => 'Koordinat tengah harus berupa array dengan dua nilai numerik, misalnya [1212, 1212].',
        'area_json.custom_object' => 'Area JSON harus berupa objek JSON, misalnya {}.'
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districtsQuery = District::where('regency_id', 5108)->with(['regency']);

        if ($search) {
            $districtsQuery->where('name', 'like', '%' . $search . '%');
        }

        $districts = $districtsQuery->paginate($perpage);

        return Inertia::render('Backpage/MasterData/District/Index', [
            'navName' => 'Master Data Kecamatan di Buleleng',
            'searchValue' => $request->search ?? '',
            'districts' => $districts,
        ]);
        // return response()->json($districts);
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
        $validatedData = $request->validate([
            'id' => 'required|string|min:7|max:7|unique:districts,id',
            'regency_id' => 'required|exists:regencies,id',
            'name' => 'required|string|max:50',
            'wide' => 'required|numeric',
            'center_coordinate' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $data = json_decode($value, true);
                    if (!is_array($data) || count($data) !== 2 || !is_numeric($data[0]) || !is_numeric($data[1])) {
                        $fail('Koordinat tengah harus berupa array dengan dua nilai numerik, misalnya [1212, 1212].');
                    }
                },
            ],
            'area_json' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $data = json_decode($value, true);
                    if (!is_array($data) || !empty(array_filter(array_keys($data), 'is_numeric'))) {
                        $fail('Area JSON harus berupa objek JSON, misalnya {}.');
                    }
                },
            ],
        ], $this->validationMessages);

        // Mengonversi lokasi ke array
        $validatedData['center_coordinate'] = json_decode($request->center_coordinate, true);
        $validatedData['area_json'] = json_decode($request->area_json, true);

        District::create($validatedData);

        return response()->json([
            'message' => 'Data berhasil ditambahkan.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Cari data district berdasarkan id, jika tidak ditemukan akan memunculkan error 404
        $districtById = District::with(['regency'])->findOrFail($id);

        // Kembalikan response Inertia dengan data districtById
        return Inertia::render('Backpage/MasterData/District/Detail', [
            'navName' => 'Detail Master Data Kecamatan ' . $districtById->name,
            'districtById' => $districtById,
        ]);
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
    public function update(Request $request, $id)
    {
        $district = District::findOrFail($id);

        $validatedData = $request->validate([
            'id' => 'required|string|min:7|max:7|unique:districts,id,' . $district->id,
            'regency_id' => 'required|exists:regencies,id',
            'name' => 'required|string|max:50',
            'wide' => 'required|numeric',
            'center_coordinate' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $data = json_decode($value, true);
                    if (!is_array($data) || count($data) !== 2 || !is_numeric($data[0]) || !is_numeric($data[1])) {
                        $fail('Koordinat tengah harus berupa array dengan dua nilai numerik, misalnya [1212, 1212].');
                    }
                },
            ],
            'area_json' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $data = json_decode($value, true);
                    if (!is_array($data) || !empty(array_filter(array_keys($data), 'is_numeric'))) {
                        $fail('Area JSON harus berupa objek JSON, misalnya {}.');
                    }
                },
            ],
        ], $this->validationMessages);

        // Mengonversi lokasi ke array
        $validatedData['center_coordinate'] = json_decode($request->center_coordinate, true);
        $validatedData['area_json'] = json_decode($request->area_json, true);

        $district->update($validatedData);

        return response()->json([
            'message' => 'Data berhasil diperbarui.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Cari data district berdasarkan id, jika tidak ditemukan akan memunculkan error 404
        $district = District::findOrFail($id);

        // Hapus data district
        $district->delete();

        return redirect()->route('kecamatan.index')->with('success', 'District deleted successfully.');
    }
}
