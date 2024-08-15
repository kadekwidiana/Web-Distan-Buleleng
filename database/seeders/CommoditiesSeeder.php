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
                'icon' => 'master-data-commodity-icon/sayur.png',
                'description' => 'Deskripsi mengenai sayuran.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Kopi',
                'icon' => 'master-data-commodity-icon/kopi.png',
                'description' => 'Deskripsi mengenai kopi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Tebu',
                'icon' => 'master-data-commodity-icon/tebu.png',
                'description' => 'Deskripsi mengenai tepu.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Kedelai',
                'icon' => 'master-data-commodity-icon/kedelai.png',
                'description' => 'Deskripsi mengenai kedelai.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Kacang',
                'icon' => 'master-data-commodity-icon/kacang.png',
                'description' => 'Deskripsi mengenai kacang.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'type_agriculture_id' => 2, // Pertanian Perkebunan
                'name' => 'Cabai',
                'icon' => 'master-data-commodity-icon/cabai.png',
                'description' => 'Deskripsi mengenai cabai.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'type_agriculture_id' => 3, // Pertanian Tanaman Pangan
                'name' => 'Padi',
                'icon' => 'master-data-commodity-icon/padi.png',
                'description' => 'Deskripsi mengenai tanaman padi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'type_agriculture_id' => 3, // Pertanian Tanaman Pangan
                'name' => 'Jagung',
                'icon' => 'master-data-commodity-icon/jagung.png',
                'description' => 'Deskripsi mengenai tanaman jagung.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'type_agriculture_id' => 1, // Pertanian Hortikultura
                'name' => 'Buah',
                'icon' => 'master-data-commodity-icon/buah.png',
                'description' => 'Deskripsi mengenai buah.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('commodities')->insert($data);
    }
}
