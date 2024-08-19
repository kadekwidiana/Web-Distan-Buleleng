<?php

namespace App\Http\Controllers\Backpage;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\OutreachActivities;
use App\Models\Ppl;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
