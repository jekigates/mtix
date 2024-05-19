<?php

namespace App\Http\Controllers;

use App\Data\TheaterData;
use App\Http\Controllers\Controller;
use App\Models\Theater;
use Inertia\Inertia;
use Inertia\Response;

class TheaterProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(Theater $theater): Response
     {
         return Inertia::render('Theaters/Products/Index', [
             'theater' => TheaterData::fromModel($theater)->include('location', 'brand', 'theater_products', 'theater_products.product', 'theater_products.product.category', 'theater_products.product_variant'),
         ]);
     }
}
