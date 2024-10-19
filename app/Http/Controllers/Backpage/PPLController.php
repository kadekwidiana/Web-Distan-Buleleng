<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\Bpp;
use App\Models\Ppl;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class PPLController extends Controller
{
    private $validationMessages = [
        'nik.required' => 'NIK wajib diisi.',
        'nik.string' => 'NIK harus berupa string.',
        'nik.max' => 'NIK tidak boleh lebih dari 16 karakter.',
        'nik.unique' => 'NIK sudah terdaftar.',

        'bpp_id.required' => 'BPP harus diisi.',
        'bpp_id.exists' => 'BPP tidak valid.',

        'name.required' => 'Nama wajib diisi.',
        'name.string' => 'Nama harus berupa string.',
        'name.max' => 'Nama tidak boleh lebih dari 50 karakter.',

        'email.required' => 'Email wajib diisi.',
        'email.string' => 'Email harus berupa string.',
        'email.email' => 'Email harus berupa email yang valid.',
        'email.max' => 'Email tidak boleh lebih dari 255 karakter.',
        'email.unique' => 'Email sudah terdaftar.',

        'foto.image' => 'Foto harus berupa gambar.',
        'foto.mimes' => 'Foto harus berupa file dengan format: jpeg, png, jpg, gif.',
        'foto.max' => 'Foto tidak boleh lebih dari 2048 kilobytes.',

        'address.required' => 'Alamat wajib diisi.',
        'address.string' => 'Alamat harus berupa string.',
        'address.max' => 'Alamat tidak boleh lebih dari 255 karakter.',

        'phone_number.required' => 'Nomor telepon wajib diisi.',
        'phone_number.string' => 'Nomor telepon harus berupa string.',
        'phone_number.max' => 'Nomor telepon tidak boleh lebih dari 15 karakter.',

        'role.required' => 'Peran wajib diisi.',
        'role.string' => 'Peran harus berupa string.',
        'role.max' => 'Peran tidak boleh lebih dari 50 karakter.',

        'password.required' => 'Kata sandi wajib diisi.',
        'password.string' => 'Kata sandi harus berupa string.',
        'password.min' => 'Kata sandi harus memiliki minimal 8 karakter.',
        'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',

        'nip.required' => 'NIP wajib diisi.',
        'nip.string' => 'NIP harus berupa string.',
        'nip.max' => 'NIP tidak boleh lebih dari 18 karakter.',
        'nip.unique' => 'NIP sudah terdaftar.',

        'employee_status.required' => 'Status pegawai wajib diisi.',
        'employee_status.string' => 'Status pegawai harus berupa string.',
        'employee_status.max' => 'Status pegawai tidak boleh lebih dari 50 karakter.',

        'front_title.string' => 'Gelar depan harus berupa string.',
        'front_title.max' => 'Gelar depan tidak boleh lebih dari 50 karakter.',

        'back_title.string' => 'Gelar belakang harus berupa string.',
        'back_title.max' => 'Gelar belakang tidak boleh lebih dari 50 karakter.',

        'place_of_birth.required' => 'Tempat lahir wajib diisi.',
        'place_of_birth.string' => 'Tempat lahir harus berupa string.',
        'place_of_birth.max' => 'Tempat lahir tidak boleh lebih dari 50 karakter.',

        'date_of_birth.required' => 'Tanggal lahir wajib diisi.',
        'date_of_birth.date' => 'Tanggal lahir harus berupa tanggal yang valid.',

        'gender.required' => 'Jenis kelamin wajib diisi.',
        'gender.string' => 'Jenis kelamin harus berupa string.',
        'gender.max' => 'Jenis kelamin tidak boleh lebih dari 50 karakter.',

        'religion.required' => 'Agama wajib diisi.',
        'religion.string' => 'Agama harus berupa string.',
        'religion.max' => 'Agama tidak boleh lebih dari 50 karakter.',

        'areas_of_expertise.required' => 'Bidang keahlian wajib diisi.',
        'areas_of_expertise.string' => 'Bidang keahlian harus berupa string.',
        'areas_of_expertise.max' => 'Bidang keahlian tidak boleh lebih dari 50 karakter.',

        'last_education.required' => 'Pendidikan terakhir wajib diisi.',
        'last_education.string' => 'Pendidikan terakhir harus berupa string.',
        'last_education.max' => 'Pendidikan terakhir tidak boleh lebih dari 50 karakter.',

        'field_of_education.required' => 'Bidang pendidikan wajib diisi.',
        'field_of_education.string' => 'Bidang pendidikan harus berupa string.',
        'field_of_education.max' => 'Bidang pendidikan tidak boleh lebih dari 50 karakter.',

        'major.required' => 'Jurusan wajib diisi.',
        'major.string' => 'Jurusan harus berupa string.',
        'major.max' => 'Jurusan tidak boleh lebih dari 50 karakter.',

        'school_name.required' => 'Nama sekolah wajib diisi.',
        'school_name.string' => 'Nama sekolah harus berupa string.',
        'school_name.max' => 'Nama sekolah tidak boleh lebih dari 50 karakter.',

        'work_location.required' => 'Lokasi kerja wajib diisi.',
        'work_location.string' => 'Lokasi kerja harus berupa string.',
        'work_location.max' => 'Lokasi kerja tidak boleh lebih dari 50 karakter.',

        'date_sk.required' => 'Tanggal SK wajib diisi.',
        'date_sk.date' => 'Tanggal SK harus berupa tanggal yang valid.',

        'date_spmt.required' => 'Tanggal SPMT wajib diisi.',
        'date_spmt.date' => 'Tanggal SPMT harus berupa tanggal yang valid.',

        'position.required' => 'Jabatan wajib diisi.',
        'position.string' => 'Jabatan harus berupa string.',
        'position.max' => 'Jabatan tidak boleh lebih dari 50 karakter.',

        'provinsi.required' => 'Provinsi wajib diisi.',
        'provinsi.string' => 'Provinsi harus berupa string.',
        'provinsi.max' => 'Provinsi tidak boleh lebih dari 50 karakter.',

        'regency.required' => 'Kabupaten/Kota wajib diisi.',
        'regency.string' => 'Kabupaten/Kota harus berupa string.',
        'regency.max' => 'Kabupaten/Kota tidak boleh lebih dari 50 karakter.',

        'post_code.required' => 'Kode pos wajib diisi.',
        'post_code.string' => 'Kode pos harus berupa string.',
        'post_code.max' => 'Kode pos tidak boleh lebih dari 10 karakter.',

        'villages.required' => 'Wilayah binaan wajib diisi.',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $employeeStatus = $request->employeeStatus;
        $perpage = $request->perpage ?? 10;
        $search = $request->search;

        $pplsQuery = Ppl::latest();

        if ($employeeStatus) {
            $pplsQuery->where('employee_status', $employeeStatus);
        }

        if ($search) {
            $pplsQuery->where('name', 'like', '%' . $search . '%')
                ->orWhere('nip', 'like', '%' . $search . '%');
        }

        $ppls = $pplsQuery->paginate($perpage);

        return Inertia::render('Backpage/Penyuluh/Index', [
            'navName' => 'Data Penyuluh',
            'searchValue' => $request->search ?? '',
            'employeeStatusValue' => $request->employeeStatus ?? '',
            'ppls' => $ppls,
        ]);
        // return response()->json($ppls);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $villages = Village::whereHas('district', function ($query) {
            $query->where('regency_id', 5108);
        })->get();
        $bpps = Bpp::all();

        return Inertia::render('Backpage/Penyuluh/Create', [
            'navName' => 'Tambah Penyuluh',
            'villages' => $villages,
            'bpps' => $bpps,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // NOTE: INI BELUM ISI ROLEBACK DBNYA JIKA SALAH 1 GAGAL PROSESNYA
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nik' => [
                'required',
                'string',
                'max:16',
                Rule::unique('users')->where(function ($query) {
                    return $query->where('role', 'PPL');
                })
            ],
            'bpp_id' => 'required|exists:bpps,id',
            'name' => 'required|string|max:50',
            'email' => 'required|string|email|max:255|unique:users,email',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'role' => 'required|string|max:50',
            'password' => 'required|string|min:8',

            'nip' => 'required|string|max:18|unique:ppls,nip',
            'employee_status' => 'required|string|max:50',
            'front_title' => 'nullable|string|max:50',
            'back_title' => 'nullable|string|max:50',
            'place_of_birth' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:50',
            'religion' => 'required|string|max:50',
            'areas_of_expertise' => 'required|string|max:50',
            'last_education' => 'required|string|max:50',
            'field_of_education' => 'required|string|max:50',
            'major' => 'required|string|max:50',
            'school_name' => 'required|string|max:50',
            'work_location' => 'nullable|string|max:50',
            'date_sk' => 'required|date',
            'date_spmt' => 'required|date',
            'position' => 'required|string|max:50',
            'provinsi' => 'required|string|max:50',
            'regency' => 'required|string|max:50',
            'post_code' => 'required|string|max:10',
            'villages' => 'required'
        ], $this->validationMessages);

        // Save User data
        $userDataKeys = [
            'nik',
            'name',
            'email',
            'foto',
            'address',
            'phone_number',
            'role',
            'password',
        ];
        $userData = array_intersect_key($validatedData, array_flip($userDataKeys));
        if ($request->hasFile('foto')) {
            $userData['foto'] = $request->file('foto')->store('ppls-image');
        }
        $userData['password'] = bcrypt($userData['password']);
        $user = User::create($userData);

        // Save PPL data
        $pplDataKeys = [
            'nip',
            'account_id',
            'bpp_id',
            'name',
            'employee_status',
            'front_title',
            'back_title',
            'place_of_birth',
            'date_of_birth',
            'gender',
            'religion',
            'areas_of_expertise',
            'last_education',
            'field_of_education',
            'major',
            'school_name',
            'work_location',
            'date_sk',
            'date_spmt',
            'position',
            'address',
            'provinsi',
            'regency',
            'post_code',
            'phone_number',
            'email',
        ];
        $pplData = array_intersect_key($validatedData, array_flip($pplDataKeys));
        $pplData['account_id'] = $user->id;
        Ppl::create($pplData);

        // menyimpan wilayah binaan
        $pplById = Ppl::with('villages')->find($pplData['nip']);
        $villages = $validatedData['villages'];
        $pplById->villages()->sync($villages); // simpan relasi many to many

        // return response()->json(['message' => 'User and PPL data saved successfully']);
        return redirect()->route('ppl.index')->with('success', 'PPL created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pplById = Ppl::with(['account', 'villages', 'bpp'])->findOrFail($id);
        return Inertia::render('Backpage/Penyuluh/Detail', [
            'navName' => 'Detail ' . $pplById->name,
            'pplById' => $pplById,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Retrieve the Ppl model with its associated account
        $pplById = Ppl::with('account')->findOrFail($id);

        // Extract unique village IDs into an array
        $villageIds = $pplById->villages->pluck('id')->unique()->values()->toArray();
        // dd($villageIds); // Should show array format aneh banget, malah object jadi nya, harus nya array
        // Retrieve all villages within the specified regency
        $villages = Village::whereHas('district', function ($query) {
            $query->where('regency_id', 5108);
        })->get();

        $bpps = Bpp::all();

        // Pass data to the view
        return Inertia::render('Backpage/Penyuluh/Edit', [
            'navName' => 'Edit Penyuluh',
            'pplById' => $pplById,
            'villageIds' => $villageIds, // Ensure this is an array
            'villages' => $villages,
            'bpps' => $bpps,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ppl = Ppl::where('nip', $id)->firstOrFail();
        $user = User::where('id', $ppl->account_id)->firstOrFail();
        // return response()->json($user);

        $validatedData = $request->validate([
            'nik' => [
                'required',
                'string',
                'max:16',
                Rule::unique('users', 'nik')
                    ->ignore($user->id)
                    ->where(function ($query) {
                        return $query->where('role', 'PPL');
                    }),
            ],
            'bpp_id' => 'required|exists:bpps,id',
            'name' => 'required|string|max:50',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'role' => 'required|string|max:50',
            'password' => 'nullable|string|min:8',

            'nip' => 'required|string|max:18|unique:ppls,nip,' . $ppl->nip . ',nip',
            'employee_status' => 'required|string|max:50',
            'front_title' => 'nullable|string|max:50',
            'back_title' => 'nullable|string|max:50',
            'place_of_birth' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:50',
            'religion' => 'required|string|max:50',
            'areas_of_expertise' => 'required|string|max:50',
            'last_education' => 'required|string|max:50',
            'field_of_education' => 'required|string|max:50',
            'major' => 'required|string|max:50',
            'school_name' => 'required|string|max:50',
            'work_location' => 'nullable|string|max:50',
            'date_sk' => 'required|date',
            'date_spmt' => 'required|date',
            'position' => 'required|string|max:50',
            'provinsi' => 'required|string|max:50',
            'regency' => 'required|string|max:50',
            'post_code' => 'required|string|max:10',
            'villages' => 'required'
        ], $this->validationMessages);

        // return response()->json($validatedData);

        // Update User data
        $userDataKeys = [
            'nik',
            'name',
            'email',
            'address',
            'phone_number',
            'role',
        ];
        $userData = array_intersect_key($validatedData, array_flip($userDataKeys));
        if ($request->filled('password')) {
            $userData['password'] = bcrypt($validatedData['password']);
        }

        if ($request->hasFile('foto')) {
            // Delete the old photo
            if ($user->foto && Storage::exists($user->foto)) {
                Storage::delete($user->foto);
            }

            // Store the new photo
            $userData['foto'] = $request->file('foto')->store('ppls-image');
        }

        $user->update($userData);

        // Update PPL data
        $pplDataKeys = [
            'nip',
            'account_id',
            'bpp_id',
            'name',
            'employee_status',
            'front_title',
            'back_title',
            'place_of_birth',
            'date_of_birth',
            'gender',
            'religion',
            'areas_of_expertise',
            'last_education',
            'field_of_education',
            'major',
            'school_name',
            'work_location',
            'date_sk',
            'date_spmt',
            'position',
            'address',
            'provinsi',
            'regency',
            'post_code',
            'phone_number',
            'email',
        ];
        $pplData = array_intersect_key($validatedData, array_flip($pplDataKeys));
        $ppl->update($pplData);

        // menyimpan wilayah binaan
        $pplById = Ppl::with('villages')->find($pplData['nip']);
        $villages = $validatedData['villages'];
        $pplById->villages()->sync($villages); // simpan relasi many to many

        // return response()->json(['message' => 'User and PPL data updated successfully']);
        return redirect()->route('ppl.index')->with('success', 'PPL updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ppl = Ppl::where('nip', $id)->firstOrFail();
        $user = User::where('id', $ppl->account_id)->firstOrFail();

        // Delete the photo
        if ($user->foto && Storage::exists($user->foto)) {
            Storage::delete($user->foto);
        }

        $user->delete();
        $ppl->delete();

        // return response()->json(['message' => 'User and PPL data deleted successfully']);
        return redirect()->route('ppl.index')->with('success', 'PPL deleted successfully.');
    }
}
