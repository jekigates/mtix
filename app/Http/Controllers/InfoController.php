<?php

namespace App\Http\Controllers;

use App\Data\InfoData;
use App\Http\Controllers\Controller;
use App\Models\Info;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $infos = InfoData::collect(Info::all());

        return Inertia::render('Infos/Index', [
            'infos' => $infos,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $info = Info::findOrFail($id);

        return Inertia::render('Infos/Show', [
            'info' => InfoData::fromModel($info),
        ]);
    }
}
