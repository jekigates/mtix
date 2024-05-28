<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieShowtimeController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\Setting;
use App\Http\Controllers\TheaterController;
use App\Http\Controllers\TheaterProductController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/upcoming', 'upcoming')->name('upcoming');
    Route::get('/select-city', 'selectCity')->name('select.city');
});

Route::get('/theaters',[TheaterController::class, 'index'])->name('theaters.index');
Route::get('/theaters/{theater}', [TheaterController::class, 'show'])->name('theaters.show');
Route::get('/theaters/{theater}/products', [TheaterProductController::class, 'index'])->name('theaters.products.index');

Route::get('/movies/{movie}', [MovieController::class, 'show'])->name('movies.show');
Route::get('/movies/{movie}/showtimes', [MovieShowtimeController::class, 'index'])->name('movies.showtimes.index');

Route::get('/infos', [InfoController::class, 'index'])->name('infos.index');
Route::get('/infos/{info}', [InfoController::class, 'show'])->name('infos.show');

Route::get('/promos', [PromoController::class, 'index'])->name('promos.index');
Route::get('/promos/{id}', [PromoController::class, 'show'])->name('promos.show');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/select-role', [HomeController::class, 'selectRole'])->name('dashboard');

    Route::prefix('settings')->name('settings.')->group(function () {
        Route::permanentRedirect('', 'profile');

        Route::prefix('profile')->controller(Setting\ProfileController::class)->name('profile.')->group(function () {
            Route::get('', 'edit')->name('edit');
            Route::patch('', 'update')->name('update');
        });

        Route::prefix('account')->controller(Setting\AccountController::class)->name('account.')->group(function () {
            Route::get('', 'edit')->name('edit');
            Route::patch('', 'update')->name('update');
        });

        Route::get('security', [Setting\SecurityController::class, 'edit'])->name('security.edit');
    });

    Route::middleware('role:admin')->name('admin.')->group(function () {
        Route::get('/admin', [Admin\HomeController::class, 'index'])->name('home');
        // Route::get('/admin/products', [Admin\ProductController::class, 'index'])->name('products.index');
        // Route::get('/admin/products/create', [Admin\ProductController::class, 'create'])->name('products.create');
        // Route::post('/admin/products', [Admin\ProductController::class, 'store'])->name('products.store');

        Route::resource('/admin/products', Admin\ProductController::class);
    });

    Route::get('/movies/{movie}/showtimes/{showtime}', [TransactionController::class, 'create'])->name('transactions.create');

});

require __DIR__.'/auth.php';
