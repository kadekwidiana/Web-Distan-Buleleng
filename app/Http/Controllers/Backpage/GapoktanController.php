<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Gapoktan;
use App\Models\LayerGrup;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GapoktanController extends Controller
{
    private $validationMessages = [
        'village_id.required' => 'Desa wajib diisi.',
        'village_id.exists' => 'Desa yang dipilih tidak valid.',
        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama tidak boleh lebih dari 50 karakter.',
        'leader.required' => 'Ketua wajib diisi.',
        'leader.string' => 'Ketua harus berupa teks.',
        'leader.max' => 'Ketua tidak boleh lebih dari 50 karakter.',
        'secretary.required' => 'Sekretaris wajib diisi.',
        'secretary.string' => 'Sekretaris harus berupa teks.',
        'secretary.max' => 'Sekretaris tidak boleh lebih dari 50 karakter.',
        'treasurer.required' => 'Bendahara wajib diisi.',
        'treasurer.string' => 'Bendahara harus berupa teks.',
        'treasurer.max' => 'Bendahara tidak boleh lebih dari 50 karakter.',
        'number_of_members.required' => 'Jumlah anggota wajib diisi.',
        'number_of_members.integer' => 'Jumlah anggota harus berupa angka.',
        'since.required' => 'Tahun berdiri wajib diisi.',
        'since.string' => 'Tahun berdiri harus berupa teks.',
        'since.max' => 'Tahun berdiri tidak boleh lebih dari 4 karakter.',
        'status.required' => 'Status wajib diisi.',
        'status.string' => 'Status harus berupa teks.',
        'confirmation_sk.required' => 'SK Konfirmasi wajib diisi.',
        'confirmation_sk.string' => 'SK Konfirmasi harus berupa teks.',
        'confirmation_sk_no.required' => 'Nomor SK Konfirmasi wajib diisi.',
        'confirmation_sk_no.string' => 'Nomor SK Konfirmasi harus berupa teks.',
        'farming_business.required' => 'Jenis usaha tani wajib diisi.',
        'farming_business.string' => 'Jenis usaha tani harus berupa teks.',
        'business_process.required' => 'Jenis usaha olah wajib diisi.',
        'business_process.string' => 'Jenis usaha olah harus berupa teks.',
        'business_unit.required' => 'Unit usaha wajib diisi.',
        'tools_and_machines.required' => 'Peralatan dan mesin wajib diisi.',
        'layer_group_id.required' => 'Kelompok lapisan wajib diisi.',
        'layer_group_id.exists' => 'Kelompok lapisan yang dipilih tidak valid.',
        'photos.*.required' => 'Setiap foto wajib diisi.',
        'location.required' => 'Lokasi wajib diisi.',
        'location.json' => 'Lokasi harus berupa format JSON yang valid.',
        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'description.nullable' => 'Deskripsi boleh diisi atau dikosongkan.',
        'description.string' => 'Deskripsi harus berupa teks.'
    ];

    public function gapoktanRegency(Request $request)
    {
        $userSession = Auth::user();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            $districtWithGapoktans = District::whereHas('villages', function ($query) use ($villageIds) {
                $query->whereIn('id', $villageIds);
            })
                ->where('id', '!=', '6301040')  // Exclude the district with ID '6301040' anomali data kecamatan nya, malah tampil 6301040 = BATI - BATI
                ->with(['villages' => function ($query) use ($villageIds) {
                    $query->whereIn('id', $villageIds)
                        ->withCount('gapoktans');
                }])->get();
        } else {
            // regency_id buleleng 5108
            $districtWithGapoktans = District::where('regency_id', 5108)->with(['villages' => function ($query) {
                $query->withCount('gapoktans');
            }])->get();
        }

        $districtWithGapoktans = $districtWithGapoktans->map(function ($district) {
            $districtGapoktansCount = $district->villages->sum('gapoktans_count');
            $district->gapoktans_count = $districtGapoktansCount;
            return $district;
        });

        return Inertia::render('Backpage/Gapoktan/ListGapoktanRegency', [
            'navName' => 'Gapoktan',
            "districtWithGapoktans" => $districtWithGapoktans
        ]);
    }

    public function gapoktanDistrict(Request $request)
    {
        $userSession = Auth::user();
        $districtId = $request->districtId;
        $villageId = $request->villageId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districtWithGapoktans = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->with('gapoktans');
        }])->get();

        $districtData = $districtWithGapoktans->firstWhere('id', $districtId);

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
            $gapoktansQuery = Gapoktan::whereIn('village_id', $villageIds)
                ->whereHas('village', function ($query) use ($districtId) {
                    $query->where('district_id', $districtId);
                });
        } else {
            $villagesByDistrictId = Village::where('district_id', $districtId)->get();

            $gapoktansQuery = Gapoktan::whereHas('village', function ($query) use ($districtId) {
                $query->where('district_id', $districtId);
            });
        }

        if ($villageId) {
            $gapoktansQuery->where('village_id', $villageId);
        }

        if ($search) {
            $gapoktansQuery->where('name', 'like', '%' . $search . '%');
        }

        $gapoktansInDiscrict = $gapoktansQuery->with('village')->latest()->paginate($perpage);

        return Inertia::render('Backpage/Gapoktan/ListGapoktanDistrict', [
            'navName' => 'Gapoktan',
            'districtData' => $districtData,
            'searchValue' => $request->search ?? '',
            'villageIdValue' => $request->villageId ?? '',
            'villagesByDistrictId' => $villagesByDistrictId,
            'gapoktansInDiscrict' => $gapoktansInDiscrict
        ]);
    }

    public function backNav(Request $request)
    {
        $districtId = $request->districtId;
        // Hapus data gapoktan dari sesi
        $request->session()->forget('gapoktan');

        return redirect()->route('gapoktans.district', ['districtId' => $districtId]);
    }

    public function createStepOne(Request $request)
    {
        $userSession = Auth::user();
        $district = District::firstWhere('id', $request->districtId);

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

        $gapoktan = $request->session()->get('gapoktan');

        return Inertia::render('Backpage/Gapoktan/Create/StepOne', [
            'navName' => 'Tambah Gapoktan',
            'district' => $district,
            'villages' => $villages,
            'gapoktan' => $gapoktan
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
            'since' => 'required|string|max:4',
            'status' => 'required|string',
            'confirmation_sk' => 'required|string',
            'confirmation_sk_no' => 'required|string',
            'farming_business' => 'required|string',
            'business_process' => 'required|string',
            'business_unit' => 'required',
            'tools_and_machines' => 'required',
        ], $this->validationMessages);


        if (empty($request->session()->get('gapoktan'))) {
            $gapoktan = new Gapoktan();
            $gapoktan->fill($validatedData);
            $request->session()->put('gapoktan', $gapoktan);
        } else {
            $gapoktan = $request->session()->get('gapoktan');
            $gapoktan->fill($validatedData);
            $request->session()->put('gapoktan', $gapoktan);
        }

        return redirect()->route('gapoktans.create.step.two', ['districtId' => $districtId]);
    }

    public function createStepTwo(Request $request)
    {
        $district = District::firstWhere('id', $request->districtId);
        $villages = Village::where('district_id', $request->districtId)->get();
        $layerGroup = LayerGrup::all();

        $gapoktan = $request->session()->get('gapoktan');

        return Inertia::render('Backpage/Gapoktan/Create/StepTwo', [
            'navName' => 'Tambah Gapoktan',
            'district' => $district,
            'villages' => $villages,
            'layerGroup' => $layerGroup,
            'gapoktan' => $gapoktan
        ]);
    }

    public function storeStepTwo(Request $request)
    {
        $districtId = $request->districtId;

        $validatedData = $request->validate([
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
                $path = $photo->store('gapoktans-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $gapoktan = $request->session()->get('gapoktan');
        if ($gapoktan) {
            // Pastikan business_unit dan tools_and_machines ada di gapoktan
            if (isset($gapoktan['business_unit'])) {
                $validatedData['business_unit'] = json_encode($gapoktan['business_unit']);
            }

            if (isset($gapoktan['tools_and_machines'])) {
                $validatedData['tools_and_machines'] = json_encode($gapoktan['tools_and_machines']);
            }

            // Isi dan simpan data gapoktan
            $gapoktan->fill($validatedData);
            $gapoktan->save();

            // Hapus data gapoktan dari sesi
            $request->session()->forget('gapoktan');
        }

        return redirect()->route('gapoktans.district', ['districtId' => $districtId])->with('success', 'Gapoktan created successfully.');
    }

    public function editStepOne(Request $request)
    {
        $userSession = Auth::user();
        $gapoktanById = Gapoktan::findOrFail($request->gapoktanId); // dari request ambil

        $district = District::firstWhere('id', $request->districtId);

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

        $layerGroup = LayerGrup::all();

        $gapoktan = $request->session()->get('gapoktan');

        return Inertia::render('Backpage/Gapoktan/Edit/StepOne', [
            'navName' => 'Edit Gapoktan',
            'district' => $district,
            'villages' => $villages,
            'layerGroup' => $layerGroup,
            'gapoktanById' => $gapoktanById,
            'gapoktan' => $gapoktan
        ]);
    }

    public function updateStepOne(Request $request)
    {
        $gapoktanById = Gapoktan::findOrFail($request->gapoktanId); // dari request ambil

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'name' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'since' => 'required|string|max:4',
            'status' => 'required|string',
            'confirmation_sk' => 'required|string',
            'confirmation_sk_no' => 'required|string',
            'farming_business' => 'required|string',
            'business_process' => 'required|string',
            'business_unit' => 'required',
            'tools_and_machines' => 'required',
        ], $this->validationMessages);

        if (empty($request->session()->get('gapoktan'))) {
            // $gapoktanById->update($validatedData);
            $gapoktanById->fill($validatedData);
            $request->session()->put('gapoktan', $gapoktanById);
        } else {
            $gapoktanById = $request->session()->get('gapoktan');
            $gapoktanById->fill($validatedData);
            $request->session()->put('gapoktan', $gapoktanById);
        }

        return redirect()->route('gapoktans.edit.step.two', ['districtId' => $districtId, 'gapoktanId' => $request->gapoktanId]);
    }

    public function editStepTwo(Request $request)
    {
        $gapoktanById = Gapoktan::findOrFail($request->gapoktanId); // dari request ambil

        $district = District::firstWhere('id', $request->districtId);
        $villages = Village::where('district_id', $request->districtId)->get();
        $layerGroup = LayerGrup::all();

        $gapoktan = $request->session()->get('gapoktan');

        return Inertia::render('Backpage/Gapoktan/Edit/StepTwo', [
            'navName' => 'Edit Gapoktan',
            'district' => $district,
            'villages' => $villages,
            'layerGroup' => $layerGroup,
            'gapoktanById' => $gapoktanById,
            'gapoktan' => $gapoktan
        ]);
    }

    public function updateStepTwo(Request $request)
    {
        $gapoktanById = Gapoktan::findOrFail($request->gapoktanId); // Find the Gapoktan by ID from the request

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'layer_group_id' => 'required|exists:layer_grups,id',
            'photos.*' => 'required', // Ensure photos are images
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
        $newPhotoPaths = [];

        $photoPaths = [];
        if ($gapoktanById->photo) {
            $oldPhotos = json_decode($gapoktanById->photo, true);

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
                $path = $photo->store('gapoktans-image');
                $photoPaths[] = Storage::url($path);
            }
        }

        $validatedData['photo'] = json_encode($photoPaths);

        // Get gapoktan data from session if it exists
        $gapoktan = $request->session()->get('gapoktan');
        if ($gapoktan) {
            // Ensure business_unit and tools_and_machines exist in gapoktan
            if (isset($gapoktan['business_unit'])) {
                $validatedData['business_unit'] = json_encode($gapoktan['business_unit']);
            }

            if (isset($gapoktan['tools_and_machines'])) {
                $validatedData['tools_and_machines'] = json_encode($gapoktan['tools_and_machines']);
            }

            // Fill and save gapoktan data
            $gapoktan->fill($validatedData);
            // dd($gapoktan);
            $gapoktan->save();

            // Remove gapoktan data from session
            $request->session()->forget('gapoktan');
        }

        return redirect()->route('gapoktans.district', ['districtId' => $districtId])->with('success', 'Gapoktan updated successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $gapoktanById = Gapoktan::findOrFail($request->gapoktanId);

        return Inertia::render('Backpage/Gapoktan/Detail/Index', [
            'navName' => 'Detail ' . $gapoktanById->name,
            'gapoktanById' => $gapoktanById,
            'districtId' => $request->districtId
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $gapoktan = Gapoktan::findOrFail($request->gapoktanId);

        // Hapus file foto dari penyimpanan
        if ($gapoktan->photo) {
            $photoPaths = json_decode($gapoktan->photo, true);
            foreach ($photoPaths as $photoPath) {
                $storagePath = str_replace('/storage', '', $photoPath); // Konversi URL ke path penyimpanan
                Storage::delete($storagePath);
            }
        }

        // Hapus Gapoktan dari database
        $gapoktan->delete();

        return redirect()->route('gapoktans.district', ['districtId' => $request->districtId])->with('success', 'Gapoktan deleted successfully.');
    }
}
