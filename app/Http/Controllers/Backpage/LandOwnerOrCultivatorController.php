<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LandOwnerOrCultivatorController extends Controller
{
    private $validationMessages = [
        'nik.required' => 'NIK wajib diisi.',
        'nik.string' => 'NIK harus berupa teks.',
        'nik.size' => 'NIK harus terdiri dari 16 karakter.',
        'nik.unique' => 'NIK sudah terdaftar untuk PEMILIK LAHAN ATAU PENGGARAP.',
        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama maksimal terdiri dari 255 karakter.',
        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'phone_number.required' => 'Nomor telepon wajib diisi.',
        'phone_number.string' => 'Nomor telepon harus berupa teks.',
        'phone_number.max' => 'Nomor telepon maksimal terdiri dari 20 karakter.',
    ];

    public function index(Request $request)
    {
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $personsQuery = User::where('role', 'LAND_OWNER_CULTIVATOR')->latest();

        if ($search) {
            $personsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('nik', 'like', '%' . $search . '%');
            });
        }

        $persons = $personsQuery->paginate($perpage);

        return Inertia::render('Backpage/LandOwnerOrCultivator/Index', [
            'navName' => 'Data Pemilik/Pengarap Lahan',
            'searchValue' => $request->search ?? '',
            'persons' => $persons,
        ]);
        // return response()->json($persons);
    }

    /**
     * Store a newly created owner in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $validatedData = $request->validate([
            'nik' => [
                'required',
                'string',
                'size:16',
                Rule::unique('users')->where(function ($query) {
                    return $query->where('role', 'LAND_OWNER_CULTIVATOR');
                })
            ],
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'nullable|string|max:20',
        ], $this->validationMessages);

        // Buat pengguna baru dengan role 'LAND_OWNER_CULTIVATOR'
        $owner = User::create([
            'nik' => $validatedData['nik'],
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'role' => 'LAND_OWNER_CULTIVATOR', // Set default role sebagai LAND_OWNER_CULTIVATOR
        ]);

        return response()->json([
            'message' => 'Data berhasil ditambahkan.',
            'owner' => $owner,
        ], 201);
    }

    /**
     * Update the specified owner in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        // Validasi input
        $validatedData = $request->validate([
            'nik' => [
                'required',
                'string',
                'size:16',
                Rule::unique('users')->ignore($user->id)->where(function ($query) {
                    return $query->where('role', 'LAND_OWNER_CULTIVATOR');
                })
            ],
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'nullable|string|max:20',
        ], $this->validationMessages);

        // Update data pengguna
        $user->update([
            'nik' => $validatedData['nik'],
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
        ]);

        return response()->json([
            'message' => 'Data berhasil diperbarui.',
            'owner' => $user,
        ], 200);
    }

    /**
     * Remove the specified owner from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        // Hapus data pengguna
        $user->delete();

        return redirect()->route('pemilik-penggarap.index')->with('success', 'Data deleted successfully.');
    }
}
