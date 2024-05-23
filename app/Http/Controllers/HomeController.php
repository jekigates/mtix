<?php

namespace App\Http\Controllers;

use App\Data\CityData;
use App\Data\InfoData;
use App\Data\MovieData;
use App\Data\PromoData;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Info;
use App\Models\Promo;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $promos = PromoData::collect(Promo::all());
        $infos = InfoData::collect(Info::all());
        $city_id = $request->session()->get('city_id');
        $city = City::findOrFail($city_id);
        $movies = MovieData::collect($city->getActiveMovies());

        return Inertia::render('Home', [
            'infos' => $infos,
            'promos' => $promos,
            'movies' => $movies,
        ]);
    }

    public function upcoming(Request $request): Response
    {
        $city_id = $request->session()->get('city_id');
        $city = City::findOrFail($city_id);
        $movies = MovieData::collect($city->getUpcomingMovies());

        return Inertia::render('Upcoming', [
            'movies' => $movies,
        ]);
    }

    public function selectCity(Request $request): Response
    {
        $cities = CityData::collect(City::orderBy('name')->get());
        $city_id = $request->session()->get('city_id');

        return Inertia::render('SelectCity', [
            'cities' => $cities,
            'selected_city' => CityData::fromModel(City::find($city_id)),
        ]);
    }

    public function selectRole()
    {
        $user = User::find(auth()->user()->id);

        if (count($user->getRoleNames()) === 0) {
            return redirect()->route('home');
        }

        $roles = $user->hasRole('admin') ? Role::all()->pluck('name') : $user->getRoleNames();
        $roles[] = 'customer';

        return Inertia::render('SelectRole', [
            'roles' => $roles,
        ]);
    }
}
