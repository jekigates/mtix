<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('settings.profile.edit'));

        $response->assertOk();
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create();
        $city = City::all()->random()->first();

        $response = $this
            ->actingAs($user)
            ->patch(route('settings.profile.edit'), [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'phone_number' => '081233217890',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('settings.profile.edit'));

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = User::factory()->create();
        $city = City::all()->random()->first();

        $response = $this
            ->actingAs($user)
            ->patch(route('settings.profile.edit'), [
                'name' => 'Test User',
                'email' => $user->email,
                'phone_number' => '081233217890',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('settings.profile.edit'));

        $this->assertNotNull($user->refresh()->email_verified_at);
    }
}
