<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Bpp;
use Illuminate\Http\Request;

class BPPController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $districtId = $request->district_id;
            $perpage = $request->perpage ?? 10;
            $search = $request->search;

            $bppsQuery = Bpp::with(['district', 'ppls'])->latest();

            if ($districtId) {
                $bppsQuery->where('district_id', $districtId);
            }

            if ($search) {
                $bppsQuery->where('name', 'like', '%' . $search . '%');
            }

            $bpps = $bppsQuery->paginate($perpage);

            return response()->json($bpps);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
