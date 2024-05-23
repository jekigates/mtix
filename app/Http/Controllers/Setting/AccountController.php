<?php

namespace App\Http\Controllers\Setting;

use App\Data\ProvinceData;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccountUpdateRequest;
use App\Models\Province;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\LaravelData\DataCollection;

class AccountController extends Controller
{
    /**
     * Display the user's account form.
     */
    public function edit(): Response
    {
        $provinces = ProvinceData::collect(Province::all(), DataCollection::class)->include('cities');

        return Inertia::render('Settings/Account/Index', [
            'provinces' => $provinces,
        ]);
    }

    /**
     * Update the user's account information.
     */
    public function update(AccountUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('settings.account.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
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
}
