<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeLandAgriculturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data jenis lahan pertanian
        $data = [
            [
                'id' => 1,
                'layer_group_id' => 3, // ID dari layer grup yang sesuai
                'name' => 'Lahan Basah',
                'description' => 'Deskripsi mengenai lahan basah.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'layer_group_id' => 3, // ID dari layer grup yang sesuai
                'name' => 'Lahan Kering',
                'description' => 'Deskripsi mengenai lahan kering.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'layer_group_id' => 3, // ID dari layer grup yang sesuai
                'name' => 'Campuran',
                'description' => 'Deskripsi mengenai lahan campuran.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'layer_group_id' => 3, // ID dari layer grup yang sesuai
                'name' => 'Lahan Tropis',
                'description' => 'Deskripsi mengenai lahan tropis.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'layer_group_id' => 3, // ID dari layer grup yang sesuai
                'name' => 'Lahan Gersang',
                'description' => 'Deskripsi mengenai lahan gersang.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('type_land_agricultures')->insert($data);
    }
}
