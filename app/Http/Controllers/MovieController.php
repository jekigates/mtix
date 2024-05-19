<?php

namespace App\Http\Controllers;

use App\Data\MovieData;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Movie $movie): Response
    {
        return Inertia::render('Movies/Show', [
            'movie' => MovieData::fromModel($movie)->include('genres'),
        ]);
    }
}
