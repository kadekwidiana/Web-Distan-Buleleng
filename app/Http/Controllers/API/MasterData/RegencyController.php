<?php

namespace App\Http\Controllers\API\MasterData;

use App\Http\Controllers\Controller;
use App\Models\Regency;
use Illuminate\Http\Request;

class RegencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perpage = $request->perpage ?? 10;
            $search = $request->search;
            $provinceId = $request->province_id ?? 51; // default bali

            $regenciesQuery = Regency::with(['province']); // Assuming a 'province' relation exists

            if ($provinceId) {
                $regenciesQuery->where('province_id', $provinceId);
            }

            if ($search) {
                $regenciesQuery->where('name', 'like', '%' . $search . '%');
            }

            $regencies = $regenciesQuery->paginate($perpage);

            return response()->json($regencies);
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
