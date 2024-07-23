<?php

/*
 * This file is part of the IndoRegion package.
 *
 * (c) Azis Hapidin <azishapidin.com | azishapidin@gmail.com>
 *
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CoreDatasSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(FarmersSeeder::class);
        $this->call(GapoktansSeeder::class);
        $this->call(PoktansSeeder::class);
        $this->call(SubaksSeeder::class);
        $this->call(LandAgriculturesSeeder::class);
        $this->call(DataSpatialsSeeder::class);
        $this->call(PplsSeeder::class);
        $this->call(BuiltAreasSeeder::class);
        $this->call(OutreachActivitiesSeeder::class);
        // bridge
        $this->call(GapoktanOutreachActivitiesSeeder::class);
        $this->call(PoktanOutreachActivitiesSeeder::class);
        $this->call(SubakOutreachActivitiesSeeder::class);
        $this->call(PoktanCommoditiesSeeder::class);
        $this->call(SubakCommoditiesSeeder::class);
        $this->call(LandAgricultureCommoditiesSeeder::class);
    }
}
