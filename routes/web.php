<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\MeasurmentController;
use App\Http\Controllers\Admin\PartController;
use App\Http\Controllers\Admin\TypeController;
use App\Http\Controllers\Frontend\PagesController;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Route;

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
    return view('frontend.index');
})->name('homepage');

Auth::routes();

Route::get('/admin/dashboard', [App\Http\Controllers\HomeController::class, 'index'])->name('admin.dashborad');

Route::get('about-us', [PagesController::class, 'about'])->name('about');

Route::group(['prefix' => 'admin', 'middleware' => ['auth']], function(){
    Route::group(['prefix' => 'customers'], function(){
        Route::get('/', [CustomerController::class, 'index'])->name('admin.customers');
        Route::post('/store', [CustomerController::class, 'store'])->name('admin.customer.store');
        Route::post('/update', [CustomerController::class, 'update'])->name('admin.customer.update');
        Route::get('delete/{id}', [CustomerController::class, 'destroy'])->name('admin.customer.destroy');
    });
    Route::group(['prefix' => 'types'], function(){
        Route::get('/', [TypeController::class, 'index'])->name('admin.types');
        Route::post('/store', [TypeController::class, 'store'])->name('admin.type.store');
        Route::post('/update', [TypeController::class, 'update'])->name('admin.type.update');
        Route::get('delete/{id}', [TypeController::class, 'destroy'])->name('admin.type.destroy');
    });
    Route::group(['prefix' => 'parts'], function(){
        Route::get('/', [PartController::class, 'index'])->name('admin.parts');
        Route::post('/store', [PartController::class, 'store'])->name('admin.part.store');
        Route::post('/update', [PartController::class, 'update'])->name('admin.part.update');
        Route::get('delete/{id}', [PartController::class, 'destroy'])->name('admin.part.destroy');
    });
    Route::group(['prefix' => 'measurments'], function(){
        Route::get('/{id}', [MeasurmentController::class, 'index'])->name('admin.measurment');
        Route::post('type-parts', [MeasurmentController::class, 'PartsById'])->name('admin.parts.by.id');
        Route::post('store', [MeasurmentController::class, 'store'])->name('admin.measurment.store');
    });

});
