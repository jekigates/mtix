<?php

use App\Data\CityData;
use App\Data\InfoData;
use App\Data\MovieData;
use App\Data\PromoData;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieShowtimeController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TheaterController;
use App\Http\Controllers\TheaterProductController;
use App\Http\Controllers\TransactionController;
use App\Models\City;
use App\Models\Info;
use App\Models\Promo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

Route::get('/', function (Request $request) {
    $promos = PromoData::collect(Promo::all());
    $infos = InfoData::collect(Info::all());
    $city_id = $request->session()->get('city_id');
    $city = City::findOrFail($city_id);
    $movies = MovieData::collect($city->getActiveMovies());

    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'infos' => $infos,
        'promos' => $promos,
        'movies' => $movies,
    ]);
})->name('home');

Route::get('/upcoming', function (Request $request): Response {
    $city_id = $request->session()->get('city_id');
    $city = City::findOrFail($city_id);
    $movies = MovieData::collect($city->getUpcomingMovies());

    return Inertia::render('Upcoming', [
        'movies' => $movies,
    ]);
})->name('upcoming');

Route::get('/select-city', function (Request $request): Response {
    $cities = CityData::collect(City::orderBy('name')->get());
    $city_id = $request->session()->get('city_id');

    return Inertia::render('SelectCity', [
        'cities' => $cities,
        'selected_city' => CityData::fromModel(City::find($city_id)),
    ]);
})->name('select.city');

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
    Route::get('/select-role', function () {
        $user = User::find(auth()->user()->id);

        if (count($user->getRoleNames()) === 1 && !$user->hasRole('Super-Admin')) {
            return redirect()->route('home');
        }

        $roles = $user->hasRole('Super-Admin') ? Role::all()->pluck('name') : $user->getRoleNames();

        return Inertia::render('SelectRole', [
            'roles' => $roles,
        ]);
    })->name('dashboard');

    Route::permanentRedirect('/settings', '/settings/profile');

    Route::get('/settings/profile', [SettingController::class, 'profile_edit'])->name('settings.profile.edit');
    Route::patch('/settings/profile', [SettingController::class, 'profile_update'])->name('settings.profile.update');

    Route::get('/settings/account', [SettingController::class, 'account_edit'])->name('settings.account.edit');
    Route::patch('/settings/account', [SettingController::class, 'account_update'])->name('settings.account.update');
    Route::delete('/settings/account', [SettingController::class, 'account_destroy'])->name('settings.account.destroy');

    Route::get('/settings/security', [SettingController::class, 'security_edit'])->name('settings.security.edit');
    Route::patch('/settings/security', [SettingController::class, 'security_update'])->name('settings.security.update');

    Route::get('/movies/{movie}/showtimes/{showtime}', [TransactionController::class, 'create'])->name('transactions.create');

});

require __DIR__.'/auth.php';
