<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataSpatialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data spatials
        $data = [
            [
                'id' => 1,
                'layer_group_id' => 5, // Data Spasial
                'name' => 'Batas Kabupaten',
                'url' => '/data-spatial-file/batas-kabupaten-buleleng.geojson',
                'file' => '/data-spatial-file/batas-kabupaten-buleleng.geojson',
                'type' => 'geojson',
                'status' => 'ACTIVE',
                'color' => '#000000',
                'description' => 'Batas wilayah Kabupaten Buleleng',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'layer_group_id' => 5, // Data Spasial
                'name' => 'Batas Kecamatan',
                'url' => '/data-spatial-file/batas-kecamatan-buleleng.geojson',
                'file' => '/data-spatial-file/batas-kecamatan-buleleng.geojson',
                'type' => 'geojson',
                'status' => 'ACTIVE',
                'color' => '#000000',
                'description' => 'Batas wilayah Kecamatan di Buleleng',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'layer_group_id' => 5, // Data Spasial
                'name' => 'Batas Desa',
                'url' => '/data-spatial-file/batas-desa-buleleng.geojson',
                'file' => '/data-spatial-file/batas-desa-buleleng.geojson',
                'type' => 'geojson',
                'status' => 'ACTIVE',
                'color' => '#000000',
                'description' => 'Batas wilayah Desa di Buleleng',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('data_spatials')->insert($data);
    }
}
