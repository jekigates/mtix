<?php

namespace App\Http\Middleware;

use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $city = ($request->hasCookie('city_id')) ? City::find($request->cookie('city_id')) : null;

        if (!$city) {
            $city = City::all()->first();
        }

        return [
            ...parent::share($request),
            'auth' => [
                // 'user' => $request->user(),
                'user' => auth()->check() ? array_merge(
                    $request->user()->toArray(),
                    ['province_id' => $request->user()->city->province_id]
                ) : $request->user(),
            ],
            'selected_city' => $city,
        ];
    }
}
