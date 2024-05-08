<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data\ProvinceData;
use App\Http\Requests\AccountUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Province;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\LaravelData\DataCollection;

class SettingController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function profile_edit(Request $request): Response
    {
        return Inertia::render('Settings/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function profile_update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('settings.profile.edit');
    }

    /**
     * Display the user's account form.
     */
    public function account_edit(): Response
    {
        $provinces = ProvinceData::collect(Province::all(), DataCollection::class)->include('cities');

        return Inertia::render('Settings/Account/Index', [
            'provinces' => $provinces,
        ]);
    }

    /**
     * Update the user's account information.
     */
    public function account_update(AccountUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('settings.account.edit');
    }

    /**
     * Display the user's security form.
     */
    public function security_edit(): Response
    {
        return Inertia::render('Settings/Security/Index');
    }

    /**
     * Delete the user's account.
     */
    public function account_destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Display the user's appearance form.
     */
    public function appearance_edit(): Response
    {
        return Inertia::render('Settings/Appearance/Index');
    }
}
