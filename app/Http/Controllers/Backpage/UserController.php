<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    private $validationMessages = [
        'nik.required' => 'NIK wajib diisi.',
        'nik.string' => 'NIK harus berupa teks.',
        'nik.size' => 'NIK harus terdiri dari 16 karakter.',
        'nik.unique' => 'NIK sudah terdaftar untuk ADMIN.',
        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa teks.',
        'name.max' => 'Nama maksimal terdiri dari 255 karakter.',
        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa teks.',
        'phone_number.required' => 'Nomor telepon wajib diisi.',
        'phone_number.string' => 'Nomor telepon harus berupa teks.',
        'phone_number.max' => 'Nomor telepon maksimal terdiri dari 20 karakter.',
        'email.required' => 'Email wajib diisi.',
        'email.email' => 'Format email tidak valid.',
        'email.unique' => 'Email sudah terdaftar.',
        'password.required' => 'Password wajib diisi.',
        'password.string' => 'Password harus berupa teks.',
        'password.min' => 'Password minimal terdiri dari 8 karakter.',
        'password.confirmed' => 'Konfirmasi password tidak cocok.',
        'role.required' => 'Role wajib diisi.',
        'role.in' => 'Role harus salah satu dari nilai yang valid.',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perpage = $request->perpage ?? 10;
        $role = $request->role;
        $search = $request->search;

        $personsQuery = User::where('role', 'ADMIN')->latest();

        if ($role) {
            $personsQuery->where('role', $role);
        }

        if ($search) {
            $personsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('nik', 'like', '%' . $search . '%');
            });
        }

        $persons = $personsQuery->paginate($perpage);

        return Inertia::render('Backpage/User/Index', [
            'navName' => 'Data Pengguna',
            'searchValue' => $request->search ?? '',
            'persons' => $persons,
        ]);
        // return response()->json($persons);
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
        // Validasi input
        $validatedData = $request->validate([
            'nik' => [
                'required',
                'string',
                'size:16',
                Rule::unique('users')->where(function ($query) {
                    return $query->where('role', 'ADMIN');
                })
            ],
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string|max:50',
        ], $this->validationMessages);

        // Buat pengguna baru dengan role yang diterima dari request
        $user = User::create([
            'nik' => $validatedData['nik'],
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'email' => $validatedData['email'],  // Ensure email is passed in the request
            'password' => bcrypt($validatedData['password']), // Encrypt password
            'role' => $validatedData['role'],    // Use role from validated data
        ]);

        return response()->json([
            'message' => 'Data berhasil ditambahkan.',
            'user' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        // Validasi input
        $validatedData = $request->validate([
            'nik' => [
                'required',
                'string',
                'size:16',
                Rule::unique('users')->ignore($id)->where(function ($query) use ($request) {
                    return $query->where('role', 'LAND_OWNER_CULTIVATOR');
                })
            ],
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'role' => 'required|string|max:50',
            'password' => 'nullable|string|min:8', // Make password optional on update
        ], $this->validationMessages);

        // Find the user by ID
        $user = User::findOrFail($id);

        // Update the user using the update() method
        $user->update([
            'nik' => $validatedData['nik'],
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'phone_number' => $validatedData['phone_number'],
            'email' => $validatedData['email'],
            'role' => $validatedData['role'],
            // Only update password if it's provided
            'password' => $validatedData['password'] ? bcrypt($validatedData['password']) : $user->password,
        ]);

        return response()->json([
            'message' => 'Data berhasil diperbarui.',
            'user' => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        // Hapus data pengguna
        $user->delete();

        return redirect()->route('data-pengguna.index')->with('success', 'Data deleted successfully.');
    }
}
