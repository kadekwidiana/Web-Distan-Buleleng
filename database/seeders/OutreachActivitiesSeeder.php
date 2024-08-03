<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OutreachActivitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'village_id' => 5108050010,
                'title' => 'Pertemuan Masyarakat Desa Sambangan',
                'location' => json_encode([-8.1501923615788, 115.10028998387088]),
                'address' => 'Jl. Raya Pertanian No.1, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/pertemuan-1.jpg',
                'file' => '/assets/files/outreach/report-1.pdf',
                'notes' => 'Pertemuan ini membahas tentang peningkatan infrastruktur irigasi.',
                'activity_report' => 'Hasil pertemuan akan disampaikan ke pemerintah setempat.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'village_id' => 5108050010,
                'title' => 'Pelatihan Pertanian Organik',
                'location' => json_encode([-8.15750846905577, 115.1020437383925]),
                'address' => 'Jl. Raya Pertanian No.2, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/pelatihan-1.jpg',
                'file' => '/assets/files/outreach/report-2.pdf',
                'notes' => 'Pelatihan ini dihadiri oleh petani dari Desa Panji.',
                'activity_report' => 'Petani yang mengikuti pelatihan mengapresiasi metode baru ini.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'village_id' => 5108050010,
                'title' => 'Kunjungan Lapangan ke Lahan Budidaya Hortikultura',
                'location' => json_encode([-8.150564370273274, 115.09603086574704]),
                'address' => 'Jl. Raya Pertanian No.3, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/kunjungan-1.jpg',
                'file' => '/assets/files/outreach/report-3.pdf',
                'notes' => 'Kunjungan ini bertujuan untuk mempelajari sistem irigasi yang digunakan.',
                'activity_report' => 'Hasil kunjungan ini akan dijadikan referensi bagi petani lokal.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'village_id' => 5108050010,
                'title' => 'Pelatihan Pemeliharaan Tanaman Kopi',
                'location' => json_encode([-8.1762321339242, 115.10705446559706]),
                'address' => 'Jl. Raya Pertanian No.4, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/pelatihan-2.jpg',
                'file' => '/assets/files/outreach/report-4.pdf',
                'notes' => 'Pelatihan ini difokuskan pada teknik pemupukan yang efektif.',
                'activity_report' => 'Petani kopi merespon positif terhadap teknik baru ini.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'village_id' => 5108050010,
                'title' => 'Diskusi Lingkungan Hidup Desa Sambangan',
                'location' => json_encode([-8.191855181906336, 115.10943456118594]),
                'address' => 'Jl. Raya Pertanian No.5, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/diskusi-1.jpg',
                'file' => '/assets/files/outreach/report-5.pdf',
                'notes' => 'Diskusi ini mengangkat isu pengelolaan limbah pertanian secara berkelanjutan.',
                'activity_report' => 'Pemerintah setempat akan mengambil langkah-langkah konkret setelah diskusi ini.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'village_id' => 5108050010,
                'title' => 'Pelatihan Penggunaan Teknologi Irigasi Modern',
                'location' => json_encode([-8.1501923615788, 115.10028998387088]),
                'address' => 'Jl. Raya Pertanian No.1, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/pelatihan-3.jpg',
                'file' => '/assets/files/outreach/report-6.pdf',
                'notes' => 'Pelatihan ini menitikberatkan pada efisiensi penggunaan air.',
                'activity_report' => 'Peserta pelatihan merasa terbantu dengan teknologi baru ini.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'village_id' => 5108050010,
                'title' => 'Kampanye Penanaman Pohon',
                'location' => json_encode([-8.15750846905577, 115.1020437383925]),
                'address' => 'Jl. Raya Pertanian No.2, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/kampanye-1.jpg',
                'file' => '/assets/files/outreach/report-7.pdf',
                'notes' => 'Kampanye ini bertujuan untuk meningkatkan kesadaran lingkungan.',
                'activity_report' => 'Sejumlah pohon berhasil ditanam di sekitar lahan pertanian.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'village_id' => 5108050010,
                'title' => 'Pelatihan Pemanfaatan Pupuk Organik',
                'location' => json_encode([-8.150564370273274, 115.09603086574704]),
                'address' => 'Jl. Raya Pertanian No.3, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/pelatihan-4.jpg',
                'file' => '/assets/files/outreach/report-8.pdf',
                'notes' => 'Pelatihan ini memberikan panduan praktis dalam pembuatan pupuk organik.',
                'activity_report' => 'Petani merespon positif dan mulai menerapkan teknik baru ini di lahan mereka.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'village_id' => 5108050010,
                'title' => 'Diskusi Penyuluhan Pertanian Berkelanjutan',
                'location' => json_encode([-8.1762321339242, 115.10705446559706]),
                'address' => 'Jl. Raya Pertanian No.4, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/diskusi-2.jpg',
                'file' => '/assets/files/outreach/report-9.pdf',
                'notes' => 'Diskusi ini membahas tentang teknik tanam yang ramah lingkungan.',
                'activity_report' => 'Petani mengapresiasi informasi yang didapatkan dari diskusi ini.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'village_id' => 5108050010,
                'title' => 'Pelatihan Pemeliharaan Tanaman Hortikultura',
                'location' => json_encode([-8.191855181906336, 115.10943456118594]),
                'address' => 'Jl. Raya Pertanian No.5, Sambangan, Kec. Sukasada, Kab. Buleleng',
                'photo' => '/assets/images/outreach/pelatihan-5.jpg',
                'file' => '/assets/files/outreach/report-10.pdf',
                'notes' => 'Pelatihan ini memberikan teknik dalam pemangkasan tanaman hortikultura.',
                'activity_report' => 'Hasil pelatihan ini berhasil meningkatkan kualitas hasil panen.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the outreach_activities table
        DB::table('outreach_activities')->insert($data);
    }
}
