<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'nik' => '1234567890123456',
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'foto' => null, // Sesuaikan dengan path foto jika ada
                'address' => 'Alamat Admin',
                'phone_number' => '081234567890',
                'role' => 'ADMIN',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // Encrypt password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'nik' => '1234567890123457',
                'name' => 'PPL 1',
                'email' => 'ppl1@gmail.com',
                'foto' => null, // Sesuaikan dengan path foto jika ada
                'address' => 'Alamat PPL 1',
                'phone_number' => '081234567891',
                'role' => 'PPL',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // Encrypt password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'nik' => '1234567890123458',
                'name' => 'PPL 3',
                'email' => 'ppl3@gmail.com',
                'foto' => null, // Sesuaikan dengan path foto jika ada
                'address' => 'Alamat PPL 3',
                'phone_number' => '081234567892',
                'role' => 'PPL',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // Encrypt password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'nik' => '1234567890123463',
                'name' => 'I Made Wardana',
                'email' => 'made.wardana@gmail.com',
                'foto' => null, // Sesuaikan dengan path foto jika ada
                'address' => 'Jl. Sudirman No.5, Singaraja',
                'phone_number' => '081234567897',
                'role' => 'LAND_OWNER_CULTIVATOR',
                'email_verified_at' => now(),
                'password' => null,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'nik' => '1234567890123464',
                'name' => 'Ni Ketut Purnami',
                'email' => 'ketut.purnami@gmail.com',
                'foto' => null, // Sesuaikan dengan path foto jika ada
                'address' => 'Jl. Veteran No.6, Singaraja',
                'phone_number' => '081234567898',
                'role' => 'LAND_OWNER_CULTIVATOR',
                'email_verified_at' => now(),
                'password' => null,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
