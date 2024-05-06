<?php

use App\Data\MovieData;
use App\Data\PromoData;
use App\Http\Controllers\ProfileController;
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

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
