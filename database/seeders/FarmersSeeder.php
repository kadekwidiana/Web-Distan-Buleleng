<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FarmersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'nik' => '5101010101010001',
                'name' => 'I Ketut Sudiana',
                'foto' => '/photos/ketut_sudiana.jpg',
                'address' => 'Jalan Ahmad Yani, Singaraja',
                'phone_number' => '081234567890',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'nik' => '5101010101010002',
                'name' => 'I Nyoman Widiarta',
                'foto' => '/photos/nyoman_widiarta.jpg',
                'address' => 'Jalan Dewi Sartika, Singaraja',
                'phone_number' => '081234567891',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'nik' => '5101010101010003',
                'name' => 'Ni Luh Ayu Suryani',
                'foto' => '/photos/luh_ayu_suryani.jpg',
                'address' => 'Jalan Ngurah Rai, Singaraja',
                'phone_number' => '081234567892',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'nik' => '5101010101010004',
                'name' => 'I Made Suarnata',
                'foto' => '/photos/made_suarnata.jpg',
                'address' => 'Jalan Kartini, Singaraja',
                'phone_number' => '081234567893',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'nik' => '5101010101010005',
                'name' => 'Ni Ketut Astuti',
                'foto' => '/photos/ketut_astuti.jpg',
                'address' => 'Jalan Surapati, Singaraja',
                'phone_number' => '081234567894',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('farmers')->insert($data);
    }
}
