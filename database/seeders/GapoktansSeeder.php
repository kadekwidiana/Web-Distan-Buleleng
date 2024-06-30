<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GapoktansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data gapoktans
        $data = [
            [
                'id' => 1,
                'village_id' => '5108050010',
                'layer_group_id' => 5,
                'name' => 'Gapoktan Tani Makmur',
                'leader' => 'I Made Sujana',
                'secretary' => 'I Nyoman Budiarsa',
                'treasurer' => 'I Ketut Sudarma',
                'number_of_members' => 25,
                'since' => '2010',
                'location' => json_encode([-8.154773334511463, 115.10177896068797]),
                'address' => 'Jl. Raya Sambangan No.12, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/gapoktan.png',
                'photo' => '/assets/images/gapoktan/gapoktan-1.jpg',
                'confirmation_sk' => 'SK Bupati',
                'confirmation_sk_no' => '123/SK/2021',
                'business_unit' => json_encode(['Pupuk', 'Pestisida']),
                'farming_business' => 'Padi',
                'business_process' => 'Pengolahan Padi',
                'tools_and_machines' => json_encode(['Traktor', 'Mesin Pemotong']),
                'description' => 'Gapoktan Tani Makmur merupakan kelompok tani yang berfokus pada pengolahan padi.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'village_id' => '5108050010',
                'layer_group_id' => 5,
                'name' => 'Gapoktan Subur Sejahtera',
                'leader' => 'I Putu Wibawa',
                'secretary' => 'I Made Sutrisna',
                'treasurer' => 'I Kadek Sudarma',
                'number_of_members' => 30,
                'since' => '2012',
                'location' => json_encode([-8.173648189982888, 115.1067379424944]),
                'address' => 'Jl. Raya Sambangan No.15, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'icon' => '/assets/icons/icon-layer/gapoktan.png',
                'photo' => '/assets/images/gapoktan/gapoktan-1.jpg',
                'confirmation_sk' => 'SK Bupati',
                'confirmation_sk_no' => '124/SK/2021',
                'business_unit' => json_encode(['Pupuk Organik', 'Benih']),
                'farming_business' => 'Jagung',
                'business_process' => 'Pengolahan Jagung',
                'tools_and_machines' => json_encode(['Traktor', 'Mesin Penggiling']),
                'description' => 'Gapoktan Subur Sejahtera merupakan kelompok tani yang berfokus pada pengolahan jagung.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('gapoktans')->insert($data);
    }
}
