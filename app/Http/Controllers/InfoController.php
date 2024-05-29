<?php

namespace App\Http\Controllers;

use App\Data\InfoData;
use App\Http\Controllers\Controller;
use App\Models\Info;
use Inertia\Inertia;
use Inertia\Response;

class InfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $infos = InfoData::collect(Info::all());

        return Inertia::render('Infos/Index', [
            'infos' => $infos,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Info $info): Response
    {
        return Inertia::render('Infos/Show', [
            'info' => InfoData::from($info),
        ]);
    }
}
