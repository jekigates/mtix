<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Info;
use App\Models\Promo;
use Illuminate\Http\RedirectResponse;

class BannerController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Banner $banner): RedirectResponse
    {
        $bannerable = $banner->bannerable;
        $url = "";

        if ($bannerable instanceof Promo) {
            $url = action([PromoController::class, 'show'], $bannerable->id);
        } else if ($bannerable instanceof Info) {
            $url = action([InfoController::class, 'show'], $bannerable->id);
        }

        return redirect()->to($url);
    }
}
