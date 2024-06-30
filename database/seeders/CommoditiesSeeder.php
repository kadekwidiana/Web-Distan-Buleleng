<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommoditiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data komoditas terkait dengan type_agriculture_id yang sesuai
        $data = [
            [
                'id' => 1,
                'type_agriculture_id' => 1, // Pertanian Hortikultura
                'name' => 'Sayuran',
                'icon' => '/assets/icons/icon-layer/sayur.png',
                'description' => 'Deskripsi mengenai sayuran.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Kopi',
                'icon' => '/assets/icons/icon-layer/kopi.png',
                'description' => 'Deskripsi mengenai kopi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Tebu',
                'icon' => '/assets/icons/icon-layer/tebu.png',
                'description' => 'Deskripsi mengenai tepu.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Kedelai',
                'icon' => '/assets/icons/icon-layer/kedelai.png',
                'description' => 'Deskripsi mengenai kedelai.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Kacang',
                'icon' => '/assets/icons/icon-layer/kacang.png',
                'description' => 'Deskripsi mengenai kacang.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Cabai',
                'icon' => '/assets/icons/icon-layer/cabai.png',
                'description' => 'Deskripsi mengenai cabai.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'type_agriculture_id' => 3, // Pertanian Tanaman Pangan
                'name' => 'Padi',
                'icon' => '/assets/icons/icon-layer/padi.png',
                'description' => 'Deskripsi mengenai tanaman padi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'type_agriculture_id' => 3, // Pertanian Tanaman Pangan
                'name' => 'Jagung',
                'icon' => '/assets/icons/icon-layer/jagung.png',
                'description' => 'Deskripsi mengenai tanaman jagung.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'type_agriculture_id' => 1, // Pertanian Hortikultura
                'name' => 'Buah',
                'icon' => '/assets/icons/icon-layer/buah.png',
                'description' => 'Deskripsi mengenai buah.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('commodities')->insert($data);
    }
}
