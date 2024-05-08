<?php

use App\Data\BrandData;
use App\Data\CityData;
use App\Data\MovieData;
use App\Data\PromoData;
use App\Http\Controllers\SettingController;
use App\Models\Brand;
use App\Models\City;
use App\Models\Promo;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\LaravelData\DataCollection;

Route::get('/', function () {
    $promos = PromoData::collect(Promo::all());
    $city = City::all()->random()->first();
    $movies = MovieData::collect($city->get_active_movies(), DataCollection::class)->include('genres');

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'promos' => $promos,
        'movies' => $movies,
    ]);
})->name('dashboard');

Route::get('/upcoming', function () {
    $city = City::all()->random()->first();
    $movies = MovieData::collect($city->get_upcoming_movies(), DataCollection::class)->include('genres');

    return Inertia::render('Upcoming', [
        'movies' => $movies,
    ]);
})->name('upcoming');

Route::get('/theaters', function () {
    $brands = BrandData::collect(Brand::all());
    $cities = CityData::collect(City::all(), DataCollection::class)->include('theaters');

    return Inertia::render('Theaters/Index', [
        'brands' => $brands,
        'cities' => $cities,
    ]);
})->name('theaters.index');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::permanentRedirect('/settings', '/settings/profile');

    Route::get('/settings/profile', [SettingController::class, 'profile_edit'])->name('settings.profile.edit');
    Route::patch('/settings/profile', [SettingController::class, 'profile_update'])->name('settings.profile.update');

    Route::get('/settings/account', [SettingController::class, 'account_edit'])->name('settings.account.edit');
    Route::patch('/settings/account', [SettingController::class, 'account_update'])->name('settings.account.update');
    Route::delete('/settings/account', [SettingController::class, 'account_destroy'])->name('settings.account.destroy');

    Route::get('/settings/security', [SettingController::class, 'security_edit'])->name('settings.security.edit');
    Route::patch('/settings/security', [SettingController::class, 'security_update'])->name('settings.security.update');
});

require __DIR__.'/auth.php';
