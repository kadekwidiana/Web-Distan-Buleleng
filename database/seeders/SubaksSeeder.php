<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubaksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data subaks
        $data = [
            [
                'id' => 1,
                'village_id' => '5108050010',
                'layer_group_id' => 5,
                'name' => 'Subak Sari',
                'leader' => 'I Ketut Sudiarsa',
                'secretary' => 'I Made Wijaya',
                'treasurer' => 'I Nyoman Sudarta',
                'number_of_members' => 25,
                'since' => '2010',
                'location' => json_encode([-8.15362919556026, 115.10103340911172]),
                'address' => 'Jl. Raya Sambangan No.20, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/subak.png',
                'photo' => '/assets/images/gapoktan/subak-1.jpg',
                'description' => 'Subak Sari adalah organisasi pengelola irigasi tradisional di Sambangan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'village_id' => '5108050010',
                'layer_group_id' => 5,
                'name' => 'Subak Mekar',
                'leader' => 'I Gusti Ngurah Putra',
                'secretary' => 'I Putu Adnyana',
                'treasurer' => 'I Made Suwandi',
                'number_of_members' => 30,
                'since' => '2012',
                'location' => json_encode([-8.137863332697915, 115.09236483616944]),
                'address' => 'Jl. Raya Sambangan No.25, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/subak.png',
                'photo' => '/assets/images/gapoktan/subak-1.jpg',
                'description' => 'Subak Mekar berfokus pada pengelolaan irigasi dan pertanian berkelanjutan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'village_id' => '5108050010',
                'layer_group_id' => 5,
                'name' => 'Subak Jaya',
                'leader' => 'I Nyoman Budiasa',
                'secretary' => 'I Ketut Wijaya',
                'treasurer' => 'I Wayan Suardana',
                'number_of_members' => 28,
                'since' => '2014',
                'location' => json_encode([-8.177926811350167, 115.10688233774879]),
                'address' => 'Jl. Raya Sambangan No.30, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/subak.png',
                'photo' => '/assets/images/gapoktan/subak-1.jpg',
                'description' => 'Subak Jaya berkomitmen pada peningkatan hasil pertanian melalui manajemen air yang efektif.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'village_id' => '5108050010',
                'layer_group_id' => 5,
                'name' => 'Subak Maju',
                'leader' => 'I Made Sudarma',
                'secretary' => 'I Ketut Sujana',
                'treasurer' => 'I Nyoman Wijaya',
                'number_of_members' => 32,
                'since' => '2016',
                'location' => json_encode([-8.191280410466735, 115.10981516625868]),
                'address' => 'Jl. Raya Sambangan No.35, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/subak.png',
                'photo' => '/assets/images/gapoktan/subak-1.jpg',
                'description' => 'Subak Maju mendukung pertanian berkelanjutan melalui pengelolaan irigasi yang inovatif.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('subaks')->insert($data);
    }
}
