<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\Commodity;
use App\Models\District;
use App\Models\LandAgriculture;
use App\Models\LayerGrup;
use App\Models\Poktan;
use App\Models\Subak;
use App\Models\TypeLandAgriculture;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LandAgricultureController extends Controller
{
    private $validationMessages = [
        'village_id.required' => 'Desa wajib diisi.',
        'village_id.exists' => 'Desa tidak valid.',
        'poktan_id.exists' => 'Poktan tidak valid.',
        'subak_id.exists' => 'Subak tidak valid.',
        'type_land_agriculture_id.required' => 'Jenis lahan pertanian wajib diisi.',
        'type_land_agriculture_id.exists' => 'Jenis lahan pertanian tidak valid.',
        'owner_id.required' => 'Pemilik wajib diisi.',
        'owner_id.exists' => 'Pemilik tidak valid.',
        'commodities.required' => 'Komoditas wajib diisi.',
        'commodities.nullable' => 'Komoditas harus berupa teks.',
        'status.required' => 'Status wajib diisi.',
        'status.string' => 'Status harus berupa teks.',
        'layer_group_id.required' => 'Grup lapisan wajib diisi.',
        'layer_group_id.exists' => 'Grup lapisan tidak valid.',
        'photos.*.required' => 'Foto wajib diisi.',
        'location.required' => 'Lokasi wajib diisi.',
        'location.json' => 'Lokasi harus berupa format JSON.',
        'area_json.required' => 'Area JSON wajib diisi.',
        'area_json.json' => 'Area JSON harus berupa format JSON.',
        'land_area.required' => 'Luas lahan wajib diisi.',
        'land_area.string' => 'Luas lahan harus berupa teks.',
        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'description.nullable' => 'Deskripsi harus berupa teks.',
    ];


    public function landAgricultureRegency(Request $request)
    {
        // regency_id buleleng
        $districtWithLandAgricultures = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->withCount('landAgricultures');
        }])->get();

        $districtWithLandAgricultures = $districtWithLandAgricultures->map(function ($district) {
            $districtLandAgriculturesCount = $district->villages->sum('land_agricultures_count'); // ternyata nama atribute nya harus sama (misal land_agricultures_count untuk landAgricultures) dan pake snake case
            $district->land_agricultures_count = $districtLandAgriculturesCount;
            return $district;
        });

        return Inertia::render('Backpage/LandAgriculture/ListLandAgricultureRegency', [
            'navName' => 'Lahan Pertanian',
            "districtWithLandAgricultures" => $districtWithLandAgricultures
        ]);
    }

    public function landAgricultureDistrict(Request $request)
    {
        $districtId = $request->districtId;
        $villageId = $request->villageId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districtWithLandAgricultures = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->with('landAgricultures');
        }])->get();

        $districtData = $districtWithLandAgricultures->firstWhere('id', $districtId);

        $villagesByDistrictId = Village::where('district_id', $districtId)->get();

        // Filter landAgricultures berdasarkan district_id
        $landAgriculturesQuery = LandAgriculture::whereHas('village', function ($query) use ($districtId) {
            $query->where('district_id', $districtId);
        });

        if ($villageId) {
            $landAgriculturesQuery->where('village_id', $villageId);
        }

        if ($search) {
            $landAgriculturesQuery->whereHas('owner', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->where('role', 'LAND_OWNER');
            });
        }

        $landAgriculturesInDiscrict = $landAgriculturesQuery->with(['village', 'owner'])->latest()->paginate($perpage);
        // dd($landAgriculturesInDiscrict);
        return Inertia::render('Backpage/LandAgriculture/ListLandAgricultureDistrict', [
            'navName' => 'Lahan Pertanian',
            'districtData' => $districtData,
            'searchValue' => $request->search ?? '',
            'villageIdValue' => $request->villageId ?? '',
            'villagesByDistrictId' => $villagesByDistrictId,
            'landAgriculturesInDiscrict' => $landAgriculturesInDiscrict
        ]);
    }

    public function show(Request $request)
    {
        $landAgricultureById = LandAgriculture::with(['commodities', 'village', 'owner', 'typeLandAgriculture', 'poktan', 'subak'])->findOrFail($request->landAgricultureId);
        // dd($landAgricultureById->typeLandAgriculture->name);
        return Inertia::render('Backpage/LandAgriculture/Detail/Index', [
            'navName' => 'Detail ' . $landAgricultureById->owner->name,
            'landAgricultureById' => $landAgricultureById,
            'districtId' => $request->districtId
        ]);
    }

    public function backNav(Request $request)
    {
        $districtId = $request->districtId;
        // Hapus data landAgriculture dari sesi
        $request->session()->forget('landAgriculture');

        return redirect()->route('landAgricultures.district', ['districtId' => $districtId]);
    }

    public function createStepOne(Request $request)
    {
        $districtId = $request->districtId;

        $district = District::firstWhere('id', $districtId);
        $villages = Village::where('district_id', $districtId)->get();

        $villageIds = Village::where('district_id', $districtId)->pluck('id');

        $poktans = Poktan::whereIn('village_id', $villageIds)->get();
        $subaks = Subak::whereIn('village_id', $villageIds)->get();

        $commodities = Commodity::all();
        $typeLandAgricultures = TypeLandAgriculture::all();

        $owners = User::where('role', 'LAND_OWNER')->get();

        $landAgriculture = $request->session()->get('landAgriculture');

        return Inertia::render('Backpage/LandAgriculture/Create/StepOne', [
            'navName' => 'Tambah Lahan Pertanian',
            'district' => $district,
            'villages' => $villages,
            'poktans' => $poktans,
            'subaks' => $subaks,
            'commodities' => $commodities,
            'typeLandAgricultures' => $typeLandAgricultures,
            'owners' => $owners,
            'landAgriculture' => $landAgriculture
        ]);
    }

    public function storeStepOne(Request $request)
    {
        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'poktan_id' => 'nullable|exists:poktans,id',
            'subak_id' => 'nullable|exists:subaks,id',
            'type_land_agriculture_id' => 'required|exists:type_land_agricultures,id',
            'owner_id' => 'required|exists:users,id',
            'commodities' => 'required', // hanya bisa di validasi saja, tidak bisa di simpan di session
            'status' => 'required|string',
        ], $this->validationMessages);

        // dd($validatedData);
        if (empty($request->session()->get('landAgriculture'))) {
            $landAgriculture = new LandAgriculture();
            $landAgriculture->fill($validatedData);
            $request->session()->put('landAgriculture', $landAgriculture);
        } else {
            $landAgriculture = $request->session()->get('landAgriculture');
            $landAgriculture->fill($validatedData);
            $request->session()->put('landAgriculture', $landAgriculture);
        }
        return redirect()->route('landAgricultures.create.step.two', ['districtId' => $districtId]);
    }

    public function createStepTwo(Request $request)
    {
        $district = District::firstWhere('id', $request->districtId);
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/LandAgriculture/Create/StepTwo', [
            'navName' => 'Tambah Lahan Pertanian',
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
            'location' => 'required|json',
            'area_json' => 'required|json',
            'land_area' => 'required|string',
            'address' => 'required|string',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        // Mengonversi lokasi ke array
        $validatedData['location'] = json_decode($request->location, true);
        $validatedData['area_json'] = json_decode($request->area_json, true);

        // Handle file uploads
        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('land-agricultures-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $landAgriculture = $request->session()->get('landAgriculture');
        if ($landAgriculture) {

            // Isi dan simpan data landAgriculture
            $landAgriculture->fill($validatedData);
            $landAgriculture->save();

            // menyimpan commodties landAgriculture
            $landAgricultureById = LandAgriculture::with('commodities')->find($landAgriculture->id);
            $commodities = $validatedData['commodities'];
            $landAgricultureById->commodities()->sync($commodities); // simpan relasi many to many

            // Hapus data landAgriculture dari sesi
            $request->session()->forget('landAgriculture');
        }

        return redirect()->route('landAgricultures.district', ['districtId' => $districtId])->with('success', 'Land Agriculture created successfully.');
    }

    public function editStepOne(Request $request)
    {
        $landAgricultureById = LandAgriculture::with('commodities')->findOrFail($request->landAgricultureId); // dari request ambil
        $commodityIds = $landAgricultureById->commodities->pluck('id')->toArray(); //biar gampang olah di FE

        $districtId = $request->districtId;

        $district = District::firstWhere('id', $districtId);
        $villages = Village::where('district_id', $districtId)->get();

        $villageIds = Village::where('district_id', $districtId)->pluck('id');

        $poktans = Poktan::whereIn('village_id', $villageIds)->get();
        $subaks = Subak::whereIn('village_id', $villageIds)->get();

        $commodities = Commodity::all();
        $typeLandAgricultures = TypeLandAgriculture::all();

        $owners = User::where('role', 'LAND_OWNER')->get();

        $landAgriculture = $request->session()->get('landAgriculture');

        return Inertia::render('Backpage/LandAgriculture/Edit/StepOne', [
            'navName' => 'Edit Lahan Pertanian',
            'district' => $district,
            'villages' => $villages,
            'poktans' => $poktans,
            'subaks' => $subaks,
            'commodities' => $commodities,
            'typeLandAgricultures' => $typeLandAgricultures,
            'owners' => $owners,
            'landAgriculture' => $landAgriculture,
            'landAgricultureById' => $landAgricultureById,
            'commodityIds' => $commodityIds,
        ]);
    }

    public function updateStepOne(Request $request)
    {
        $landAgricultureById = LandAgriculture::findOrFail($request->landAgricultureId);

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'poktan_id' => 'nullable|exists:poktans,id',
            'subak_id' => 'nullable|exists:subaks,id',
            'type_land_agriculture_id' => 'required|exists:type_land_agricultures,id',
            'owner_id' => 'required|exists:users,id',
            'commodities' => 'required', // hanya bisa di validasi saja, tidak bisa di simpan di session
            'status' => 'required|string',
        ], $this->validationMessages);

        // dd($validatedData);
        if (empty($request->session()->get('landAgriculture'))) {
            // $landAgriculture = new LandAgriculture();
            $landAgricultureById->fill($validatedData);
            $request->session()->put('landAgriculture', $landAgricultureById);
        } else {
            $landAgricultureById = $request->session()->get('landAgriculture');
            $landAgricultureById->fill($validatedData);
            $request->session()->put('landAgriculture', $landAgricultureById);
        }
        return redirect()->route('landAgricultures.edit.step.two', ['districtId' => $districtId, 'landAgricultureId' => $request->landAgricultureId]);
    }

    public function editStepTwo(Request $request)
    {
        $landAgricultureById = LandAgriculture::with('commodities')->findOrFail($request->landAgricultureId); // dari request ambil

        $district = District::firstWhere('id', $request->districtId);
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/LandAgriculture/Edit/StepTwo', [
            'navName' => 'Edit Lahan Pertanian',
            'district' => $district,
            'layerGroup' => $layerGroup,
            'landAgricultureById' => $landAgricultureById
        ]);
    }

    public function updateStepTwo(Request $request)
    {
        $landAgricultureById = LandAgriculture::findOrFail($request->landAgricultureId);

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'commodities' => 'nullable', //hanya validasi, di tabel subak tidak ada, pkae nullable karna di step 1 sudah required
            'layer_group_id' => 'required|exists:layer_grups,id',
            'photos.*' => 'required',
            'location' => 'required|json',
            'area_json' => 'required|json',
            'land_area' => 'required|string',
            'address' => 'required|string',
            'description' => 'nullable|string',
        ], $this->validationMessages);

        // Mengonversi lokasi ke array
        $validatedData['location'] = json_decode($request->location, true);
        $validatedData['area_json'] = json_decode($request->area_json, true);

        // Handle file uploads
        $photoPaths = [];
        $newPhotoPaths = [];
        if ($landAgricultureById->photo) {
            $oldPhotos = json_decode($landAgricultureById->photo, true);

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
                $path = $photo->store('land-agricultures-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $landAgriculture = $request->session()->get('landAgriculture');
        if ($landAgriculture) {

            // Isi dan simpan data landAgriculture
            $landAgriculture->fill($validatedData);
            $landAgriculture->save();

            // menyimpan commodties landAgriculture
            $landAgricultureById = LandAgriculture::with('commodities')->find($landAgriculture->id);
            $commodities = $validatedData['commodities'];
            $landAgricultureById->commodities()->sync($commodities); // simpan relasi many to many

            // Hapus data landAgriculture dari sesi
            $request->session()->forget('landAgriculture');
        }

        return redirect()->route('landAgricultures.district', ['districtId' => $districtId])->with('success', 'Land Agriculture created successfully.');
    }

    public function destroy(Request $request)
    {
        $landAgriculture = LandAgriculture::findOrFail($request->landAgricultureId);

        // Hapus file foto dari penyimpanan
        if ($landAgriculture->photo) {
            $photoPaths = json_decode($landAgriculture->photo, true);
            foreach ($photoPaths as $photoPath) {
                $storagePath = str_replace('/storage', '', $photoPath); // Konversi URL ke path penyimpanan
                Storage::delete($storagePath);
            }
        }

        $landAgriculture->delete();

        return redirect()->route('landAgricultures.district', ['districtId' => $request->districtId])->with('success', 'Land Agriculture deleted successfully.');
    }
}