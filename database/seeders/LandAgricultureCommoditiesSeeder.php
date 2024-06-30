<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LandAgricultureCommoditiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'commodity_id' => 7,
                'land_agriculture_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'commodity_id' => 8,
                'land_agriculture_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'commodity_id' => 9,
                'land_agriculture_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'commodity_id' => 1,
                'land_agriculture_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'commodity_id' => 2,
                'land_agriculture_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'commodity_id' => 3,
                'land_agriculture_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'commodity_id' => 4,
                'land_agriculture_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'commodity_id' => 5,
                'land_agriculture_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'commodity_id' => 6,
                'land_agriculture_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'commodity_id' => 7,
                'land_agriculture_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the land_agriculture_commodities table
        DB::table('land_agriculture_commodities')->insert($data);
    }
}
