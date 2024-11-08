<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\District;
use App\Models\Gapoktan;
use App\Models\LayerGrup;
use App\Models\Poktan;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PoktanController extends Controller
{
    private $validationMessages = [
        'village_id.required' => 'Desa wajib diisi.',
        'village_id.exists' => 'Desa tidak valid.',
        'gapoktan_id.exists' => 'Gapoktan tidak valid.',
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
        'since.required' => 'Tahun berdiri wajib diisi.',
        'since.string' => 'Tahun berdiri harus berupa teks.',
        'since.max' => 'Tahun berdiri maksimal 4 karakter.',
        'status.required' => 'Status wajib diisi.',
        'status.string' => 'Status harus berupa teks.',
        'ability_class.required' => 'Kelas kemampuan wajib diisi.',
        'ability_class.string' => 'Kelas kemampuan harus berupa teks.',
        'group_confirmation_status.required' => 'Status konfirmasi kelompok wajib diisi.',
        'group_confirmation_status.string' => 'Status konfirmasi kelompok harus berupa teks.',
        'year_of_class_assignment.required' => 'Tahun penugasan kelas wajib diisi.',
        'year_of_class_assignment.string' => 'Tahun penugasan kelas harus berupa teks.',
        'layer_group_id.required' => 'Grup lapisan wajib diisi.',
        'layer_group_id.exists' => 'Grup lapisan tidak valid.',
        'photos.*.required' => 'Foto wajib diisi.',
        'location.required' => 'Lokasi wajib diisi.',
        'location.json' => 'Lokasi harus berupa format JSON.',
        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'description.nullable' => 'Deskripsi harus berupa teks.',
    ];


    public function poktanRegency(Request $request)
    {
        $userSession = Auth::user();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            $districtWithPoktans = District::whereHas('villages', function ($query) use ($villageIds) {
                $query->whereIn('id', $villageIds);
            })
                ->where('id', '!=', '6301040')  // Exclude the district with ID '6301040' anomali data kecamatan nya, malah tampil 6301040 = BATI - BATI
                ->with(['villages' => function ($query) use ($villageIds) {
                    $query->whereIn('id', $villageIds)
                        ->withCount('poktans');
                }])->get();
        } else {
            // regency_id buleleng
            $districtWithPoktans = District::where('regency_id', 5108)->with(['villages' => function ($query) {
                $query->withCount('poktans');
            }])->get();
        }

        $districtWithPoktans = $districtWithPoktans->map(function ($district) {
            $districtPoktansCount = $district->villages->sum('poktans_count'); // ternyata nama atribute nya harus sama (misal poktans_count untuk poktans)
            $district->poktans_count = $districtPoktansCount;
            return $district;
        });

        return Inertia::render('Backpage/Poktan/ListPoktanRegency', [
            'navName' => 'Poktan',
            "districtWithPoktans" => $districtWithPoktans
        ]);
    }

    public function poktanDistrict(Request $request)
    {
        $userSession = Auth::user();
        $districtId = $request->districtId;
        $villageId = $request->villageId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districtWithPoktans = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->with('poktans');
        }])->get();

        $districtData = $districtWithPoktans->firstWhere('id', $districtId);

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            $villagesByDistrictId = Village::whereIn('id', $villageIds)
                ->where('district_id', $districtId)
                ->distinct()
                ->get(); // anomali cuyy,, desa sambangan malah duplikat, pake distinct() belum fix solusinya. #biarkan saja yg penting bisa jalan 😐

            $poktansQuery = Poktan::whereIn('village_id', $villageIds)
                ->whereHas('village', function ($query) use ($districtId) {
                    $query->where('district_id', $districtId);
                });
        } else {
            $villagesByDistrictId = Village::where('district_id', $districtId)->get();

            // Filter gapoktans berdasarkan village_id jika village_id diberikan
            $poktansQuery = Poktan::whereHas('village', function ($query) use ($districtId) {
                $query->where('district_id', $districtId);
            });
        }

        if ($villageId) {
            $poktansQuery->where('village_id', $villageId);
        }

        if ($search) {
            $poktansQuery->where('name', 'like', '%' . $search . '%');
        }

        $poktansInDiscrict = $poktansQuery->with('village')->latest()->paginate($perpage);

        return Inertia::render('Backpage/Poktan/ListPoktanDistrict', [
            'navName' => 'Poktan',
            'districtData' => $districtData,
            'searchValue' => $request->search ?? '',
            'villageIdValue' => $request->villageId ?? '',
            'villagesByDistrictId' => $villagesByDistrictId,
            'poktansInDiscrict' => $poktansInDiscrict
        ]);
    }

    public function show(Request $request)
    {
        $poktanById = Poktan::with(['commodities', 'village'])->findOrFail($request->poktanId);
        // dd($poktanById->commodities);
        return Inertia::render('Backpage/Poktan/Detail/Index', [
            'navName' => 'Detail ' . $poktanById->name,
            'poktanById' => $poktanById,
            'districtId' => $request->districtId
        ]);
    }

    public function backNav(Request $request)
    {
        $districtId = $request->districtId;
        // Hapus data poktan dari sesi
        $request->session()->forget('poktan');

        return redirect()->route('poktans.district', ['districtId' => $districtId]);
    }

    public function createStepOne(Request $request)
    {
        $userSession = Auth::user();
        $district = District::firstWhere('id', $request->districtId);
        $villagesForGapoktans = Village::where('district_id', $request->districtId)->pluck('id');
        $gapoktans = Gapoktan::whereIn('village_id', $villagesForGapoktans)->get();
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

        $poktan = $request->session()->get('poktan');

        return Inertia::render('Backpage/Poktan/Create/StepOne', [
            'navName' => 'Tambah Poktan',
            'district' => $district,
            'villages' => $villages,
            'gapoktans' => $gapoktans,
            'commodities' => $commodities,
            'poktan' => $poktan
        ]);
    }

    public function storeStepOne(Request $request)
    {
        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'gapoktan_id' => 'nullable|exists:gapoktans,id',
            'name' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'commodities' => 'nullable', // hanya bisa di validasi saja, tidak bisa di simpan di session
            'since' => 'required|string|max:4',
            'status' => 'required|string',
            'ability_class' => 'required|string',
            'group_confirmation_status' => 'required|string',
            'year_of_class_assignment' => 'required|string',
        ], $this->validationMessages);

        // dd($validatedData);
        if (empty($request->session()->get('poktan'))) {
            $poktan = new Poktan();
            $poktan->fill($validatedData);
            $request->session()->put('poktan', $poktan);
        } else {
            $poktan = $request->session()->get('poktan');
            $poktan->fill($validatedData);
            $request->session()->put('poktan', $poktan);
        }
        return redirect()->route('poktans.create.step.two', ['districtId' => $districtId]);
    }

    public function createStepTwo(Request $request)
    {
        $district = District::firstWhere('id', $request->districtId);
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/Poktan/Create/StepTwo', [
            'navName' => 'Tambah Poktan',
            'district' => $district,
            'layerGroup' => $layerGroup
        ]);
    }

    public function storeStepTwo(Request $request)
    {
        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'commodities' => 'nullable', //hanya validasi, di tabel poktan tidak ada, pkae nullable karna di step 1 sudah required
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
                $path = $photo->store('poktans-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $poktan = $request->session()->get('poktan');
        if ($poktan) {

            // Isi dan simpan data poktan
            $poktan->fill($validatedData);
            $poktan->save();

            // menyimpan commodties poktan
            $poktanById = Poktan::with('commodities')->find($poktan->id);
            $commodities = $validatedData['commodities'];
            $poktanById->commodities()->sync($commodities); // simpan relasi many to many

            // Hapus data poktan dari sesi
            $request->session()->forget('poktan');
        }

        return redirect()->route('poktans.district', ['districtId' => $districtId])->with('success', 'Poktan created successfully.');
    }

    public function editStepOne(Request $request)
    {
        $userSession = Auth::user();
        $poktanById = Poktan::with('commodities')->findOrFail($request->poktanId); // dari request ambil
        $commodityIds = $poktanById->commodities->pluck('id')->toArray(); //biar gampang olah di FE

        $district = District::firstWhere('id', $request->districtId);
        $villagesForGapoktans = Village::where('district_id', $request->districtId)->pluck('id');
        $gapoktans = Gapoktan::whereIn('village_id', $villagesForGapoktans)->get();
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

        $poktan = $request->session()->get('poktan');

        return Inertia::render('Backpage/Poktan/Edit/StepOne', [
            'navName' => 'Edit Poktan',
            'district' => $district,
            'villages' => $villages,
            'gapoktans' => $gapoktans,
            'commodities' => $commodities,
            'poktanById' => $poktanById,
            'commodityIds' => $commodityIds,
            'poktan' => $poktan
        ]);
    }

    public function updateStepOne(Request $request)
    {
        $poktanById = Poktan::findOrFail($request->poktanId);

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'gapoktan_id' => 'nullable|exists:gapoktans,id',
            'name' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'commodities' => 'nullable', // hanya bisa di validasi saja, tidak bisa di simpan di session
            'since' => 'required|string|max:4',
            'status' => 'required|string',
            'ability_class' => 'required|string',
            'group_confirmation_status' => 'required|string',
            'year_of_class_assignment' => 'required|string',
        ], $this->validationMessages);

        // dd($validatedData);
        if (empty($request->session()->get('poktan'))) {
            // $poktan = new Poktan();
            $poktanById->fill($validatedData);
            $request->session()->put('poktan', $poktanById);
        } else {
            $poktanById = $request->session()->get('poktan');
            $poktanById->fill($validatedData);
            $request->session()->put('poktan', $poktanById);
        }
        return redirect()->route('poktans.edit.step.two', ['districtId' => $districtId, 'poktanId' => $request->poktanId]);
    }

    public function editStepTwo(Request $request)
    {
        $poktanById = Poktan::with('commodities')->findOrFail($request->poktanId); // dari request ambil

        $district = District::firstWhere('id', $request->districtId);
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/Poktan/Edit/StepTwo', [
            'navName' => 'Edit Poktan',
            'district' => $district,
            'layerGroup' => $layerGroup,
            'poktanById' => $poktanById
        ]);
    }

    public function updateStepTwo(Request $request)
    {
        $poktanById = Poktan::findOrFail($request->poktanId); // Find the Gapoktan by ID from the request

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'commodities' => 'nullable', //hanya validasi, di tabel poktan tidak ada, pkae nullable karna di step 1 sudah required
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
        if ($poktanById->photo) {
            $oldPhotos = json_decode($poktanById->photo, true);

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
                $path = $photo->store('poktans-image');
                $photoPaths[] = Storage::url($path);
            }
        }

        $validatedData['photo'] = json_encode($photoPaths);

        $poktan = $request->session()->get('poktan');
        if ($poktan) {

            // Isi dan simpan data poktan
            $poktan->fill($validatedData);
            $poktan->save();

            // menyimpan commodties poktan
            $poktanById = Poktan::with('commodities')->find($poktan->id);
            $commodities = $validatedData['commodities'];
            $poktanById->commodities()->sync($commodities); // simpan relasi many to many

            // Hapus data poktan dari sesi
            $request->session()->forget('poktan');
        }

        return redirect()->route('poktans.district', ['districtId' => $districtId])->with('success', 'Poktan created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $poktan = Poktan::findOrFail($request->poktanId);

        // Hapus file foto dari penyimpanan
        if ($poktan->photo) {
            $photoPaths = json_decode($poktan->photo, true);
            foreach ($photoPaths as $photoPath) {
                $storagePath = str_replace('/storage', '', $photoPath); // Konversi URL ke path penyimpanan
                Storage::delete($storagePath);
            }
        }

        // Hapus Gapoktan dari database
        $poktan->delete();

        return redirect()->route('poktans.district', ['districtId' => $request->districtId])->with('success', 'Poktan deleted successfully.');
    }
}
