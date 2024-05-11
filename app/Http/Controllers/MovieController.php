<?php

namespace App\Http\Controllers;

use App\Data\MovieData;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $movie = Movie::findOrFail($id);

        return Inertia::render('Movies/Show', [
            'movie' => MovieData::fromModel($movie)->include('genres'),
        ]);
    }
}
