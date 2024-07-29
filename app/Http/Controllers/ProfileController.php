<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'navName' => 'Profil Pengguna'
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $user = User::findOrFail($request->userId);

        // dd($request);

        $validatedData = $request->validate([
            'nik' => 'required|string|size:16|unique:users,nik,' . $user->id,
            'name' => 'required|max:20',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'foto' => 'nullable',
            'address' => 'required',
            'phone_number' => 'required',
            'role' => 'required',
        ], [
            'nik.required' => 'NIK harus diisi.',
            'nik.size' => 'NIK harus terdiri dari 16 karakter.',
            'nik.unique' => 'NIK sudah digunakan.',
            'name.required' => 'Nama harus diisi.',
            'name.max' => 'Nama tidak boleh lebih dari 20 karakter.',
            'email.required' => 'Email harus diisi.',
            'email.email' => 'Email tidak valid.',
            'email.unique' => 'Email sudah digunakan.',
            'address.required' => 'Alamat harus diisi.',
            'phone_number.required' => 'Nomor telepon harus diisi.',
            'role.required' => 'Peran harus diisi.',
        ]);

        if ($request->file('foto')) {
            if ($user->foto) {
                Storage::delete($user->foto);
            }
            $validatedData['foto'] = $request->file('foto')->store('users-image');
        }

        $user->update($validatedData);

        return Redirect::route('profile.edit')->with('status', 'Profil berhasil diperbarui.');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
