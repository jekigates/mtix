<?php

namespace App\Http\Controllers\Admin;

use App\Data\PromoData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PromoStoreRequest;
use App\Http\Requests\Admin\PromoUpdateRequest;
use App\Models\Promo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use function App\Helpers\deleteStorageImage;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $promos = PromoData::collect(Promo::withoutGlobalScopes()->get());

        return Inertia::render('Admin/Promos/Index', [
            'promos' => $promos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Promos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PromoStoreRequest $request): RedirectResponse
    {
        $promo = Promo::create($request->only(['name', 'description', 'discount', 'valid_start_date', 'valid_end_date']));
        $promo->image()->create(['url' => $request->file('image')->store('promo-images', 'public')]);


        return Redirect::route('admin.promos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $promo = Promo::withoutGlobalScopes()->findOrFail($id);

        return Inertia::render('Admin/Promos/Show', [
            'promo' => PromoData::fromModel($promo),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $promo = Promo::withoutGlobalScopes()->findOrFail($id);

        return Inertia::render('Admin/Promos/Edit', [
            'promo' => PromoData::fromModel($promo),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PromoUpdateRequest $request, string $id): RedirectResponse
    {
        $promo = Promo::withoutGlobalScopes()->findOrFail($id);
        $promo->update($request->only(['name', 'description', 'discount', 'valid_start_date', 'valid_end_date']));

        if ($request->hasFile('image')) {
            deleteStorageImage($promo->image->url);

            $promo->image->update(['url' => $request->file('image')->store('promo-images', 'public')]);
        }

        return Redirect::route('admin.promos.edit', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $promo = Promo::withoutGlobalScopes()->findOrFail($id);

        if ($promo->banner) {
            deleteStorageImage($promo->banner->url);
            $promo->banner->delete();
        }

        deleteStorageImage($promo->image->url);

        $promo->image->delete();
        $promo->delete();

        return Redirect::route('admin.promos.index');
    }
}
