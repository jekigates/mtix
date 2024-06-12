<?php

namespace App\Http\Controllers;

use App\Data\BannerData;
use App\Data\CityData;
use App\Data\MovieData;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\City;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $banners = BannerData::collect(Banner::all());
        $city_id = $request->session()->get('city_id');
        $city = City::findOrFail($city_id);
        $movies = MovieData::collect($city->getActiveMovies());

        return Inertia::render('Home', [
            'banners' => $banners,
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

        $roles = $user->getRoleNames();
        $roles[] = 'customer';

        return Inertia::render('SelectRole', [
            'roles' => $roles,
        ]);
    }
}
