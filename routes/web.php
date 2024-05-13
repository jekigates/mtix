<?php

use App\Data\CityData;
use App\Data\MovieData;
use App\Data\PromoData;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TheaterController;
use App\Models\City;
use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', function (Request $request): Response {
    $promos = PromoData::collect(Promo::all());
    $city_id = $request->session()->get('city_id');
    $city = City::findOrFail($city_id);
    $movies = MovieData::collect($city->getActiveMovies());

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'promos' => $promos,
        'movies' => $movies,
    ]);
})->name('dashboard');

Route::get('/upcoming', function (Request $request): Response {
    $city_id = $request->session()->get('city_id');
    $city = City::findOrFail($city_id);
    $movies = MovieData::collect($city->getUpcomingMovies());

    return Inertia::render('Upcoming', [
        'movies' => $movies,
    ]);
})->name('upcoming');

Route::get('/cities', function (Request $request): Response {
    $cities = CityData::collect(City::all());
    $city_id = $request->session()->get('city_id');

    return Inertia::render('City', [
        'cities' => $cities,
        'selected_city' => CityData::fromModel(City::find($city_id)),
    ]);
})->name('cities.index');

Route::get('/theaters',[TheaterController::class, 'index'])->name('theaters.index');
Route::get('/theaters/{id}/show', [TheaterController::class, 'show'])->name('theaters.show');

Route::get('/movies/{id}', [MovieController::class, 'show'])->name('movies.show');
Route::get('/movies/{id}/showtimes', [MovieController::class, 'showtimes'])->name('movies.showtimes');

Route::get('/promos', [PromoController::class, 'index'])->name('promos.index');
Route::get('/promos/{id}', [PromoController::class, 'show'])->name('promos.show');

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
