<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Gapoktan;
use App\Models\LayerGrup;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GapoktanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataGapoktans = Gapoktan::all();

        return Inertia::render('Backpage/Gapoktan/Index', [
            'navName' => 'Gabungan Kelompok Tani',
            "dataGapoktans" => $dataGapoktans
        ]);
    }

    public function gapoktanRegency(Request $request)
    {
        // regency_id buleleng
        $districtWithGapoktans = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->withCount('gapoktans');
        }])->get();

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
        $districtId = $request->districtId;
        $villageId = $request->villageId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $districtWithGapoktans = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->with('gapoktans');
        }])->get();

        $districtData = $districtWithGapoktans->firstWhere('id', $districtId);

        $villagesByDistrictId = Village::where('district_id', $districtId)->get();

        // Filter gapoktans berdasarkan village_id jika village_id diberikan
        $gapoktansQuery = Gapoktan::whereHas('village', function ($query) use ($districtId) {
            $query->where('district_id', $districtId);
        });

        if ($villageId) {
            $gapoktansQuery->where('village_id', $villageId);
        }

        if ($search) {
            $gapoktansQuery->where('name', 'like', '%' . $search . '%');
        }

        $gapoktansInDiscrict = $gapoktansQuery->with('village')->paginate($perpage);

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

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $district = District::firstWhere('id', $request->districtId);
        $villages = Village::where('district_id', $request->districtId)->get();
        $layerGroup = LayerGrup::all();

        return Inertia::render('Backpage/Gapoktan/Create', [
            'navName' => 'Tambah Gapoktan',
            'district' => $district,
            'villages' => $villages,
            'layerGroup' => $layerGroup
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $districtId = $request->districtId;

        $validated = $request->validate([
            // step 1
            'village_id' => 'required|exists:villages,id',
            'name' => 'required|string|max:50',
            'leader' => 'required|string|max:50',
            'secretary' => 'required|string|max:50',
            'treasurer' => 'required|string|max:50',
            'number_of_members' => 'required|integer',
            'since' => 'required|string|max:4',
            'confirmation_sk' => 'required|string',
            'confirmation_sk_no' => 'required|string',
            'farming_business' => 'required|string',
            'business_process' => 'required|string',
            'business_unit' => 'required',
            'tools_and_machines' => 'required',
            // step 2
            'layer_group_id' => 'required|exists:layer_grups,id',
            'photos.*' => 'required',
            'location' => 'required|json',
            'address' => 'required|string',
            'description' => 'required|string',
        ]);

        // ubah json ke string
        $validated['business_unit'] = json_encode($validated['business_unit']);
        $validated['tools_and_machines'] = json_encode($validated['tools_and_machines']);

        // Handle file uploads
        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('gapoktans-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validated['photo'] = json_encode($photoPaths);

        // echo($validated);

        Gapoktan::create($validated);

        return redirect()->route('gapoktans.district', ['districtId' => $districtId])->with('success', 'Gapoktan created successfully.');
    }

    public function createStepOne(Request $request)
    {
        $district = District::firstWhere('id', $request->districtId);
        $villages = Village::where('district_id', $request->districtId)->get();

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
            'confirmation_sk' => 'required|string',
            'confirmation_sk_no' => 'required|string',
            'farming_business' => 'required|string',
            'business_process' => 'required|string',
            'business_unit' => 'required',
            'tools_and_machines' => 'required',
        ]);

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
            'location' => 'required|json',
            'address' => 'required|string',
            'description' => 'nullable|string',
        ]);

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
        $gapoktanById = Gapoktan::findOrFail($request->gapoktanId); // dari request ambil

        $district = District::firstWhere('id', $request->districtId);
        $villages = Village::where('district_id', $request->districtId)->get();
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
            'confirmation_sk' => 'required|string',
            'confirmation_sk_no' => 'required|string',
            'farming_business' => 'required|string',
            'business_process' => 'required|string',
            'business_unit' => 'required',
            'tools_and_machines' => 'required',
        ]);

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
            'location' => 'required|json',
            'address' => 'required|string',
            'description' => 'nullable|string',
        ]);

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
            $gapoktanById->fill($validatedData);
            $gapoktanById->save();

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
        //
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
