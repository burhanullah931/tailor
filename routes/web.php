<?php

use App\Http\Controllers\Admin\CustomerController;
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
});
