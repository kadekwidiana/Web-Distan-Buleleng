<?php

use App\Http\Controllers\API\InformationAgricultureController;
use App\Http\Controllers\API\MasterData\DistrictController;
use App\Http\Controllers\API\MasterData\RegencyController;
use App\Http\Controllers\API\MasterData\VillageController;
use App\Http\Controllers\Backpage\ManagementReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// // LAYERS
// Route::get('/data-layer', [LayerController::class, 'dataLayer'])->name('dataLayer');

// // EXTERNAL REQUEST
// Route::post('/precipitation', [AnalisisGeospasial::class, 'precipitation'])->name('precipitation');
// Route::post('/vci', [AnalisisGeospasial::class, 'vci'])->name('vci');
// Route::post('/evi', [AnalisisGeospasial::class, 'evi'])->name('evi');

// // DATA PENYULUH
// Route::resource('ppl', PPLController::class);

// Route::get('/management-report/penyuluhan', [ManagementReportController::class, 'outreachActivity'])->name('managementReport.outreachActivity');
// Route::get('/management-report/lahan-pertanian', [ManagementReportController::class, 'landAgricultureReport'])->name('managementReport.landAgricultureReport');

// // komoditas
// Route::resource('/master-data/kecamatan', DistrictController::class);
// Route::post('/master-data/kecamatan/{id}/update', [DistrictController::class, 'update'])->name('kecamatan.update');

Route::prefix('/v1/protect')->middleware(['validate.api.key'])->group(function () {
    // test call
    Route::get('/', function () {
        return response()->json(['message' => 'You have access']);
    });
    // information agriculture region
    Route::get('/information-agriculture-regions', [InformationAgricultureController::class, 'index'])->name('information-agriculture.index');
    // management report
    Route::get('/management-report/outreach-activities', [ManagementReportController::class, 'outreachActivity'])->name('managementReport.outreachActivity');
    Route::get('/management-report/land-agricultures', [ManagementReportController::class, 'landAgricultureReport'])->name('managementReport.landAgricultureReport');
    // kabupeten
    Route::resource('/master-data/regencies', RegencyController::class);
    // kecamatan
    Route::resource('/master-data/districts', DistrictController::class);
    // desa
    Route::resource('/master-data/villages', VillageController::class);
});
