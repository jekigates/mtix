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
}
