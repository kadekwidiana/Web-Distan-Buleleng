<?php

/*
 * This file is part of the IndoRegion package.
 *
 * (c) Azis Hapidin <azishapidin.com | azishapidin@gmail.com>
 *
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MasterDatasSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(LayerGroupsSeeder::class);
        $this->call(TypeAgriculturesSeeder::class);
        $this->call(CommoditiesSeeder::class);
        $this->call(TypeLandAgriculturesSeeder::class);
    }
}
