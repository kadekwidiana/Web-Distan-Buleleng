<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Gapoktan;
use App\Models\OutreachActivities;
use App\Models\Poktan;
use App\Models\Ppl;
use App\Models\Subak;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OutreachActivitiesController extends Controller
{
    private $validationMessages = [
        'village_id.required' => 'Desa wajib diisi.',
        'village_id.exists' => 'Desa yang dipilih tidak valid.',
        'ppl_nip.required' => 'PPL wajib diisi.',
        'ppl_nip.exists' => 'PPL yang dipilih tidak valid.',
        'title.required' => 'Judul wajib diisi.',
        'title.string' => 'Judul harus berupa teks.',
        'title.max' => 'Judul maksimal 255 karakter.',
        'photos.*.required' => 'Foto wajib diisi.',
        'location.required' => 'Lokasi wajib diisi.',
        'location.json' => 'Lokasi harus berupa format JSON yang valid.',
        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'file.nullable' => 'File bersifat opsional.',
        'file.max' => 'File tidak boleh lebih dari 10MB.',
        'notes.required' => 'Catatan wajib diisi.',
        'notes.string' => 'Catatan harus berupa teks.',
        'activity_report.required' => 'Laporan kegiatan wajib diisi.',
        'activity_report.string' => 'Laporan kegiatan harus berupa teks.',
        'others_involved.string' => 'Laporan kegiatan harus berupa teks.',
    ];

    public function outreachActivitiesRegency(Request $request)
    {
        $userSession = Auth::user();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            $villages = $user->ppl->villages;
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            $districtWithOutreachActivities = District::whereHas('villages', function ($query) use ($villageIds) {
                $query->whereIn('id', $villageIds);
            })
                ->where('id', '!=', '6301040') // Exclude the district with ID '6301040'
                ->with(['villages' => function ($query) use ($villageIds, $user) {
                    $query->whereIn('id', $villageIds)
                        ->withCount(['outreachActivities' => function ($query) use ($user) {
                            $query->where('ppl_nip', $user->ppl->nip);
                        }]);
                }])->get();
        } else {
            // If the user is not PPL, retrieve all villages with outreach activities in Buleleng regency
            $districtWithOutreachActivities = District::where('regency_id', 5108)
                ->with(['villages' => function ($query) {
                    $query->withCount('outreachActivities');
                }])->get();
        }

        $districtWithOutreachActivities = $districtWithOutreachActivities->map(function ($district) {
            $districtOutreachActivityCount = $district->villages->sum('outreach_activities_count');
            $district->outreach_activities_count = $districtOutreachActivityCount;
            return $district;
        });

        return Inertia::render('Backpage/OutreachActivity/ListOutreachActivityRegency', [
            'navName' => 'Kegiatan Penyuluhan',
            "districtWithOutreachActivities" => $districtWithOutreachActivities
        ]);
    }


    public function outreachActivitiesDistrict(Request $request)
    {
        $userSession = Auth::user();
        $districtId = $request->districtId;
        $villageId = $request->villageId;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;
        $startDate = $request->startDate; // Tanggal awal
        $endDate = $request->endDate;     // Tanggal akhir

        // Ambil data distrik dengan kegiatan penyuluhan QUERY GA PENTYING KAYAKNYA INI
        $districtWithOutreachActivities = District::where('regency_id', 5108)->with(['villages' => function ($query) {
            $query->with('landAgricultures');
        }])->get();

        $districtData = $districtWithOutreachActivities->firstWhere('id', $districtId);

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

            // Filter OutreachActivities based on the specific village IDs, district ID, and ppl_nip
            $outreachActivityQuery = OutreachActivities::whereIn('village_id', $villageIds)
                ->whereHas('village', function ($query) use ($districtId) {
                    $query->where('district_id', $districtId);
                })
                ->where('ppl_nip', $user->ppl->nip);
        } else {
            $villagesByDistrictId = Village::where('district_id', $districtId)->get();

            // Filter outreach activities berdasarkan district_id
            $outreachActivityQuery = OutreachActivities::whereHas('village', function ($query) use ($districtId) {
                $query->where('district_id', $districtId);
            });
        }

        if ($villageId) {
            $outreachActivityQuery->where('village_id', $villageId);
        }

        if ($startDate && $endDate) {
            if ($startDate == $endDate) {
                // Jika tanggalnya sama, gunakan whereDate untuk mencocokkan tanggal tersebut secara tepat
                $outreachActivityQuery->whereDate('created_at', $startDate);
            } else {
                // Jika berbeda, gunakan whereBetween
                $outreachActivityQuery->whereBetween('created_at', [$startDate, $endDate]);
            }
        }

        if ($search) {
            $outreachActivityQuery->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhereHas('ppl', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%');
                    });
            });
        }

        // Paginate hasil pencarian
        $outreachActivitiesInDiscrict = $outreachActivityQuery->with(['gapoktanOutreachActivities', 'poktanOutreachActivities', 'subakOutreachActivities', 'village', 'ppl'])->latest()->paginate($perpage);

        return Inertia::render('Backpage/OutreachActivity/ListOutreachActivityDistrict', [
            'navName' => 'Kegiatan Penyuluhan',
            'districtData' => $districtData,
            'searchValue' => $request->search ?? '',
            'villageIdValue' => $request->villageId ?? '',
            'startDateValue' => $request->startDate ?? '',
            'endDateValue' => $request->endDate ?? '',
            'villagesByDistrictId' => $villagesByDistrictId,
            'outreachActivitiesInDiscrict' => $outreachActivitiesInDiscrict
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $userSession = Auth::user();
        $districtId = $request->districtId;

        $district = District::firstWhere('id', $districtId);

        $villageIds = Village::where('district_id', $districtId)->pluck('id');

        $gapoktans = Gapoktan::whereIn('village_id', $villageIds)->get();
        $poktans = Poktan::whereIn('village_id', $villageIds)->get();
        $subaks = Subak::whereIn('village_id', $villageIds)->get();

        if ($userSession->role === 'PPL') {
            $user = User::with(['ppl.villages'])->findOrFail($userSession->id);
            // Get the villages associated with the Ppl model
            $villages = $user->ppl->villages;
            $ppls = Ppl::where('nip', $user->ppl->nip)->get();
            // Extract the IDs into an array
            $villageIds = $villages->pluck('id')->unique()->values()->toArray();

            // Fetch villages based on the extracted IDs and district ID
            $villages = Village::whereIn('id', $villageIds)
                ->where('district_id', $request->districtId)
                ->get();
        } else {
            $villages = Village::where('district_id', $request->districtId)->get();
            $ppls = Ppl::all();
        }

        return Inertia::render('Backpage/OutreachActivity/Create', [
            'navName' => 'Tambah Kegiatan Penyuluhan',
            'district' => $district,
            'villages' => $villages,
            'ppls' => $ppls,
            'gapoktans' => $gapoktans,
            'poktans' => $poktans,
            'subaks' => $subaks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'ppl_nip' => 'required|exists:ppls,nip',
            'title' => 'required|string|max:255',
            'photos.*' => 'required',
            'location' => 'required|json',
            'address' => 'required|string',
            'file' => 'nullable|file|max:10240', // max 10MB
            'notes' => 'required|string',
            'activity_report' => 'required|string',
            'others_involved' => 'nullable|string',
        ], $this->validationMessages);

        $validatedDataRelational = $request->validate([
            'gapoktan_outreach_activities' => 'nullable',
            'poktan_outreach_activities' => 'nullable',
            'subak_outreach_activities' => 'nullable',
        ]);

        // Mengonversi lokasi ke array
        $validatedData['location'] = json_decode($request->location, true);

        if ($request->file('file')) {
            $validatedData['file'] = $request->file('file')->store('outreach-activity-file');
        }

        // Handle file uploads
        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('outreach-activity-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $outreachActivity = new OutreachActivities();
        $outreachActivity->fill($validatedData);
        $outreachActivity->save();

        if ($validatedDataRelational) {
            $outreachActivityById = OutreachActivities::with(['gapoktanOutreachActivities', 'poktanOutreachActivities', 'subakOutreachActivities'])->find($outreachActivity->id);
            if ($request['gapoktan_outreach_activities']) {
                $gapoktanOutreachActivities = $validatedDataRelational['gapoktan_outreach_activities'];
                $outreachActivityById->gapoktanOutreachActivities()->sync($gapoktanOutreachActivities); // simpan relasi many to many
            }
            if ($request['poktan_outreach_activities']) {
                $poktanOutreachActivities = $validatedDataRelational['poktan_outreach_activities'];
                $outreachActivityById->poktanOutreachActivities()->sync($poktanOutreachActivities); // simpan relasi many to many
            }
            if ($request['subak_outreach_activities']) {
                $subakOutreachActivities = $validatedDataRelational['subak_outreach_activities'];
                $outreachActivityById->subakOutreachActivities()->sync($subakOutreachActivities); // simpan relasi many to many
            }
        }

        return redirect()->route('outreachActivities.district', ['districtId' => $districtId])->with('success', 'Outreach Activity created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $districtId = $request->districtId;
        $outreachActivityById = OutreachActivities::with(['gapoktanOutreachActivities', 'poktanOutreachActivities', 'subakOutreachActivities', 'village', 'ppl'])->firstWhere('id', $request->id);

        return Inertia::render('Backpage/OutreachActivity/Detail', [
            'navName' => 'Detail Kegiatan Penyuluhan',
            'districtId' => $districtId,
            'outreachActivityById' => $outreachActivityById
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $userSession = Auth::user();
        $districtId = $request->districtId;
        $outreachActivityById = OutreachActivities::firstWhere('id', $request->id);
        $gapoktanOutreachActivityIds = $outreachActivityById->gapoktanOutreachActivities->pluck('id')->toArray(); //biar gampang olah di FE
        $poktanOutreachActivityIds = $outreachActivityById->poktanOutreachActivities->pluck('id')->toArray(); //biar gampang olah di FE
        $subakOutreachActivityIds = $outreachActivityById->subakOutreachActivities->pluck('id')->toArray(); //biar gampang olah di FE

        $district = District::firstWhere('id', $districtId);
        $ppls = Ppl::all();

        $villageIds = Village::where('district_id', $districtId)->pluck('id');

        $gapoktans = Gapoktan::whereIn('village_id', $villageIds)->get();
        $poktans = Poktan::whereIn('village_id', $villageIds)->get();
        $subaks = Subak::whereIn('village_id', $villageIds)->get();

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

        return Inertia::render('Backpage/OutreachActivity/Edit', [
            'navName' => 'Edit Kegiatan Penyuluhan',
            'district' => $district,
            'villages' => $villages,
            'ppls' => $ppls,
            'gapoktans' => $gapoktans,
            'poktans' => $poktans,
            'subaks' => $subaks,
            'outreachActivityById' => $outreachActivityById,
            'gapoktanOutreachActivityIds' => $gapoktanOutreachActivityIds,
            'poktanOutreachActivityIds' => $poktanOutreachActivityIds,
            'subakOutreachActivityIds' => $subakOutreachActivityIds,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $outreachActivityById = OutreachActivities::findOrFail($request->id);

        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'ppl_nip' => 'required|exists:ppls,nip',
            'title' => 'required|string|max:255',
            'photos.*' => 'required',
            'location' => 'required|json',
            'address' => 'required|string',
            'file' => 'nullable|max:10240', // max 10MB
            'notes' => 'required|string',
            'activity_report' => 'required|string',
            'others_involved' => 'nullable|string',
        ], $this->validationMessages);

        $validatedDataRelational = $request->validate([
            'gapoktan_outreach_activities' => 'nullable',
            'poktan_outreach_activities' => 'nullable',
            'subak_outreach_activities' => 'nullable',
        ]);

        // Mengonversi lokasi ke array
        $validatedData['location'] = json_decode($request->location, true);

        if ($request->hasFile('file')) {
            // Delete the old file
            if ($outreachActivityById->foto && Storage::exists($outreachActivityById->foto)) {
                Storage::delete($outreachActivityById->foto);
            }

            $validatedData['file'] = $request->file('file')->store('outreach-activity-file');
        }

        // Handle file uploads
        // Handle file uploads
        $photoPaths = [];
        $newPhotoPaths = [];
        if ($outreachActivityById->photo) {
            $oldPhotos = json_decode($outreachActivityById->photo, true);

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
                $path = $photo->store('outreach-activity-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $outreachActivityById->fill($validatedData);
        $outreachActivityById->save();

        if ($validatedDataRelational) {
            // $outreachActivityById = OutreachActivities::with(['gapoktanOutreachActivities', 'poktanOutreachActivities', 'subakOutreachActivities'])->find($outreachActivity->id);
            if ($request['gapoktan_outreach_activities']) {
                $gapoktanOutreachActivities = $validatedDataRelational['gapoktan_outreach_activities'];
                $outreachActivityById->gapoktanOutreachActivities()->sync($gapoktanOutreachActivities); // simpan relasi many to many
            }
            if ($request['poktan_outreach_activities']) {
                $poktanOutreachActivities = $validatedDataRelational['poktan_outreach_activities'];
                $outreachActivityById->poktanOutreachActivities()->sync($poktanOutreachActivities); // simpan relasi many to many
            }
            if ($request['subak_outreach_activities']) {
                $subakOutreachActivities = $validatedDataRelational['subak_outreach_activities'];
                $outreachActivityById->subakOutreachActivities()->sync($subakOutreachActivities); // simpan relasi many to many
            }
        }

        return redirect()->route('outreachActivities.district', ['districtId' => $districtId])->with('success', 'Outreach Activity created successfully.');
        $districtId = $request->districtId;

        $validatedData = $request->validate([
            'village_id' => 'required|exists:villages,id',
            'title' => 'required|string|max:255',
            'photos.*' => 'required',
            'location' => 'required|json',
            'address' => 'required|string',
            'file' => 'nullable|file|max:10240', // max 5MB
            'notes' => 'required|string',
            'activity_report' => 'required|string',
        ], $this->validationMessages);

        $validatedDataRelational = $request->validate([
            'gapoktan_outreach_activities' => 'nullable',
            'poktan_outreach_activities' => 'nullable',
            'subak_outreach_activities' => 'nullable',
        ]);

        // Mengonversi lokasi ke array
        $validatedData['location'] = json_decode($request->location, true);

        if ($request->file('file')) {
            $validatedData['file'] = $request->file('file')->store('outreach-activity-file');
        }

        // Handle file uploads
        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('outreach-activity-image');
                $photoPaths[] = Storage::url($path);
            }
        }
        $validatedData['photo'] = json_encode($photoPaths);

        $outreachActivity = new OutreachActivities();
        $outreachActivity->fill($validatedData);
        $outreachActivity->save();

        if ($validatedDataRelational) {
            $outreachActivityById = OutreachActivities::with(['gapoktanOutreachActivities', 'poktanOutreachActivities', 'subakOutreachActivities'])->find($outreachActivity->id);
            if ($request['gapoktan_outreach_activities']) {
                $gapoktanOutreachActivities = $validatedDataRelational['gapoktan_outreach_activities'];
                $outreachActivityById->gapoktanOutreachActivities()->sync($gapoktanOutreachActivities); // simpan relasi many to many
            }
            if ($request['poktan_outreach_activities']) {
                $poktanOutreachActivities = $validatedDataRelational['poktan_outreach_activities'];
                $outreachActivityById->poktanOutreachActivities()->sync($poktanOutreachActivities); // simpan relasi many to many
            }
            if ($request['subak_outreach_activities']) {
                $subakOutreachActivities = $validatedDataRelational['subak_outreach_activities'];
                $outreachActivityById->subakOutreachActivities()->sync($subakOutreachActivities); // simpan relasi many to many
            }
        }

        return redirect()->route('outreachActivities.district', ['districtId' => $districtId])->with('success', 'Outreach Activity updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $outreachActivityById = OutreachActivities::findOrFail($request->id);

        // Hapus file foto dari penyimpanan
        if ($outreachActivityById->photo) {
            $photoPaths = json_decode($outreachActivityById->photo, true);
            foreach ($photoPaths as $photoPath) {
                $storagePath = str_replace('/storage', '', $photoPath); // Konversi URL ke path penyimpanan
                Storage::delete($storagePath);
            }
        }

        // Delete the photo
        if ($outreachActivityById->file && Storage::exists($outreachActivityById->file)) {
            Storage::delete($outreachActivityById->file);
        }

        $outreachActivityById->delete();

        return redirect()->route('outreachActivities.district', ['districtId' => $request->districtId])->with('success', 'Outreach Activity deleted successfully.');
    }
}
