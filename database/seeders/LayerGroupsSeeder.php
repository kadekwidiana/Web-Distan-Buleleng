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
            [
                'id' => 1,
                'name' => 'Kewilayahan',
                'description' => 'Deskripsi mengenai kewilayahn.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Pertanian',
                'description' => 'Deskripsi mengenai pertanian.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Komoditas',
                'description' => 'Deskripsi mengenai komoditas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'Data Spasial',
                'description' => 'Deskripsi mengenai spasial.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
