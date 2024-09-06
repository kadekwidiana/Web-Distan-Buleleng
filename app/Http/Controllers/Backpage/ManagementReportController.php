<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\LandAgriculture;
use App\Models\OutreachActivities;
use App\Models\Poktan;
use App\Models\Ppl;
use App\Models\Subak;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class ManagementReportController extends Controller
{
    public function outreachActivity(Request $request)
    {
        try {
            // Ambil input filter dari request
            $startDate = $request->input('start_date');
            $endDate = $request->input('end_date');
            $pplId = $request->input('ppl_nip');
            $villageId = $request->input('village_id');
            $districtId = $request->input('district_id');

            // Query dasar
            $outreachActivityQuery = OutreachActivities::query();

            // Filter berdasarkan district_id melalui hubungan dengan village
            if ($districtId) {
                $outreachActivityQuery->whereHas('village', function ($query) use ($districtId) {
                    $query->where('district_id', $districtId);
                });
            }

            // Filter berdasarkan village_id
            if ($villageId) {
                $outreachActivityQuery->where('village_id', $villageId);
            }

            // Filter berdasarkan rentang tanggal
            if ($startDate && $endDate) {
                if ($startDate == $endDate) {
                    $outreachActivityQuery->whereDate('created_at', $startDate);
                } else {
                    $outreachActivityQuery->whereBetween('created_at', [$startDate, $endDate]);
                }
            }

            // Filter berdasarkan PPL
            if ($pplId) {
                $outreachActivityQuery->where('ppl_nip', $pplId);
            }

            // Ambil data yang sudah difilter
            $datas = $outreachActivityQuery->with(['village', 'ppl', 'gapoktanOutreachActivities', 'poktanOutreachActivities', 'subakOutreachActivities'])->get();

            // Cek apakah data ditemukan
            if ($datas->isEmpty()) {
                return response()->json([
                    'message' => 'Data tidak ditemukan untuk filter yang diberikan.',
                    'data' => []
                ], 404);
            }

            // Map data untuk format yang diinginkan
            $dataOutreachActivities = $datas->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'title' => $activity->title,
                    'ppl_name' => $activity->ppl->front_title . ' ' . $activity->ppl->name . ' ' . $activity->ppl->back_title . ' (' . $activity->ppl->nip . ')' ?? null,
                    'district' => $activity->village->district->name === 'BATI - BATI'
                        ? 'SUKASADA'
                        : $activity->village->district->name ?? null,
                    'village' => $activity->village->name ?? null,
                    'address' => $activity->address,
                    'notes' => $activity->notes,
                    'activity_report' => $activity->activity_report,
                    'gapoktans' => $activity->gapoktanOutreachActivities->pluck('name')->implode(', '),
                    'poktans' => $activity->poktanOutreachActivities->pluck('name')->implode(', '),
                    'subaks' => $activity->subakOutreachActivities->pluck('name')->implode(', '),
                    'others_involved' => $activity->others_involved,
                    'created_at' => $activity->created_at,
                    'updated_at' => $activity->updated_at,
                ];
            });

            return response()->json($dataOutreachActivities, 200);
        } catch (\Exception $e) {
            // Tangani jika terjadi error
            return response()->json([
                'message' => 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function outreachActivityView()
    {
        // Get all districts in Buleleng
        $districts = District::where('regency_id', 5108)->get();

        // Get all villages in Buleleng by filtering based on the district IDs
        $villageIds = $districts->pluck('id'); // Get the IDs of the districts
        $villages = Village::whereIn('district_id', $villageIds)->get(); // Get the villages that belong to these districts

        // Get all PPLs
        $ppls = Ppl::all();

        return Inertia::render('Backpage/ManagementReport/OutreachActivity/Index', [
            'navName' => 'Management Laporan Kegiatan Penyuluhan',
            'ppls' => $ppls,
            'districts' => $districts,
            'villages' => $villages,
        ]);
    }


    public function landAgricultureReportView()
    {
        // Get all districts in Buleleng
        $districts = District::where('regency_id', 5108)->get();

        // Get all villages in Buleleng by filtering based on the district IDs
        $villageIds = $districts->pluck('id'); // Get the IDs of the districts
        $villages = Village::whereIn('district_id', $villageIds)->get(); // Get the villages that belong to these districts

        // Get all PPLs
        $ppls = Ppl::all();
        $poktans = Poktan::all();
        $subaks = Subak::all();

        return Inertia::render('Backpage/ManagementReport/LandAgriculture/Index', [
            'navName' => 'Management Laporan Lahan Pertanian',
            'ppls' => $ppls,
            'districts' => $districts,
            'villages' => $villages,
            'poktans' => $poktans,
            'subaks' => $subaks,
        ]);
    }

    public function landAgricultureReport()
    {
        try {
            // Mengambil filter dari request
            $villageId = request()->input('village_id');
            $districtId = request()->input('district_id');
            $poktanId = request()->input('poktan_id');
            $subakId = request()->input('subak_id');

            // Mengambil data lahan pertanian beserta komoditas dan relasi terkait
            $landAgricultureQuery = LandAgriculture::with(['commodities', 'village.district', 'owner', 'cultivator', 'poktan', 'subak']);

            // Filter berdasarkan village_id jika disediakan
            if ($villageId) {
                $landAgricultureQuery->where('village_id', $villageId);
            }

            // Filter berdasarkan district_id jika disediakan
            if ($districtId) {
                $landAgricultureQuery->whereHas('village.district', function ($query) use ($districtId) {
                    $query->where('id', $districtId);
                });
            }

            // Filter berdasarkan poktan_id jika disediakan
            if ($poktanId) {
                $landAgricultureQuery->where('poktan_id', $poktanId);
            }

            // Filter berdasarkan subak_id jika disediakan
            if ($subakId) {
                $landAgricultureQuery->where('subak_id', $subakId);
            }

            // Mengambil semua data yang sesuai dengan filter
            $landAgricultureQuery = $landAgricultureQuery->get();

            // Mengecek apakah data ada atau tidak
            if ($landAgricultureQuery->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data lahan pertanian tidak ditemukan untuk filter yang diberikan.'
                ], 404); // Kembalikan status 404 jika data kosong
            }

            // Menghitung total luas lahan (land_area)
            $totalLandArea = $landAgricultureQuery->sum('land_area');

            // Mapping data untuk ditampilkan
            $landAgricultureReports = $landAgricultureQuery->map(function ($land) {
                return [
                    'pemilik' => $land->owner->name,
                    'penggarap' => $land->cultivator->name,
                    'alamat' => $land->address,
                    'poktan' => $land->poktan->name, // Nama poktan
                    'subak' => $land->subak->name, // Nama subak
                    'komoditas' => $land->commodities->map(function ($commodity) {
                        return $commodity->name; // Mengambil nama komoditas
                    })->implode(', '), // Gabungkan komoditas dengan koma
                    'siklus_komoditas' => collect(json_decode($land->commodities_cycle))->map(function ($cycle) {
                        $months = implode(',', $cycle->months); // Gabungkan bulan dengan koma
                        return "{$cycle->name} bulan: {$months}"; // Format nama komoditas dan bulan
                    })->implode(', '), // Gabungkan siklus komoditas dengan koma
                    'luas_lahan' => $land->land_area . ' are',
                    'data_dibuat' => $land->created_at, // Format tanggal dibuat
                    'data_diubah' => $land->updated_at  // Format tanggal diubah
                ];
            });

            // Mengembalikan respons JSON dengan data, total luas lahan, dan status sukses
            return response()->json([
                'success' => true,
                'total_luas_lahan' => $totalLandArea . ' are', // Total luas lahan
                'data' => $landAgricultureReports
            ], 200);
        } catch (\Exception $e) {
            // Jika terjadi error, tangkap dan kembalikan respons error
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil laporan lahan pertanian.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
