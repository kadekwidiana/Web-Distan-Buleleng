<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('bpps')->insert([
            [
                'district_id' => '5108050', // Ganti sesuai dengan ID district yang ada
                'layer_group_id' => 2, // Ganti sesuai dengan ID layer group yang ada
                'name' => 'Balai Penyuluh Pertanian Sukasada',
                'location' => json_encode([-8.154773334511463, 115.10177896068797]),
                'address' => 'Jl. Raya Sambangan No.15, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'phone_number' => '081234567890',
                'email' => 'bpp.sukasada@example.com',
                'leader' => 'I Ketut Sudiarsa',
                'secretary' => 'I Made Wijaya',
                'treasurer' => 'I Nyoman Sudarta',
                'number_of_members' => 15,
                'since' => '2015',
                'status' => 'ACTIVE',
                'photo' => json_encode([
                    '/assets/images/gapoktan/gapoktan-1.jpg',
                    '/assets/images/gapoktan/gapoktan-2.jpg',
                    '/assets/images/gapoktan/gapoktan-3.jpg'
                ]),
                'description' => 'Balai Penyuluh Pertanian yang terletak di Kecamatan Sukasada, Buleleng.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'district_id' => '5108050', // Ganti sesuai dengan ID district yang ada
                'layer_group_id' => 2, // Ganti sesuai dengan ID layer group yang ada
                'name' => 'Balai Penyuluh Pertanian Buleleng',
                'location' => json_encode([-8.173648189982888, 115.1067379424944]),
                'address' => 'Jl. Raya Sambangan No.15, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'phone_number' => '081298765432',
                'email' => 'bpp.buleleng@example.com',
                'leader' => 'I Ketut Sudiarsa',
                'secretary' => 'I Made Wijaya',
                'treasurer' => 'I Nyoman Sudarta',
                'number_of_members' => 15,
                'since' => '2015',
                'status' => 'ACTIVE',
                'photo' => json_encode([
                    '/assets/images/gapoktan/gapoktan-1.jpg',
                    '/assets/images/gapoktan/gapoktan-2.jpg',
                    '/assets/images/gapoktan/gapoktan-3.jpg'
                ]),
                'description' => 'Balai Penyuluh Pertanian yang terletak di Kecamatan Sukasada, Buleleng.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
