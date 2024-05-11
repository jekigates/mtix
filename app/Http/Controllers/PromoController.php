<?php

namespace App\Http\Controllers;

use App\Data\PromoData;
use App\Http\Controllers\Controller;
use App\Models\Promo;
use Inertia\Inertia;
use Inertia\Response;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $promos = PromoData::collect(Promo::where('valid_start_date', '>=', now())->where('valid_end_date', '>=', now())->get());

        return Inertia::render('Promos/Index', [
            'promos' => $promos,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $promo = Promo::where('valid_start_date', '>=', now())->where('valid_end_date', '>=', now())->findOrFail($id);

        return Inertia::render('Promos/Show', [
            'promo' => PromoData::fromModel($promo),
        ]);
    }
}
