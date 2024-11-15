<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\LandAgriculture;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        'cultivator_id.required' => 'Penggarap wajib diisi.',
        'cultivator_id.exists' => 'Penggarap tidak valid.',
        'commodities.required' => 'Komoditas wajib diisi.',
        'commodities_cycle.json' => 'Perkiraan Panen harus berupa format JSON.',
        'status.required' => 'Status wajib diisi.',
        'status.string' => 'Status harus berupa teks.',
        'layer_group_id.required' => 'Grup lapisan wajib diisi.',
        'layer_group_id.exists' => 'Grup lapisan tidak valid.',
        'photo.required' => 'Foto wajib diisi.',
        'photo.image' => 'Foto harus berupa file gambar.',
        'photo.mimes' => 'Foto harus dalam format jpeg, png, jpg, gif, atau svg.',
        'photo.max' => 'Ukuran foto tidak boleh lebih dari 2MB.',
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

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $villageId = $request->village_id;
            $perpage = $request->perpage ?? 10;
            $search = $request->search;

            $landAgriculturesQuery = LandAgriculture::with(['poktan', 'subak', 'typeLandAgriculture', 'commodities', 'village', 'owner', 'cultivator'])->latest();

            if ($villageId) {
                $landAgriculturesQuery->where('village_id', $villageId);
            }

            if ($search) {
                $landAgriculturesQuery->where('name', 'like', '%' . $search . '%');
            }

            $landAgricultures = $landAgriculturesQuery->paginate($perpage);

            return response()->json($landAgricultures);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
        try {

            // Set default value for 'layer_group_id' before validation if not present
            $request->merge([
                'layer_group_id' => $request->input('layer_group_id', 3) // Default to 3 if not provided
            ]);

            $validatedData = $request->validate([
                'village_id' => 'required|exists:villages,id',
                'poktan_id' => 'nullable|exists:poktans,id',
                'subak_id' => 'nullable|exists:subaks,id',
                'type_land_agriculture_id' => 'required|exists:type_land_agricultures,id',
                'owner_id' => 'required|exists:users,id',
                'cultivator_id' => 'nullable|exists:users,id',
                'commodities' => 'required',
                'commodities_cycle' => 'nullable',
                'status' => 'required|string',
                'layer_group_id' => 'required|exists:layer_grups,id',
                // 'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'photos.*' => 'required',
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
                'land_area' => 'required|string',
                'address' => 'required|string',
                'description' => 'nullable|string',
            ], $this->validationMessages);

            // Mengonversi lokasi ke array
            $validatedData['location'] = json_decode($request->location, true);
            $validatedData['area_json'] = json_decode($request->area_json, true);
            $validatedData['commodities'] = json_decode($request->commodities, true);
            if (isset($landAgriculture['commodities_cycle'])) {
                $validatedData['commodities_cycle'] = json_encode($landAgriculture['commodities_cycle']);
            }

            // Handle file uploads
            $photoPaths = [];
            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $photo) {
                    $path = $photo->store('land-agricultures-image-test');
                    $photoPaths[] = Storage::url($path);
                }
            }
            $validatedData['photo'] = json_encode($photoPaths);

            // Start a transaction
            DB::beginTransaction();

            try {
                // Create the LandAgriculture record
                $landAgriculture = new LandAgriculture();
                $landAgriculture->fill($validatedData);
                $landAgriculture->save();

                // After saving, we attempt to store the commodities relationship
                $landAgricultureById = LandAgriculture::with('commodities')->find($landAgriculture->id);
                $commodities = $validatedData['commodities'];

                // Attempt to sync the commodities, if it fails, rollback the transaction
                $landAgricultureById->commodities()->sync($commodities);

                // Commit the transaction if everything is successful
                DB::commit();

                // Return a success response with the created resource
                return response()->json([
                    'success' => true,
                    'message' => 'Data berhasil disimpan.',
                    'data' => $landAgriculture,
                ], 201);
            } catch (\Exception $e) {
                // If anything fails, rollback the transaction
                DB::rollBack();

                // Return a failure response
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan saat menyimpan data komoditas, pastikan komoditas valid. #roolback',
                    'error' => $e->getMessage(),
                    // 'trace' => $e->getTraceAsString(), // Optional: For debugging purposes
                ], 500);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation exceptions (this will be caught from the $request->validate)
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat validasi data.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Catch any other exceptions
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menyimpan data.',
                'error' => $e->getMessage(),
                // 'trace' => $e->getTraceAsString(), // Optional: To log more detailed error information
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $landAgriculture = LandAgriculture::with(['poktan', 'subak', 'typeLandAgriculture', 'commodities', 'village', 'owner', 'cultivator'])
                ->findOrFail($id);

            return response()->json($landAgriculture);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
        try {
            // Find the existing LandAgriculture by ID
            $landAgriculture = LandAgriculture::findOrFail($id);

            // Set default value for 'layer_group_id' before validation if not present
            $request->merge([
                'layer_group_id' => $request->input('layer_group_id', 3) // Default to 3 if not provided
            ]);

            $validatedData = $request->validate([
                'village_id' => 'required|exists:villages,id',
                'poktan_id' => 'nullable|exists:poktans,id',
                'subak_id' => 'nullable|exists:subaks,id',
                'type_land_agriculture_id' => 'required|exists:type_land_agricultures,id',
                'owner_id' => 'required|exists:users,id',
                'cultivator_id' => 'nullable|exists:users,id',
                'commodities' => 'required',
                'commodities_cycle' => 'nullable',
                'status' => 'required|string',
                'layer_group_id' => 'required|exists:layer_grups,id',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Changed to nullable for update
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
                'land_area' => 'required|string',
                'address' => 'required|string',
                'description' => 'nullable|string',
            ], $this->validationMessages);

            // Mengonversi lokasi ke array
            $validatedData['location'] = json_decode($request->location, true);
            $validatedData['area_json'] = json_decode($request->area_json, true);
            $validatedData['commodities'] = json_decode($request->commodities, true);
            if (isset($validatedData['commodities_cycle'])) {
                $validatedData['commodities_cycle'] = json_encode($validatedData['commodities_cycle']);
            }

            // Handle file uploads
            $photoPaths = [];
            $newPhotoPaths = [];
            if ($landAgriculture->photo) {
                $oldPhotos = json_decode($landAgriculture->photo, true);

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
                    $path = $photo->store('land-agricultures-image-test');
                    $photoPaths[] = Storage::url($path);
                }
            }
            $validatedData['photo'] = json_encode($photoPaths);

            // Start a transaction
            DB::beginTransaction();

            try {
                // Update the LandAgriculture record
                $landAgriculture->update($validatedData);

                // After updating, we attempt to store the commodities relationship
                $landAgricultureById = LandAgriculture::with('commodities')->find($landAgriculture->id);
                $commodities = $validatedData['commodities'];

                // Attempt to sync the commodities, if it fails, rollback the transaction
                $landAgricultureById->commodities()->sync($commodities);

                // Commit the transaction if everything is successful
                DB::commit();

                // Return a success response with the updated resource
                return response()->json([
                    'success' => true,
                    'message' => 'Data berhasil diperbarui.',
                    'data' => $landAgriculture,
                ], 200);
            } catch (\Exception $e) {
                // If anything fails, rollback the transaction
                DB::rollBack();

                // Return a failure response
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan saat menyimpan data komoditas, pastikan komoditas valid. #rollback',
                    'error' => $e->getMessage(),
                ], 500);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation exceptions (this will be caught from the $request->validate)
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat validasi data.',
                'errors' => $e->errors(),
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        } catch (\Exception $e) {
            // Catch any other exceptions
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memperbarui data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $landAgriculture = LandAgriculture::findOrFail($id);

            // Hapus file foto dari penyimpanan
            if ($landAgriculture->photo) {
                $photoPaths = json_decode($landAgriculture->photo, true);
                foreach ($photoPaths as $photoPath) {
                    $storagePath = str_replace('/storage', '', $photoPath); // Konversi URL ke path penyimpanan
                    Storage::delete($storagePath);
                }
            }

            $landAgriculture->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil dihapus.'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage()
            ], 500);
        }
    }
}
