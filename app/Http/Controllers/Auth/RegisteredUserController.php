<?php

namespace App\Http\Controllers\Auth;

use App\Data\ProvinceData;
use App\Http\Controllers\Controller;
use App\Models\Province;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\DataCollection;
use Spatie\Permission\Contracts\Role;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $provinces = ProvinceData::collect(Province::all(), DataCollection::class)->include('cities');

        return Inertia::render('Auth/Register', [
            'provinces' => $provinces,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|string|lowercase|email|max:50|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|string|max:16|unique:' . User::class,
            'address' => 'required|string|max:100',
            'province_id' => 'required|string|max:36',
            'city_id' => 'required|string|max:36',
            'gender' => ['required', Rule::in(['Male', 'Female'])],
            'dob' => 'required|date|before:-17 years',
          ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'city_id' => $request->city_id,
            'gender' => $request->gender,
            'dob' => $request->dob,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
