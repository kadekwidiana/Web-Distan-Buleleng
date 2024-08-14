<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\DataSpatial;
use App\Models\LayerGrup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DataSpatialController extends Controller
{
    private $validationMessages = [
        'layer_group_id.required' => 'Layer grup harus diisi.',
        'layer_group_id.exists' => 'Layer grup tidak ditemukan.',
        'name.required' => 'Nama harus diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama tidak boleh lebih dari 50 karakter.',
        'url.required' => 'URL harus diisi.',
        'url.url' => 'URL harus berupa URL yang valid.',
        'type.required' => 'Tipe harus diisi.',
        'type.string' => 'Tipe harus berupa teks.',
        'status.required' => 'Status harus diisi.',
        'status.string' => 'Status harus berupa teks.',
        'file.required' => 'File harus diunggah.',
        'file.file' => 'File harus berupa file.',
        'file.max' => 'Ukuran file tidak boleh lebih dari 50 MB.', // Pesan untuk batas ukuran file
        'attribute.required' => 'Atribut harus diisi.',
        'attribute.string' => 'Atribut harus berupa teks.',
        'description.string' => 'Deskripsi harus berupa teks.',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $typeSpatial = $request->typeSpatial;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $dataSpatialsQuery = DataSpatial::latest();

        if ($typeSpatial) {
            $dataSpatialsQuery->where('type', $typeSpatial);
        }

        if ($search) {
            $dataSpatialsQuery->where('name', 'like', '%' . $search . '%');
        }

        $dataSpatials = $dataSpatialsQuery->paginate($perpage);

        return Inertia::render('Backpage/DataSpatial/Index', [
            'navName' => 'Data Spatial',
            'searchValue' => $request->search ?? '',
            'typeSpatialValue' => $request->typeSpatial ?? '',
            'dataSpatials' => $dataSpatials,
        ]);
        // return response()->json($dataSpatials);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/DataSpatial/Create', [
            'navName' => 'Tambah Data Spasial',
            'layerGroup' => $layerGroup
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'layer_group_id' => 'required|exists:layer_grups,id',
            'name' => 'required|string|max:50',
            'type' => 'required|string',
            'status' => 'required|string',
            'url' => [
                function ($attribute, $value, $fail) use ($request) {
                    $type = $request->input('type');
                    if ($type === 'wms') {
                        if (!$value) {
                            $fail('URL harus diisi ketika tipe adalah WMS.');
                        } elseif (!filter_var($value, FILTER_VALIDATE_URL)) {
                            $fail('URL yang dimasukkan tidak valid.');
                        }
                    }
                },
            ],
            'file' => [
                function ($attribute, $value, $fail) use ($request) {
                    $type = $request->input('type');
                    $extension = strtolower($value ? $value->getClientOriginalExtension() : '');

                    // Jika tipe bukan WMS, file harus diisi
                    if ($type !== 'wms' && !$value) {
                        $fail('File harus diunggah ketika tipe bukan WMS.');
                        return;
                    }

                    // Tentukan ekstensi file yang diizinkan berdasarkan tipe
                    $allowedExtensions = match ($type) {
                        'geojson' => ['geojson'],
                        'shp' => ['zip'],
                        'tiff' => ['tiff'],
                        'tif' => ['tif'],
                        default => [],
                    };

                    if ($type !== 'wms' && empty($allowedExtensions)) {
                        $fail('Tipe yang dipilih tidak valid.');
                        return;
                    }

                    if ($type !== 'wms' && !in_array($extension, $allowedExtensions)) {
                        $fail("File harus bertipe ." . implode(', .', $allowedExtensions) . " sesuai dengan tipe yang dipilih ($type).");
                    }

                    if ($type === 'shp' && $extension !== 'zip') {
                        $fail("File shp harus berupa file ZIP.");
                    }
                },
                'max:51200',
            ],
            'attribute' => 'required|string',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        if ($request->file('file')) {
            // Dapatkan ekstensi file asli
            $extension = strtolower($request->file('file')->getClientOriginalExtension());

            // Simpan file dengan ekstensi asli
            $fileName = $request->file('file')->getClientOriginalName();
            $storedFilePath = $request->file('file')->storeAs('data-spatial-file', $fileName);
            $validatedData['file'] = $storedFilePath;
        }

        $dataSpatial = DataSpatial::create($validatedData);

        return redirect()->route('data-spasial.index')->with('success', 'Data Spatial created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dataSpatialById = DataSpatial::with(['layerGroup'])->firstWhere('id', $id);

        return Inertia::render('Backpage/DataSpatial/Detail', [
            'navName' => 'Detail Data Spasial ' . $dataSpatialById->name,
            'dataSpatialById' => $dataSpatialById,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $dataSpatialById = DataSpatial::findOrFail($id);
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/DataSpatial/Edit', [
            'navName' => 'Edit Data Spasial',
            'dataSpatialById' => $dataSpatialById,
            'layerGroup' => $layerGroup
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dataSpatialById = DataSpatial::findOrFail($id);

        // Validasi permintaan
        $validatedData = $request->validate([
            'layer_group_id' => 'required|exists:layer_grups,id',
            'name' => 'required|string|max:50',
            'type' => 'required|string',
            'status' => 'required|string',
            'url' => [
                'nullable',
                'url',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->input('type') === 'wms' && !$value) {
                        $fail('URL harus diisi ketika tipe adalah WMS.');
                    }
                },
            ],
            'file' => [
                'nullable',
                'max:51200',
                function ($attribute, $value, $fail) use ($request) {
                    $type = $request->input('type');

                    if ($request->hasFile('file')) {
                        $file = $request->file('file');
                        $extension = strtolower($file->getClientOriginalExtension());

                        // Tentukan ekstensi file yang diizinkan berdasarkan tipe
                        $allowedExtensions = match ($type) {
                            'geojson' => ['geojson'],
                            'shp' => ['zip'],
                            'tiff' => ['tiff'],
                            'tif' => ['tif'],
                            default => [],
                        };

                        if (empty($allowedExtensions)) {
                            $fail('Tipe yang dipilih tidak valid.');
                            return;
                        }

                        if (!in_array($extension, $allowedExtensions)) {
                            $fail("File harus bertipe ." . implode(', .', $allowedExtensions) . " sesuai dengan tipe yang dipilih ($type).");
                        }

                        if ($type === 'shp' && $extension !== 'zip') {
                            $fail("File shp harus berupa file ZIP.");
                        }
                    }
                },
            ],
            'attribute' => 'required|string',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        // Jika ada file baru yang diunggah
        if ($request->hasFile('file')) {
            // Hapus file lama jika ada
            if ($dataSpatialById->file && Storage::exists($dataSpatialById->file)) {
                Storage::delete($dataSpatialById->file);
            }

            // Simpan file baru
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $storedFilePath = $file->storeAs('data-spatial-file', $fileName);
            $validatedData['file'] = $storedFilePath;
        }

        // Update data
        $dataSpatialById->update($validatedData);

        return redirect()->route('data-spasial.index')->with('success', 'Data Spatial updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataSpatialById = DataSpatial::findOrFail($id);

        // Delete the photo
        if ($dataSpatialById->file && Storage::exists($dataSpatialById->file)) {
            Storage::delete($dataSpatialById->file);
        }

        $dataSpatialById->delete();

        return redirect()->route('data-spasial.index')->with('success', 'Data Spatial deleted successfully.');
    }
}
