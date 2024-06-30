<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubakCommoditiesSeeder extends Seeder
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
                'subak_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'commodity_id' => 8,
                'subak_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'commodity_id' => 9,
                'subak_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'commodity_id' => 1,
                'subak_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'commodity_id' => 2,
                'subak_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'commodity_id' => 3,
                'subak_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'commodity_id' => 4,
                'subak_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'commodity_id' => 5,
                'subak_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'commodity_id' => 6,
                'subak_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'commodity_id' => 7,
                'subak_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the subak_commodities table
        DB::table('subak_commodities')->insert($data);
    }
}
