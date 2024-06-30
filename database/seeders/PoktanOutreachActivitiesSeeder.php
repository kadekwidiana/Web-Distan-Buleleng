<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PoktanOutreachActivitiesSeeder extends Seeder
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
                'outreach_activity_id' => 6,
                'poktan_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'outreach_activity_id' => 7,
                'poktan_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'outreach_activity_id' => 8,
                'poktan_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'outreach_activity_id' => 9,
                'poktan_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'outreach_activity_id' => 10,
                'poktan_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the poktan_outreach_activities table
        DB::table('poktan_outreach_activities')->insert($data);
    }
}
