<?php

namespace App\Http\Controllers\Admin;

use App\Data\BrandData;
use App\Data\CityData;
use App\Data\LocationData;
use App\Data\ProvinceData;
use App\Data\UserData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LocationStoreRequest;
use App\Models\Brand;
use App\Models\City;
use App\Models\Location;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\LaravelData\DataCollection;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $provinces = ProvinceData::collect(Province::all());
        $cities = CityData::collect(City::all());
        $locations = LocationData::collect(Location::all(), DataCollection::class)->include('city', 'city.province', 'user');

        return Inertia::render('Admin/Locations/Index', compact('provinces', 'cities', 'locations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $brands = BrandData::collect(Brand::all());
        $provinces = ProvinceData::collect(Province::all(), DataCollection::class)->include('cities');
        $users = UserData::collect(User::all());

        return Inertia::render('Admin/Locations/Create', compact('brands', 'provinces', 'users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LocationStoreRequest $request): RedirectResponse
    {
        $location = Location::create($request->except('brands'));

        foreach ($request->brands as $brandId) {
            $location->theaters()->create([
                'brand_id' => $brandId,
            ]);
        }

        $user = User::findOrFail($request->user_id);
        $user->assignRole('owner');

        return Redirect::route('admin.locations.index');
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
    public function destroy(Location $location): RedirectResponse
    {
        if (!$location->theaters->count() > 0) {
            $location->delete();
        }

        return Redirect::route('admin.locations.index');
    }
}
