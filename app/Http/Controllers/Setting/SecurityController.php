<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class SecurityController extends Controller
{
    /**
     * Display the user's security form.
     */
    public function edit(): Response
    {
        return Inertia::render('Settings/Security/Index');
    }
}
