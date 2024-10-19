<?php

use App\Http\Controllers\Backpage\BPPController;
use App\Http\Controllers\Backpage\DashboardController;
use App\Http\Controllers\Backpage\DataSpatialController;
use App\Http\Controllers\Backpage\GapoktanController;
use App\Http\Controllers\Backpage\LandAgricultureController;
use App\Http\Controllers\Backpage\MasterData\CommodityController;
use App\Http\Controllers\Backpage\MasterData\LayerGroupController;
use App\Http\Controllers\Backpage\MasterData\TypeAgricultureController;
use App\Http\Controllers\Backpage\MasterData\TypeLandAgricultureController;
use App\Http\Controllers\Backpage\OutreachActivitiesController;
use App\Http\Controllers\Backpage\LandOwnerOrCultivatorController;
use App\Http\Controllers\Backpage\ManagementReportController;
use App\Http\Controllers\Backpage\PoktanController;
use App\Http\Controllers\Backpage\PPLController;
use App\Http\Controllers\Backpage\SubakController;
use App\Http\Controllers\ExternalRequest\AnalisisGeospasial;
use App\Http\Controllers\Frontpage\LayerController;
use App\Http\Controllers\Frontpage\MapsController;
use App\Http\Controllers\Frontpage\TestDataController;
use App\Http\Controllers\ProfileController;
use App\Models\OutreachActivities;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Frontpage/Home/Index');
})->name('landing-page');

Route::get('/maps', [MapsController::class, 'index'])->name('maps-frontpage');

// Route::get('/test-page', [TestDataController::class, 'testPage'])->name('test-page');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('index.dashboard');
    Route::get('/setting', function () {
        return Inertia::render('Backpage/Setting/Index', [
            'navName' => 'Pengaturan',
        ]);
    })->name('setting-page');
    /*
    |--------------------------------------------------------------------------
    | START ROUTE GAPOKTAN
    |--------------------------------------------------------------------------
    */
    // back to list gapoktan
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/back', [GapoktanController::class, 'backNav'])->name('gapoktans.back');
    // R gapoktan
    Route::get('/kelembagaan-pertanian/gapoktan', [GapoktanController::class, 'gapoktanRegency'])->name('list-gapoktan-regency');
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}', [GapoktanController::class, 'gapoktanDistrict'])->name('gapoktans.district');
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/{gapoktanId}/detail', [GapoktanController::class, 'show'])->name('gapoktans.detail');
    // C gapoktan
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/create-step-one', [GapoktanController::class, 'createStepOne'])->name('gapoktans.create.step.one');
    Route::post('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/create-step-one', [GapoktanController::class, 'storeStepOne'])->name('gapoktans.store.step.one');
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/create-step-two', [GapoktanController::class, 'createStepTwo'])->name('gapoktans.create.step.two');
    Route::post('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/create-step-two', [GapoktanController::class, 'storeStepTwo'])->name('gapoktans.store.step.two');
    // U gapoktan
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/{gapoktanId}/edit-step-one', [GapoktanController::class, 'editStepOne'])->name('gapoktans.edit.step.one');
    Route::post('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/{gapoktanId}/edit-step-one', [GapoktanController::class, 'updateStepOne'])->name('gapoktans.update.step.one');
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/{gapoktanId}/edit-step-two', [GapoktanController::class, 'editStepTwo'])->name('gapoktans.edit.step.two');
    Route::post('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/{gapoktanId}/edit-step-two', [GapoktanController::class, 'updateStepTwo'])->name('gapoktans.update.step.two');
    // D gapoktan
    Route::delete('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}/{gapoktanId}/delete', [GapoktanController::class, 'destroy'])->name('gapoktans.delete');
    /*
    |--------------------------------------------------------------------------
    | END ROUTE GAPOKTAN
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | START ROUTE POKTAN
    |--------------------------------------------------------------------------
    */
    // back to list poktan
    Route::get('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/back', [PoktanController::class, 'backNav'])->name('poktans.back');
    // R poktan
    Route::get('/kelembagaan-pertanian/poktan', [PoktanController::class, 'poktanRegency'])->name('poktans.regency');
    Route::get('/kelembagaan-pertanian/poktan/kecamatan/{districtId}', [PoktanController::class, 'poktanDistrict'])->name('poktans.district');
    Route::get('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/{poktanId}/detail', [PoktanController::class, 'show'])->name('poktans.detail');
    // C gapoktan
    Route::get('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/create-step-one', [PoktanController::class, 'createStepOne'])->name('poktans.create.step.one');
    Route::post('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/create-step-one', [PoktanController::class, 'storeStepOne'])->name('poktans.store.step.one');
    Route::get('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/create-step-two', [PoktanController::class, 'createStepTwo'])->name('poktans.create.step.two');
    Route::post('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/create-step-two', [PoktanController::class, 'storeStepTwo'])->name('poktans.store.step.two');
    // U gapoktan
    Route::get('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/{poktanId}/edit-step-one', [PoktanController::class, 'editStepOne'])->name('poktans.edit.step.one');
    Route::post('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/{poktanId}/edit-step-one', [PoktanController::class, 'updateStepOne'])->name('poktans.update.step.one');
    Route::get('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/{poktanId}/edit-step-two', [PoktanController::class, 'editStepTwo'])->name('poktans.edit.step.two');
    Route::post('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/{poktanId}/edit-step-two', [PoktanController::class, 'updateStepTwo'])->name('poktans.update.step.two');
    // D poktan
    Route::delete('/kelembagaan-pertanian/poktan/kecamatan/{districtId}/{poktanId}/delete', [PoktanController::class, 'destroy'])->name('poktans.delete');
    /*
    |--------------------------------------------------------------------------
    | END ROUTE GAPOKTAN
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | START ROUTE SUBAK
    |--------------------------------------------------------------------------
    */
    // back to list subak
    Route::get('/kelembagaan-pertanian/subak/kecamatan/{districtId}/back', [SubakController::class, 'backNav'])->name('subaks.back');
    // R subak
    Route::get('/kelembagaan-pertanian/subak', [SubakController::class, 'subakRegency'])->name('subaks.regency');
    Route::get('/kelembagaan-pertanian/subak/kecamatan/{districtId}', [SubakController::class, 'subakDistrict'])->name('subaks.district');
    Route::get('/kelembagaan-pertanian/subak/kecamatan/{districtId}/{subakId}/detail', [SubakController::class, 'show'])->name('subaks.detail');
    // C subak
    Route::get('/kelembagaan-pertanian/subak/kecamatan/{districtId}/create-step-one', [SubakController::class, 'createStepOne'])->name('subaks.create.step.one');
    Route::post('/kelembagaan-pertanian/subak/kecamatan/{districtId}/create-step-one', [SubakController::class, 'storeStepOne'])->name('subaks.store.step.one');
    Route::get('/kelembagaan-pertanian/subak/kecamatan/{districtId}/create-step-two', [SubakController::class, 'createStepTwo'])->name('subaks.create.step.two');
    Route::post('/kelembagaan-pertanian/subak/kecamatan/{districtId}/create-step-two', [SubakController::class, 'storeStepTwo'])->name('subaks.store.step.two');
    // U subak
    Route::get('/kelembagaan-pertanian/subak/kecamatan/{districtId}/{subakId}/edit-step-one', [SubakController::class, 'editStepOne'])->name('subaks.edit.step.one');
    Route::post('/kelembagaan-pertanian/subak/kecamatan/{districtId}/{subakId}/edit-step-one', [SubakController::class, 'updateStepOne'])->name('subaks.update.step.one');
    Route::get('/kelembagaan-pertanian/subak/kecamatan/{districtId}/{subakId}/edit-step-two', [SubakController::class, 'editStepTwo'])->name('subaks.edit.step.two');
    Route::post('/kelembagaan-pertanian/subak/kecamatan/{districtId}/{subakId}/edit-step-two', [SubakController::class, 'updateStepTwo'])->name('subaks.update.step.two');
    // D subak
    Route::delete('/kelembagaan-pertanian/subak/kecamatan/{districtId}/{subakId}/delete', [SubakController::class, 'destroy'])->name('subaks.delete');
    /*
    |--------------------------------------------------------------------------
    | END ROUTE SUBAK
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | START ROUTE LAND AGRICULTURE
    |--------------------------------------------------------------------------
    */
    // back to list land agriculture
    Route::get('/lahan_pertanian/kecamatan/{districtId}/back', [LandAgricultureController::class, 'backNav'])->name('landAgricultures.back');
    // R land agriculture
    Route::get('/lahan_pertanian', [LandAgricultureController::class, 'landAgricultureRegency'])->name('landAgricultures.regency');
    Route::get('/lahan_pertanian/kecamatan/{districtId}', [LandAgricultureController::class, 'landAgricultureDistrict'])->name('landAgricultures.district');
    Route::get('/lahan_pertanian/kecamatan/{districtId}/{landAgricultureId}/detail', [LandAgricultureController::class, 'show'])->name('landAgricultures.detail');
    // C land agriculture
    Route::get('/lahan_pertanian/kecamatan/{districtId}/create-step-one', [LandAgricultureController::class, 'createStepOne'])->name('landAgricultures.create.step.one');
    Route::post('/lahan_pertanian/kecamatan/{districtId}/create-step-one', [LandAgricultureController::class, 'storeStepOne'])->name('landAgricultures.store.step.one');
    Route::get('/lahan_pertanian/kecamatan/{districtId}/create-step-two', [LandAgricultureController::class, 'createStepTwo'])->name('landAgricultures.create.step.two');
    Route::post('/lahan_pertanian/kecamatan/{districtId}/create-step-two', [LandAgricultureController::class, 'storeStepTwo'])->name('landAgricultures.store.step.two');
    // U land agriculture
    Route::get('/lahan_pertanian/kecamatan/{districtId}/{landAgricultureId}/edit-step-one', [LandAgricultureController::class, 'editStepOne'])->name('landAgricultures.edit.step.one');
    Route::post('/lahan_pertanian/kecamatan/{districtId}/{landAgricultureId}/edit-step-one', [LandAgricultureController::class, 'updateStepOne'])->name('landAgricultures.update.step.one');
    Route::get('/lahan_pertanian/kecamatan/{districtId}/{landAgricultureId}/edit-step-two', [LandAgricultureController::class, 'editStepTwo'])->name('landAgricultures.edit.step.two');
    Route::post('/lahan_pertanian/kecamatan/{districtId}/{landAgricultureId}/edit-step-two', [LandAgricultureController::class, 'updateStepTwo'])->name('landAgricultures.update.step.two');
    // D land agriculture
    Route::delete('/lahan_pertanian/kecamatan/{districtId}/{landAgricultureId}/delete', [LandAgricultureController::class, 'destroy'])->name('landAgricultures.delete');
    /*
    |--------------------------------------------------------------------------
    | END ROUTE LAND AGRICULTURE
    |--------------------------------------------------------------------------
    */
    // Route untuk store data owner
    // Route::post('/owner', [LandOwnerOrCultivatorController::class, 'store'])->name('owner.store');

    // KEGIATAN PENYULUHAN
    Route::get('/penyuluhan', [OutreachActivitiesController::class, 'outreachActivitiesRegency'])->name('outreachActivities.regency');
    Route::get('/penyuluhan/kecamatan/{districtId}', [OutreachActivitiesController::class, 'outreachActivitiesDistrict'])->name('outreachActivities.district');
    Route::get('/penyuluhan/kecamatan/{districtId}/{id}/detail', [OutreachActivitiesController::class, 'show'])->name('outreachActivities.detail');
    // C 
    Route::get('/penyuluhan/kecamatan/{districtId}/create', [OutreachActivitiesController::class, 'create'])->name('outreachActivities.create');
    Route::post('/penyuluhan/kecamatan/{districtId}/create', [OutreachActivitiesController::class, 'store'])->name('outreachActivities.store');
    // U 
    Route::get('/penyuluhan/kecamatan/{districtId}/{id}/edit', [OutreachActivitiesController::class, 'edit'])->name('outreachActivities.edit');
    Route::post('/penyuluhan/kecamatan/{districtId}/{id}/edit', [OutreachActivitiesController::class, 'update'])->name('outreachActivities.update');
    // D 
    Route::delete('/penyuluhan/kecamatan/{districtId}/{id}/delete', [OutreachActivitiesController::class, 'destroy'])->name('outreachActivities.delete');

    // pemilik/penggarap
    Route::resource('/pemilik-penggarap', LandOwnerOrCultivatorController::class);
    Route::post('/pemilik-penggarap/{id}/update', [LandOwnerOrCultivatorController::class, 'update'])->name('pemilik-penggarap.update');

    Route::group(['middleware' => 'checkRole:ADMIN'], function () {
        // DATA PENYULUH
        Route::resource('ppl', PPLController::class);

        // DATA SPASIAL
        Route::resource('data-spasial', DataSpatialController::class);
        Route::post('/data-spasial/{id}/update', [DataSpatialController::class, 'update'])->name('data-spasial.update'); //pake ini karena resource tidak bisa up file (i don't no what this problem #males-ngulik, intinya apa guyss?? ya benar... intinya bisa...)

        // BPP
        Route::resource('/bpp', BPPController::class);
        Route::post('/bpp/{id}/update', [BPPController::class, 'update'])->name('bpp-custom.update');

        // MASTER DATA
        // komoditas
        Route::resource('/master-data/komoditas', CommodityController::class);
        Route::post('/master-data/komoditas/{id}/update', [CommodityController::class, 'update'])->name('komoditas.update');
        // layer group
        Route::resource('/master-data/layer-grup', LayerGroupController::class);
        Route::post('/master-data/layer-grup/{id}/update', [LayerGroupController::class, 'update'])->name('layer-group.update');
        // jenis pertanian
        Route::resource('/master-data/jenis-pertanian', TypeAgricultureController::class);
        Route::post('/master-data/jenis-pertanian/{id}/update', [TypeAgricultureController::class, 'update'])->name('jenis-pertanian.update');
        // jenis lahan pertanian
        Route::resource('/master-data/jenis-lahan-pertanian', TypeLandAgricultureController::class);
        Route::post('/master-data/jenis-lahan-pertanian/{id}/update', [TypeLandAgricultureController::class, 'update'])->name('jenis-lahan-pertanian.update');
        // management report
        Route::get('/management-report/penyuluhan', [ManagementReportController::class, 'outreachActivityView'])->name('managementReport.outreachActivityView');
        Route::get('/management-report/penyuluhan/data', [ManagementReportController::class, 'outreachActivity'])->name('managementReport.outreachActivity');
        Route::get('/management-report/lahan-pertanian', [ManagementReportController::class, 'landAgricultureReportView'])->name('managementReport.landAgricultureReportView');
        Route::get('/management-report/lahan-pertanian/data', [ManagementReportController::class, 'landAgricultureReport'])->name('managementReport.landAgricultureReport');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/{userId}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// LAYERS
Route::get('/data-layer', [LayerController::class, 'dataLayer'])->name('dataLayer');

// EXTERNAL REQUEST
Route::post('/precipitation', [AnalisisGeospasial::class, 'precipitation'])->name('precipitation');
Route::post('/vci', [AnalisisGeospasial::class, 'vci'])->name('vci');
Route::post('/evi', [AnalisisGeospasial::class, 'evi'])->name('evi');

Route::get('/about', function () {
    return view('about');
});

// Catch-all route to handle 404 errors
Route::fallback(function () {
    return Inertia::render('Error/ErrorPage', ['status' => 404])
        ->toResponse(request())
        ->setStatusCode(404);
});
