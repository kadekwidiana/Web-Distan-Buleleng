<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GapoktanOutreachActivitiesSeeder extends Seeder
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
                'outreach_activities_id' => 1,
                'gapoktan_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'outreach_activities_id' => 2,
                'gapoktan_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'outreach_activities_id' => 3,
                'gapoktan_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'outreach_activities_id' => 4,
                'gapoktan_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'outreach_activities_id' => 5,
                'gapoktan_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the gapoktan_outreach_activities table
        DB::table('gapoktan_outreach_activities')->insert($data);
    }
}
