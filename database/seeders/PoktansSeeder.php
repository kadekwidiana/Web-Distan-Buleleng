<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PoktansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data poktans
        $data = [
            [
                'id' => 1,
                'village_id' => '5108050010',
                'gapoktan_id' => 1, // Sesuaikan dengan ID Gapoktan yang sesuai
                'layer_group_id' => 2,
                'name' => 'Poktan Tani Sejahtera',
                'leader' => 'I Ketut Sudiarsa',
                'secretary' => 'I Made Wijaya',
                'treasurer' => 'I Nyoman Sudarta',
                'number_of_members' => 15,
                'since' => '2015',
                'location' => json_encode([-8.15362919556026, 115.10103340911172]),
                'address' => 'Jl. Raya Sambangan No.20, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/poktan.png',
                'photo' => '/assets/images/gapoktan/poktan-1.jpg',
                'description' => 'Poktan Tani Sejahtera berfokus pada budidaya padi organik.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'village_id' => '5108050010',
                'gapoktan_id' => 2, // Sesuaikan dengan ID Gapoktan yang sesuai
                'layer_group_id' => 2,
                'name' => 'Poktan Makmur Jaya',
                'leader' => 'I Gusti Ngurah Putra',
                'secretary' => 'I Putu Adnyana',
                'treasurer' => 'I Made Suwandi',
                'number_of_members' => 20,
                'since' => '2016',
                'location' => json_encode([-8.137863332697915, 115.09236483616944]),
                'address' => 'Jl. Raya Sambangan No.25, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/poktan.png',
                'photo' => '/assets/images/gapoktan/poktan-1.jpg',
                'description' => 'Poktan Makmur Jaya berfokus pada budidaya tanaman hortikultura.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'village_id' => '5108050010',
                'gapoktan_id' => 1, // Sesuaikan dengan ID Gapoktan yang sesuai
                'layer_group_id' => 2,
                'name' => 'Poktan Sumber Rejeki',
                'leader' => 'I Nyoman Budiasa',
                'secretary' => 'I Ketut Wijaya',
                'treasurer' => 'I Wayan Suardana',
                'number_of_members' => 18,
                'since' => '2017',
                'location' => json_encode([-8.177926811350167, 115.10688233774879]),
                'address' => 'Jl. Raya Sambangan No.30, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/poktan.png',
                'photo' => '/assets/images/gapoktan/poktan-1.jpg',
                'description' => 'Poktan Sumber Rejeki berfokus pada budidaya sayuran organik.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'village_id' => '5108050010',
                'gapoktan_id' => 2, // Sesuaikan dengan ID Gapoktan yang sesuai
                'layer_group_id' => 2,
                'name' => 'Poktan Karya Tani',
                'leader' => 'I Made Sudarma',
                'secretary' => 'I Ketut Sujana',
                'treasurer' => 'I Nyoman Wijaya',
                'number_of_members' => 22,
                'since' => '2018',
                'location' => json_encode([-8.191280410466735, 115.10981516625868]),
                'address' => 'Jl. Raya Sambangan No.35, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/poktan.png',
                'photo' => '/assets/images/gapoktan/poktan-1.jpg',
                'description' => 'Poktan Karya Tani berfokus pada budidaya tanaman perkebunan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('poktans')->insert($data);
    }
}
