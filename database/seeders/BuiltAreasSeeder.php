<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BuiltAreasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'village_id' => '5108050010', // Sambangan
                'ppl_nip' => '197001011990031001', // First PPL
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'village_id' => '5108050010', // Sambangan
                'ppl_nip' => '197502051995032001', // Second PPL
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'village_id' => '5108050011', // Panji
                'ppl_nip' => '197001011990031001', // First PPL
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'village_id' => '5108050003', // Ambengan
                'ppl_nip' => '197502051995032001', // Second PPL
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the built_areas table
        DB::table('built_areas')->insert($data);
    }
}
