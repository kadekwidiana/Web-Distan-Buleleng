<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeAgriculturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data yang sesuai dengan layer_grups
        $data = [
            [
                "id" => 1,
                'layer_group_id' => 4,
                'name' => 'Hortikultura',
                'description' => 'Deskripsi mengenai pertanian hortikultura.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                "id" => 2,
                'layer_group_id' => 4,
                'name' => 'Perkebunan',
                'description' => 'Deskripsi mengenai pertanian perkebunan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                "id" => 3,
                'layer_group_id' => 4,
                'name' => 'Tanaman Pangan',
                'description' => 'Deskripsi mengenai pertanian tanaman pangan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke dalam tabel
        DB::table('type_agricultures')->insert($data);
    }
}
