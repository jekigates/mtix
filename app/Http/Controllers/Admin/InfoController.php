<?php

namespace App\Http\Controllers\Admin;

use App\Data\InfoData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\InfoStoreRequest;
use App\Models\Info;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

        return Inertia::render('Admin/Infos/Index', [
            'infos' => $infos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Infos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InfoStoreRequest $request): RedirectResponse
    {
        $info = Info::create($request->validated());

        return Redirect::route('admin.infos.index');
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
    public function destroy(Info $info): RedirectResponse
    {
        $info->delete();

        return Redirect::route('admin.infos.index');
    }
}
