<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LayerGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('layer_grups')->insert([
            // [
            //     'id' => 1,
            //     'name' => 'Kewilayahan',
            //     'status' => 'ACTIVE',
            //     'description' => 'Deskripsi mengenai kewilayahn.',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            [
                'id' => 2,
                'name' => 'Kelembagaan Pertanian',
                'status' => 'ACTIVE',
                'description' => 'Deskripsi mengenai kelembagaan pertanian.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Lahan',
                'status' => 'ACTIVE',
                'description' => 'Deskripsi mengenai lahan pertanian.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'Komoditas Lahan',
                'status' => 'ACTIVE',
                'description' => 'Deskripsi mengenai komoditas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'Data Spasial',
                'status' => 'ACTIVE',
                'description' => 'Deskripsi mengenai spasial.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
