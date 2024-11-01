<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\Bpp;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BPPController extends Controller
{
    private $validationMessages = [
        'district_id.required' => 'Kecamatan harus dipilih.',
        'district_id.exists' => 'Kecamatan yang dipilih tidak valid.',

        'layer_group_id.required' => 'Layer grup harus dipilih.',
        'layer_group_id.exists' => 'Layer grup yang dipilih tidak valid.',

        'name.required' => 'Nama harus diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama tidak boleh lebih dari 50 karakter.',
        'leader.required' => 'Ketua wajib diisi.',
        'leader.string' => 'Ketua harus berupa teks.',
        'leader.max' => 'Ketua maksimal 50 karakter.',
        'secretary.required' => 'Sekretaris wajib diisi.',
        'secretary.string' => 'Sekretaris harus berupa teks.',
        'secretary.max' => 'Sekretaris maksimal 50 karakter.',
        'treasurer.required' => 'Bendahara wajib diisi.',
        'treasurer.string' => 'Bendahara harus berupa teks.',
        'treasurer.max' => 'Bendahara maksimal 50 karakter.',
        'number_of_members.required' => 'Jumlah anggota wajib diisi.',
        'number_of_members.integer' => 'Jumlah anggota harus berupa angka.',
        'since.required' => 'Tahun berdiri wajib diisi.',
        'since.string' => 'Tahun berdiri harus berupa teks.',
        'since.max' => 'Tahun berdiri maksimal 4 karakter.',
        'phone_number.required' => 'Nomor telepon harus diisi.',
        'phone_number.string' => 'Nomor telepon harus berupa teks.',
        'phone_number.max' => 'Nomor telepon tidak boleh lebih dari 12 karakter.',

        'email.required' => 'Email harus diisi.',
        'email.string' => 'Email harus berupa teks.',
        'email.max' => 'Email tidak boleh lebih dari 50 karakter.',

        'status.required' => 'Status harus diisi.',
        'status.string' => 'Status harus berupa teks.',
        'status.max' => 'Status tidak boleh lebih dari 50 karakter.',

        'photos.*.required' => 'Setiap foto harus diunggah.',

        'location.required' => 'Lokasi harus diisi.',
        'location.json' => 'Lokasi harus dalam format JSON yang valid.',

        'address.required' => 'Alamat harus diisi.',
        'address.string' => 'Alamat harus berupa teks.',

        'description.string' => 'Deskripsi harus berupa teks.',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $district_id = $request->district_id;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districts = District::where('regency_id', 5108)->get();
        $bppsQuery = Bpp::with(['district'])->latest();
        // dd($bppsQuery);

        if ($district_id) {
            $bppsQuery->where('district_id', $district_id);
        }

        if ($search) {
            $bppsQuery->where('name', 'like', '%' . $search . '%');
        }

        $bpps = $bppsQuery->paginate($perpage);

        return Inertia::render('Backpage/BPP/Index', [
            'navName' => 'Balai Penyuluh Pertanian',
            'searchValue' => $request->search ?? '',
            'districtIdValue' => $request->district_id ?? '',
            'bpps' => $bpps,
            'districts' => $districts,
        ]);
        // return response()->json($commodities);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $districts = District::where('regency_id', 5108)->get();

        return Inertia::render('Backpage/BPP/Create', [
            'navName' => 'Tambah Balai Penyuluhan Pertanian',
            'districts' => $districts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'district_id' => 'required|exists:districts,id',
            'layer_group_id' => 'required|exists:layer_grups,id',
            'name' => 'required|string|max:50',
            'phone_number' => 'required|string|max:12',
            'email' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'since' => 'required|string|max:4',
            'status' => 'required|string|max:50',
            'photos.*' => 'required',
            // 'location' => 'required|json',
            'location' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $data = json_decode($value, true);
                    if (!is_array($data) || count($data) !== 2 || !is_numeric($data[0]) || !is_numeric($data[1])) {
                        $fail('Kordinat lokasi harus berupa array dengan dua nilai numerik, misalnya [1212, 1212].');
                    }
                },
            ],
            'address' => 'required|string',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        // Mengonversi lokasi ke array
        $validatedData['location'] = json_decode($request->location, true);

        // Handle file uploads
        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('bpps-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        Bpp::create($validatedData);

        return redirect()->route('bpp.index')->with('success', 'Bpp created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bppById = Bpp::with('district')->findOrFail($id);

        return Inertia::render('Backpage/BPP/Detail', [
            'navName' => 'Detail ' . $bppById->name,
            'bppById' => $bppById,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Cari BPP berdasarkan ID
        $bppById = Bpp::findOrFail($id);

        // Ambil data kecamatan dengan regency_id 5108
        $districts = District::where('regency_id', 5108)->get();

        // Keluarkan pesan untuk debugging
        // dd('test'); // Jika ingin melakukan debugging, aktifkan ini

        // Kirim data ke Inertia
        return Inertia::render('Backpage/BPP/Edit', [
            'navName' => 'Edit Balai Penyuluhan Pertanian',
            'districts' => $districts,
            'bppById' => $bppById,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validasi input
        $validatedData = $request->validate([
            'district_id' => 'required|exists:districts,id',
            'layer_group_id' => 'required|exists:layer_grups,id',
            'name' => 'required|string|max:50',
            'phone_number' => 'required|string|max:12',
            'email' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'since' => 'required|string|max:4',
            'status' => 'required|string|max:50',
            'photos.*' => 'nullable', // Mengizinkan photos tidak diubah
            // 'location' => 'required|json',
            'location' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $data = json_decode($value, true);
                    if (!is_array($data) || count($data) !== 2 || !is_numeric($data[0]) || !is_numeric($data[1])) {
                        $fail('Kordinat lokasi harus berupa array dengan dua nilai numerik, misalnya [1212, 1212].');
                    }
                },
            ],
            'address' => 'required|string',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        // Cari data BPP berdasarkan ID
        $bpp = Bpp::findOrFail($id);

        // Mengonversi lokasi ke array
        $validatedData['location'] = json_decode($request->location, true);

        // Handle file uploads
        $newPhotoPaths = [];

        $photoPaths = [];
        if ($bpp->photo) {
            $oldPhotos = json_decode($bpp->photo, true);

            // Compare old and new photos
            $photosToKeep = array_intersect($oldPhotos, $request->photos ? $request->photos : []);
            $photosToDelete = array_diff($oldPhotos, $photosToKeep);

            // Delete removed photos from storage
            foreach ($photosToDelete as $oldPhoto) {
                $oldPhotoPath = str_replace('/storage', '', $oldPhoto); // Convert the URL to the storage path
                Storage::delete($oldPhotoPath);
            }

            // Merge kept old photos with new photos
            $photoPaths = array_merge($photosToKeep, $newPhotoPaths);
        } else {
            $photoPaths = $newPhotoPaths;
        }

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('bpps-image');
                $photoPaths[] = Storage::url($path);
            }
        }

        $validatedData['photo'] = json_encode($photoPaths);

        // Update data BPP
        $bpp->update($validatedData);

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('bpp.index')->with('success', 'Bpp updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $bpp = Bpp::findOrFail($id);

        // Hapus file foto dari penyimpanan
        if ($bpp->photo) {
            $photoPaths = json_decode($bpp->photo, true);
            foreach ($photoPaths as $photoPath) {
                $storagePath = str_replace('/storage', '', $photoPath); // Konversi URL ke path penyimpanan
                Storage::delete($storagePath);
            }
        }

        // Hapus Gapoktan dari database
        $bpp->delete();

        return redirect()->route('bpp.index')->with('success', 'Bpp deleted successfully.');
    }
}
