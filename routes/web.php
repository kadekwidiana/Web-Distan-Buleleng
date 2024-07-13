<?php

use App\Http\Controllers\Backpage\GapoktanController;
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

    // R gapoktan
    Route::get('/kelembagaan-pertanian/gapoktan', [GapoktanController::class, 'gapoktanRegency'])->name('list-gapoktan-regency');
    Route::get('/kelembagaan-pertanian/gapoktan/kecamatan/{districtId}', [GapoktanController::class, 'gapoktanDistrict'])->name('gapoktans.district');
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
