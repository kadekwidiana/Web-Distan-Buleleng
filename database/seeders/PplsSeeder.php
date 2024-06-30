<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PplsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data PPLs
        $data = [
            [
                'nip' => '197001011990031001',
                'account_id' => 2,
                'name' => 'I Made Sudiana',
                'front_title' => 'Dr.',
                'back_title' => 'M.Pd',
                'place_of_birth' => 'Denpasar',
                'date_of_birth' => '1970-01-01',
                'gender' => 'Laki-laki',
                'religion' => 'Hindu',
                'areas_of_expertise' => 'Agriculture',
                'last_education' => 'S3',
                'field_of_education' => 'Agronomy',
                'major' => 'Plant Science',
                'school_name' => 'Universitas Udayana',
                'work_location' => 'Dinas Pertanian Denpasar',
                'date_sk' => '1990-03-01',
                'date_spmt' => '1990-03-15',
                'position' => 'PPL Senior',
                'home_address' => 'Jl. Gatot Subroto No. 1, Denpasar',
                'provinsi' => 'Bali',
                'regency' => 'Denpasar',
                'post_code' => '8011',
                'no_telepon' => '081234567890',
                'email' => 'made.sudiana@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nip' => '197502051995032001',
                'account_id' => 3,
                'name' => 'Ni Luh Putu Wulandari',
                'front_title' => 'Ir.',
                'back_title' => 'M.Si',
                'place_of_birth' => 'Singaraja',
                'date_of_birth' => '1975-02-05',
                'gender' => 'Perempuan',
                'religion' => 'Hindu',
                'areas_of_expertise' => 'Agriculture',
                'last_education' => 'S2',
                'field_of_education' => 'Soil Science',
                'major' => 'Soil Management',
                'school_name' => 'Institut Pertanian Bogor',
                'work_location' => 'Dinas Pertanian Singaraja',
                'date_sk' => '1995-03-02',
                'date_spmt' => '1995-03-20',
                'position' => 'PPL Junior',
                'home_address' => 'Jl. Gajah Mada No. 2, Singaraja',
                'provinsi' => 'Bali',
                'regency' => 'Buleleng',
                'post_code' => '8111',
                'no_telepon' => '081234567891',
                'email' => 'luh.wulandari@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('ppls')->insert($data);
    }
}
