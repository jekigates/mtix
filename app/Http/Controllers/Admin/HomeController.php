<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // dd(auth()->user()->with('roles')->get());
        // dd(User::find(auth()->user()->id))->with('roles')->get();
        // dd(User::find(auth()->user()->id)->roles);

        // dd(User::find(auth()->user()->id));
        // dd(User::with('roles')->find(auth()->user()->id));

        return Inertia::render('Admin/Home');
    }
}
