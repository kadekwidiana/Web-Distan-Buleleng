<?php

use App\Http\Controllers\Backpage\GapoktanController;
use App\Http\Controllers\Backpage\PoktanController;
use App\Http\Controllers\Backpage\SubakController;
use App\Http\Controllers\ExternalRequest\AnalisisGeospasial;
use App\Http\Controllers\Frontpage\LayerController;
use App\Http\Controllers\Frontpage\MapsController;
use App\Http\Controllers\Frontpage\TestDataController;
use App\Http\Controllers\ProfileController;
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

// Route::get('/maps', function () {
//     return Inertia::render('Frontpage/Maps/Index');
// })->name('maps-frontpage');

Route::get('/maps', [MapsController::class, 'index'])->name('maps-frontpage');

Route::get('/test-page', [TestDataController::class, 'testPage'])->name('test-page');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Backpage/Dashboard/Index');
    })->name('index.dashboard');

    Route::get('/ppl', function () {
        return Inertia::render('Backpage/PPL/Index');
    })->name('index.ppl');

    Route::get('/ppl/input', function () {
        return Inertia::render('Backpage/PPL/Input');
    })->name('input.ppl');

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
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
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
