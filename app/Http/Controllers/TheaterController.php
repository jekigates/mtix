<?php

namespace App\Http\Controllers;

use App\Data\BrandData;
use App\Data\CityData;
use App\Data\MovieData;
use App\Data\TheaterData;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\City;
use App\Models\Movie;
use App\Models\Theater;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TheaterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $brands = BrandData::collect(Brand::all());

        $city_id = $request->query('city_id') ? $request->query('city_id') : $request->session()->get('city_id');

        if ($request->query('city_id')) {
            session(['city_id' => $city_id]);
        }

        $city = City::findOrFail($city_id);
        $data['brands'] = $brands;

        if ($request->query('movie_id')) {
            $movie_id = $request->query('movie_id');
            $movie = Movie::findOrFail($movie_id);

            $city->theaters = $movie->getActiveTheaters($city_id);
            $data['movie'] = MovieData::fromModel($movie);
        }

        $data['city'] = CityData::fromModel($city)->include('theaters', 'theaters.location');

        return Inertia::render('Theaters/Index', $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $theater = Theater::findOrFail($id);
        $theater->theaterMovies = $theater->getActiveTheaterMovies();

        return Inertia::render('Theaters/Show', [
            'theater' => TheaterData::fromModel($theater)->include('location', 'brand', 'theater_movies', 'theater_movies.movie', 'theater_movies.showtimes'),
        ]);
    }

    public function products(string $id): Response
    {
        $theater = Theater::findOrFail($id);
        // $product_categories = $theater->getProductCategories();

        return Inertia::render('Theaters/Product', [
            'theater' => TheaterData::fromModel($theater)->include('location', 'brand', 'theater_products', 'theater_products.product'),
            // 'product_categories' => $product_categories,
        ]);
    }
}
