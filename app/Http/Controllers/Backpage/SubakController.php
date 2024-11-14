<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\District;
use App\Models\LayerGrup;
use App\Models\Subak;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubakController extends Controller
{
    private $validationMessages = [
        'village_id.required' => 'Desa wajib diisi.',
        'village_id.exists' => 'Desa tidak valid.',
        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama maksimal 50 karakter.',
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
        'commodities.required' => 'Komoditas wajib diisi.',
        'commodities.nullable' => 'Komoditas harus berupa teks.',
        'since.required' => 'Tahun berdiri wajib diisi.',
        'since.string' => 'Tahun berdiri harus berupa teks.',
        'since.max' => 'Tahun berdiri maksimal 4 karakter.',
        'status.required' => 'Status wajib diisi.',
        'status.string' => 'Status harus berupa teks.',
        'layer_group_id.required' => 'Grup lapisan wajib diisi.',
        'layer_group_id.exists' => 'Grup lapisan tidak valid.',
        'photos.*.required' => 'Foto wajib diisi.',
        'location.required' => 'Lokasi wajib diisi.',
        'location.json' => 'Lokasi harus berupa format JSON.',
        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'description.nullable' => 'Deskripsi harus berupa teks.',
    ];

    public function subakRegency(Request $request)
    {
        $userSession = Auth::user();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            $districtWithSubaks = District::whereHas('villages', function ($query) use ($villageIds) {
                $query->whereIn('id', $villageIds);
            })
                ->where('id', '!=', '6301040')  // Exclude the district with ID '6301040' anomali data kecamatan nya, malah tampil 6301040 = BATI - BATI
                ->with(['villages' => function ($query) use ($villageIds) {
                    $query->whereIn('id', $villageIds)
                        ->withCount('subaks');
                }])->get();
        } else {
            // regency_id buleleng
            $districtWithSubaks = District::where('regency_id', 5108)->with(['villages' => function ($query) {
                $query->withCount('subaks');
            }])->get();
        }

        $districtWithSubaks = $districtWithSubaks->map(function ($district) {
            $districtSubaksCount = $district->villages->sum('subaks_count'); // ternyata nama atribute nya harus sama (misal poktans_count untuk subaks)
            $district->subaks_count = $districtSubaksCount;
            return $district;
        });

        return Inertia::render('Backpage/Subak/ListSubakRegency', [
            'navName' => 'Subak',
            "districtWithSubaks" => $districtWithSubaks
        ]);
    }

    public function subakDistrict(Request $request)
    {
        $userSession = Auth::user();
        $districtId = $request->districtId;
        $villageId = $request->villageId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districtWithSubaks = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->with('subaks');
        }])->get();

        $districtData = $districtWithSubaks->firstWhere('id', $districtId);

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            // Filter villages by both village IDs and district ID
            $villagesByDistrictId = Village::whereIn('id', $villageIds)
                ->where('district_id', $districtId)
                ->distinct()
                ->get(); // anomali cuyy,, desa sambangan malah duplikat, pake distinct() belum fix. #biarkan saja yg penting bisa jalan 😐

            // Filter Gapoktans based on the specific village IDs
            $subaksQuery = Subak::whereIn('village_id', $villageIds)
                ->whereHas('village', function ($query) use ($districtId) {
                    $query->where('district_id', $districtId);
                });
        } else {
            $villagesByDistrictId = Village::where('district_id', $districtId)->get();

            // Filter gapoktans berdasarkan village_id jika village_id diberikan
            $subaksQuery = Subak::whereHas('village', function ($query) use ($districtId) {
                $query->where('district_id', $districtId);
            });
        }

        if ($villageId) {
            $subaksQuery->where('village_id', $villageId);
        }

        if ($search) {
            $subaksQuery->where('name', 'like', '%' . $search . '%');
        }

        $subaksInDiscrict = $subaksQuery->with('village')->latest()->paginate($perpage);

        return Inertia::render('Backpage/Subak/ListSubakDistrict', [
            'navName' => 'Subak',
            'districtData' => $districtData,
            'searchValue' => $request->search ?? '',
            'villageIdValue' => $request->villageId ?? '',
            'villagesByDistrictId' => $villagesByDistrictId,
            'subaksInDiscrict' => $subaksInDiscrict
        ]);
    }

    public function show(Request $request)
    {
        $subakById = Subak::with(['commodities', 'village'])->findOrFail($request->subakId);
        // dd($subakById);
        return Inertia::render('Backpage/Subak/Detail/Index', [
            'navName' => 'Detail ' . $subakById->name,
            'subakById' => $subakById,
            'districtId' => $request->districtId
        ]);
    }

    public function backNav(Request $request)
    {
        $districtId = $request->districtId;
        // Hapus data subak dari sesi
        $request->session()->forget('subak');

        return redirect()->route('subaks.district', ['districtId' => $districtId]);
    }

    public function createStepOne(Request $request)
    {
        $userSession = Auth::user();
        $district = District::firstWhere('id', $request->districtId);
        $commodities = Commodity::all();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            // Fetch villages based on the extracted IDs and district ID
            $villages = Village::whereIn('id', $villageIds)
                ->where('district_id', $request->districtId)
                ->get();
        } else {
            $villages = Village::where('district_id', $request->districtId)->get();
        }

        $subak = $request->session()->get('subak');

        return Inertia::render('Backpage/Subak/Create/StepOne', [
            'navName' => 'Tambah Subak',
            'district' => $district,
            'villages' => $villages,
            'commodities' => $commodities,
            'subak' => $subak
        ]);
    }

    public function storeStepOne(Request $request)
    {
        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'name' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'commodities' => 'nullable', // hanya bisa di validasi saja, tidak bisa di simpan di session
            'since' => 'required|string|max:4',
            'status' => 'required|string',
        ], $this->validationMessages);

        // dd($validatedData);
        if (empty($request->session()->get('subak'))) {
            $subak = new Subak();
            $subak->fill($validatedData);
            $request->session()->put('subak', $subak);
        } else {
            $subak = $request->session()->get('subak');
            $subak->fill($validatedData);
            $request->session()->put('subak', $subak);
        }
        return redirect()->route('subaks.create.step.two', ['districtId' => $districtId]);
    }

    public function createStepTwo(Request $request)
    {
        $district = District::firstWhere('id', $request->districtId);
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/Subak/Create/StepTwo', [
            'navName' => 'Tambah Subak',
            'district' => $district,
            'layerGroup' => $layerGroup
        ]);
    }

    public function storeStepTwo(Request $request)
    {
        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'commodities' => 'nullable', //hanya validasi, di tabel subak tidak ada, pkae nullable karna di step 1 sudah required
            'layer_group_id' => 'required|exists:layer_grups,id',
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
                $path = $photo->store('subaks-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $subak = $request->session()->get('subak');
        if ($subak) {

            // Isi dan simpan data subak
            $subak->fill($validatedData);
            $subak->save();

            // Memeriksa apakah ada data commodities dalam validatedData
            if (!empty($validatedData['commodities'])) {
                // menyimpan commodties subak
                $subakById = Subak::with('commodities')->find($subak->id);
                $commodities = $validatedData['commodities'];
                $subakById->commodities()->sync($commodities); // simpan relasi many to many
            }

            // Hapus data subak dari sesi
            $request->session()->forget('subak');
        }

        return redirect()->route('subaks.district', ['districtId' => $districtId])->with('success', 'Subak created successfully.');
    }

    public function editStepOne(Request $request)
    {
        $userSession = Auth::user();
        $subakById = Subak::with('commodities')->findOrFail($request->subakId); // dari request ambil
        $commodityIds = $subakById->commodities->pluck('id')->toArray(); //biar gampang olah di FE

        $district = District::firstWhere('id', $request->districtId);
        $commodities = Commodity::all();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();
            // Fetch villages based on the extracted IDs and district ID
            $villages = Village::whereIn('id', $villageIds)
                ->where('district_id', $request->districtId)
                ->get();
        } else {
            $villages = Village::where('district_id', $request->districtId)->get();
        }

        $subak = $request->session()->get('subak');

        return Inertia::render('Backpage/Subak/Edit/StepOne', [
            'navName' => 'Edit Subak',
            'district' => $district,
            'villages' => $villages,
            'commodities' => $commodities,
            'subakById' => $subakById,
            'commodityIds' => $commodityIds,
            'subak' => $subak
        ]);
    }

    public function updateStepOne(Request $request)
    {
        $subakById = Subak::findOrFail($request->subakId);

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'name' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'commodities' => 'nullable', // hanya bisa di validasi saja, tidak bisa di simpan di session
            'since' => 'required|string|max:4',
            'status' => 'required|string'
        ], $this->validationMessages);

        // dd($validatedData);
        if (empty($request->session()->get('subak'))) {
            // $subak = new Subak();
            $subakById->fill($validatedData);
            $request->session()->put('subak', $subakById);
        } else {
            $subakById = $request->session()->get('subak');
            $subakById->fill($validatedData);
            $request->session()->put('subak', $subakById);
        }
        return redirect()->route('subaks.edit.step.two', ['districtId' => $districtId, 'subakId' => $request->subakId]);
    }

    public function editStepTwo(Request $request)
    {
        $subakById = Subak::with('commodities')->findOrFail($request->subakId); // dari request ambil

        $district = District::firstWhere('id', $request->districtId);
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/Subak/Edit/StepTwo', [
            'navName' => 'Edit Subak',
            'district' => $district,
            'layerGroup' => $layerGroup,
            'subakById' => $subakById
        ]);
    }

    public function updateStepTwo(Request $request)
    {
        $subakById = Subak::findOrFail($request->subakId); // Find the Gapoktan by ID from the request

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'commodities' => 'nullable', //hanya validasi, di tabel subak tidak ada, pkae nullable karna di step 1 sudah required
            'layer_group_id' => 'required|exists:layer_grups,id',
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
        $newPhotoPaths = [];
        if ($subakById->photo) {
            $oldPhotos = json_decode($subakById->photo, true);

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
                $path = $photo->store('subaks-image');
                $photoPaths[] = Storage::url($path);
            }
        }

        $validatedData['photo'] = json_encode($photoPaths);

        $subak = $request->session()->get('subak');
        if ($subak) {

            // Isi dan simpan data subak
            $subak->fill($validatedData);
            $subak->save();

            // menyimpan commodties subak
            $subakById = Subak::with('commodities')->find($subak->id);
            $commodities = $validatedData['commodities'];
            $subakById->commodities()->sync($commodities); // simpan relasi many to many

            // Hapus data subak dari sesi
            $request->session()->forget('subak');
        }

        return redirect()->route('subaks.district', ['districtId' => $districtId])->with('success', 'Subak created successfully.');
    }

    public function destroy(Request $request)
    {
        $subak = Subak::findOrFail($request->subakId);

        // Hapus file foto dari penyimpanan
        if ($subak->photo) {
            $photoPaths = json_decode($subak->photo, true);
            foreach ($photoPaths as $photoPath) {
                $storagePath = str_replace('/storage', '', $photoPath); // Konversi URL ke path penyimpanan
                Storage::delete($storagePath);
            }
        }

        $subak->delete();

        return redirect()->route('subaks.district', ['districtId' => $request->districtId])->with('success', 'Subak deleted successfully.');
    }
}
