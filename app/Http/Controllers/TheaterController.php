<?php

namespace App\Http\Controllers;

use App\Data\BrandData;
use App\Data\CityData;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\LaravelData\DataCollection;

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

        return Inertia::render('Theaters/Index', [
            'brands' => $brands,
            'city' => CityData::fromModel(City::find($city_id))->include('theaters', 'theaters.location'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
