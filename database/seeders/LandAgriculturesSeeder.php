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
                'layer_group_id' => 2,
                'owner' => 'I Ketut Sudiana',
                'location' => json_encode([-8.1501923615788, 115.10028998387088]),
                'address' => 'Jl. Raya Pertanian No.1, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode(
                    [
                        "type" => "FeatureCollection",
                        "features" => [
                            [
                                "type" => "Feature",
                                "properties" => [],
                                "geometry" => [
                                    "coordinates" => [[[115.100156, -8.150097], [115.100437, -8.150041], [115.100462, -8.150276], [115.100398, -8.150329], [115.100296, -8.15035], [115.100252, -8.150337], [115.100207, -8.150282], [115.10017, -8.150184], [115.100156, -8.150097]]],
                                    "type" => "Polygon"
                                ]
                            ]
                        ]
                    ]
                ),
                'land_area' => '200',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => json_encode(['/assets/images/lahan/lahan-1.jpg', '/assets/images/lahan/lahan-2.jpg', '/assets/images/lahan/lahan-3.jpg']),
                'description' => 'Lahan ini digunakan untuk budidaya padi dengan sistem irigasi tradisional.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'poktan_id' => 2,
                'subak_id' => 1,
                'type_land_agriculture_id' => 2,
                'layer_group_id' => 2,
                'owner' => 'I Made Suwardana',
                'location' => json_encode([-8.15750846905577, 115.1020437383925]),
                'address' => 'Jl. Raya Pertanian No.2, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode(
                    [
                        "type" => "FeatureCollection",
                        "features" => [
                            [
                                "type" => "Feature",
                                "properties" => [],
                                "geometry" => [
                                    "coordinates" => [[[115.101671, -8.157338], [115.102224, -8.15686], [115.102546, -8.15741], [115.102315, -8.15793], [115.101797, -8.157981], [115.101585, -8.1578], [115.101671, -8.157338]]],
                                    "type" => "Polygon"
                                ]
                            ]
                        ]
                    ]
                ),
                'land_area' => '150',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => json_encode(['/assets/images/lahan/lahan-1.jpg', '/assets/images/lahan/lahan-2.jpg', '/assets/images/lahan/lahan-3.jpg']),
                'description' => 'Lahan ini digunakan untuk budidaya sayuran dengan metode pertanian organik.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'poktan_id' => 1,
                'subak_id' => 2,
                'type_land_agriculture_id' => 1,
                'layer_group_id' => 2,
                'owner' => 'I Nyoman Suwartika',
                'location' => json_encode([-8.150564370273274, 115.09603086574704]),
                'address' => 'Jl. Raya Pertanian No.3, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode(
                    [
                        "type" => "FeatureCollection",
                        "features" => [
                            [
                                "type" => "Feature",
                                "properties" => [],
                                "geometry" => [
                                    "coordinates" => [[[115.095189, -8.149831], [115.097025, -8.149757], [115.096821, -8.151031], [115.095404, -8.150861], [115.095114, -8.150362], [115.095189, -8.149831]]],
                                    "type" => "Polygon"
                                ]
                            ]
                        ]
                    ]
                ),
                'land_area' => '300',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => json_encode(['/assets/images/lahan/lahan-1.jpg', '/assets/images/lahan/lahan-2.jpg', '/assets/images/lahan/lahan-3.jpg']),
                'description' => 'Lahan ini digunakan untuk budidaya tanaman hortikultura.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'poktan_id' => 2,
                'subak_id' => 2,
                'type_land_agriculture_id' => 2,
                'layer_group_id' => 2,
                'owner' => 'I Wayan Sudarta',
                'location' => json_encode([-8.1762321339242, 115.10705446559706]),
                'address' => 'Jl. Raya Pertanian No.4, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode(
                    [
                        "type" => "FeatureCollection",
                        "features" => [
                            [
                                "type" => "Feature",
                                "properties" => [],
                                "geometry" => [
                                    "coordinates" => [[[115.106957, -8.176257], [115.106977, -8.176084], [115.10718, -8.176096], [115.107295, -8.176101], [115.107243, -8.176353], [115.106972, -8.17632], [115.106957, -8.176257]]],
                                    "type" => "Polygon"
                                ]
                            ]
                        ]
                    ]
                ),
                'land_area' => '250',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => json_encode(['/assets/images/lahan/lahan-1.jpg', '/assets/images/lahan/lahan-2.jpg', '/assets/images/lahan/lahan-3.jpg']),
                'description' => 'Lahan ini digunakan untuk budidaya kopi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'poktan_id' => 1,
                'subak_id' => 1,
                'type_land_agriculture_id' => 1,
                'layer_group_id' => 2,
                'owner' => 'I Gusti Putu Arta',
                'location' => json_encode([-8.191855181906336, 115.10943456118594]),
                'address' => 'Jl. Raya Pertanian No.5, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'area_json' => json_encode(
                    [
                        "type" => "FeatureCollection",
                        "features" => [
                            [
                                "type" => "Feature",
                                "properties" => [],
                                "geometry" => [
                                    "coordinates" => [[[115.109217, -8.191695], [115.109602, -8.191606], [115.109653, -8.192057], [115.109304, -8.192114], [115.109127, -8.192033], [115.109079, -8.191712], [115.109217, -8.191695]]],
                                    "type" => "Polygon"
                                ]
                            ]
                        ]
                    ]
                ),
                'land_area' => '400',
                'is_active' => true,
                'icon' => '/assets/icons/icon-layer/lahan-pertanian.png',
                'photo' => json_encode(['/assets/images/lahan/lahan-1.jpg', '/assets/images/lahan/lahan-2.jpg', '/assets/images/lahan/lahan-3.jpg']),
                'description' => 'Lahan ini digunakan untuk budidaya tanaman perkebunan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('land_agricultures')->insert($data);
    }
}
