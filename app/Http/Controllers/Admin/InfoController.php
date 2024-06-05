<?php

namespace App\Http\Controllers\Admin;

use App\Data\InfoData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\InfoRequest;
use App\Models\Info;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use function App\Helpers\deleteStorageImage;

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
    public function store(InfoRequest $request): RedirectResponse
    {
        $info = Info::create($request->validated());

        return Redirect::route('admin.infos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Info $info): Response
    {
        return Inertia::render('Admin/Infos/Show', [
            'info' => InfoData::from($info),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Info $info): Response
    {
        return Inertia::render('Admin/Infos/Edit', [
            'info' => InfoData::from($info),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InfoRequest $request, Info $info): RedirectResponse
    {
        $info->update($request->validated());

        return Redirect::route('admin.infos.edit', $info->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Info $info): RedirectResponse
    {
        if ($info->banner) {
            deleteStorageImage($info->banner->url);
            $info->banner->delete();
        }

        $info->delete();

        return Redirect::route('admin.infos.index');
    }
}
