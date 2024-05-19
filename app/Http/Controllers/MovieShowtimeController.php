<?php

namespace App\Http\Controllers;

use App\Data\MovieData;
use App\Data\TheaterData;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Theater;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MovieShowtimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Movie $movie): Response
    {
        $city_id = $request->session()->get('city_id');

        $data['movie'] = MovieData::fromModel($movie)->include('theater_movies', 'theater_movies.theater', 'theater_movies.theater.location', 'theater_movies.theater.brand', 'theater_movies.showtimes');
        if ($request->query('theater_id')) {
            $theater = Theater::findOrFail($request->query('theater_id'));
            $data['theater'] = TheaterData::fromModel($theater)->include('location', 'brand');
        }

        $movie->theaterMovies = $movie->getActiveTheaterMovies($city_id, $request->query('theater_id'));

        return Inertia::render('Movies/Showtimes/Index', $data);
    }
}
