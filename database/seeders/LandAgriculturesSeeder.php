<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LandAgriculturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data land agricultures
        $data = [
            [
                'id' => 1,
                'poktan_id' => 1,
                'subak_id' => 1,
                'type_land_agriculture_id' => 1,
                'layer_group_id' => 1,
                'owner' => 'I Ketut Sudiana',
                'location' => json_encode([-8.1501923615788, 115.10028998387088]),
                'address' => 'Jl. Raya Pertanian No.1, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode([[[115.10001, -8.150321], [115.100082, -8.150111], [115.100576, -8.150195], [115.100446, -8.15045], [115.10001, -8.150321]]]),
                'land_area' => '200',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => '/assets/images/gapoktan/lahan-1.jpg',
                'description' => 'Lahan ini digunakan untuk budidaya padi dengan sistem irigasi tradisional.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'poktan_id' => 2,
                'subak_id' => 1,
                'type_land_agriculture_id' => 2,
                'layer_group_id' => 1,
                'owner' => 'I Made Suwardana',
                'location' => json_encode([-8.15750846905577, 115.1020437383925]),
                'address' => 'Jl. Raya Pertanian No.2, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode([[[115.101806, -8.157462], [115.102213, -8.15741], [115.102266, -8.157752], [115.101837, -8.157782], [115.101806, -8.157462]]]),
                'land_area' => '150',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => '/assets/images/gapoktan/lahan-1.jpg',
                'description' => 'Lahan ini digunakan untuk budidaya sayuran dengan metode pertanian organik.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'poktan_id' => 1,
                'subak_id' => 2,
                'type_land_agriculture_id' => 1,
                'layer_group_id' => 1,
                'owner' => 'I Nyoman Suwartika',
                'location' => json_encode([-8.150564370273274, 115.09603086574704]),
                'address' => 'Jl. Raya Pertanian No.3, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode([[[115.095841, -8.150521], [115.096338, -8.15056], [115.096313, -8.150784], [115.095839, -8.150799], [115.095841, -8.150521]]]),
                'land_area' => '300',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => '/assets/images/gapoktan/lahan-1.jpg',
                'description' => 'Lahan ini digunakan untuk budidaya tanaman hortikultura.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'poktan_id' => 2,
                'subak_id' => 2,
                'type_land_agriculture_id' => 2,
                'layer_group_id' => 1,
                'owner' => 'I Wayan Sudarta',
                'location' => json_encode([-8.1762321339242, 115.10705446559706]),
                'address' => 'Jl. Raya Pertanian No.4, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode([[[115.106872, -8.176132], [115.107318, -8.176172], [115.107291, -8.176444], [115.10689, -8.17644], [115.106872, -8.176132]]]),
                'land_area' => '250',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => '/assets/images/gapoktan/lahan-1.jpg',
                'description' => 'Lahan ini digunakan untuk budidaya kopi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'poktan_id' => 1,
                'subak_id' => 1,
                'type_land_agriculture_id' => 1,
                'layer_group_id' => 1,
                'owner' => 'I Gusti Putu Arta',
                'location' => json_encode([-8.191855181906336, 115.10943456118594]),
                'address' => 'Jl. Raya Pertanian No.5, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode([[[115.109269, -8.191792], [115.109685, -8.191839], [115.109627, -8.19213], [115.109183, -8.192078], [115.109269, -8.191792]]]),
                'land_area' => '400',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => '/assets/images/gapoktan/lahan-1.jpg',
                'description' => 'Lahan ini digunakan untuk budidaya tanaman perkebunan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('land_agricultures')->insert($data);
    }
}
