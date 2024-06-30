<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PoktanCommoditiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'commodity_id' => 1,
                'poktan_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'commodity_id' => 2,
                'poktan_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'commodity_id' => 3,
                'poktan_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'commodity_id' => 4,
                'poktan_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'commodity_id' => 5,
                'poktan_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'commodity_id' => 6,
                'poktan_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'commodity_id' => 7,
                'poktan_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'commodity_id' => 8,
                'poktan_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'commodity_id' => 9,
                'poktan_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'commodity_id' => 1,
                'poktan_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the poktan_commodities table
        DB::table('poktan_commodities')->insert($data);
    }
}
