<?php

namespace App\Http\Controllers\Backpage\MasterData;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VillageController extends Controller
{
    private $validationMessages = [
        'id.required' => 'ID harus diisi.',
        'id.string' => 'ID harus berupa teks.',
        'id.min' => 'ID harus terdiri dari minimal 10 karakter.',
        'id.max' => 'ID tidak boleh lebih dari 10 karakter.',
        'id.unique' => 'ID sudah digunakan, silakan gunakan ID lain.',

        'district_id.required' => 'Kecamatan harus diisi.',
        'district_id.exists' => 'Kecamatan tidak ditemukan dalam data kecamatan.',

        'name.required' => 'Nama desa harus diisi.',
        'name.string' => 'Nama desa harus berupa teks.',
        'name.max' => 'Nama desa tidak boleh lebih dari 50 karakter.',

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
        $districtId = $request->districtId;

        // Mendapatkan semua kecamatan di Buleleng untuk dropdown filter
        $districts = District::where('regency_id', 5108)->get();

        // Query desa di Buleleng dan sertakan district serta regency
        $villagesQuery = Village::whereHas('district', function ($query) use ($districtId) {
            $query->where('regency_id', 5108);

            // Filter by districtId jika disediakan
            if ($districtId) {
                $query->where('id', $districtId);
            }
        })->with(['district.regency']); // Memastikan district dan regency ikut ditampilkan

        // Filter berdasarkan nama desa jika pencarian disediakan
        if ($search) {
            $villagesQuery->where('name', 'like', '%' . $search . '%');
        }

        $villages = $villagesQuery->paginate($perpage);

        return Inertia::render('Backpage/MasterData/Village/Index', [
            'navName' => 'Master Data Desa di Buleleng',
            'searchValue' => $search ?? '',
            'districtIdValue' => $districtId,
            'villages' => $villages,
            'districts' => $districts,
        ]);
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
            'id' => 'required|string|min:10|max:10|unique:villages,id',
            'district_id' => 'required|exists:districts,id',
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

        Village::create($validatedData);

        return response()->json([
            'message' => 'Data berhasil ditambahkan.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Cari data village berdasarkan id, jika tidak ditemukan akan memunculkan error 404
        $villageById = Village::with(['district'])->findOrFail($id);

        // Kembalikan response Inertia dengan data villageById
        return Inertia::render('Backpage/MasterData/Village/Detail', [
            'navName' => 'Detail Master Data Desa ' . $villageById->name,
            'villageById' => $villageById,
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
        $village = Village::findOrFail($id);

        $validatedData = $request->validate([
            'id' => 'required|string|min:10|max:10|unique:villages,id,' . $village->id,
            'district_id' => 'required|exists:districts,id',
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

        $village->update($validatedData);

        return response()->json([
            'message' => 'Data berhasil diperbarui.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Cari data village berdasarkan id, jika tidak ditemukan akan memunculkan error 404
        $village = Village::findOrFail($id);

        // Hapus data village
        $village->delete();

        return redirect()->route('desa.index')->with('success', 'Village deleted successfully.');
    }
}
