<?php

namespace App\Http\Controllers\Admin;

use App\Data\PromoData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\InfoStoreRequest;
use App\Models\Promo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
    public function store(InfoStoreRequest $request)
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
    public function destroy(string $id): RedirectResponse
    {
        $promo = Promo::withoutGlobalScopes()->findOrFail($id);
        deleteStorageImage($promo->image->url);

        $promo->image->delete();
        $promo->delete();

        return Redirect::route('admin.promos.index');
    }
}
