<?php

namespace App\Http\Controllers;

use App\Data\MovieData;
use App\Data\ShowtimeData;
use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Showtime;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, Movie $movie, Showtime $showtime): Response
    {
        $qty = $request->query('qty') ?? 1;

        return Inertia::render('Transactions/Create', [
            'movie' => MovieData::fromModel($movie),
            'showtime' => ShowtimeData::fromModel($showtime)->include('studio', 'studio.theater', 'studio.theater.location', 'studio.theater.brand', 'studio.seats', 'theater_movie'),
            'qty' => $qty,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
