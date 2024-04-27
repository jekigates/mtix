<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Brand;
use App\Models\City;
use App\Models\Genre;
use App\Models\Location;
use App\Models\Movie;
use App\Models\ProductCategory;
use App\Models\Promo;
use App\Models\Province;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $user = User::create([
        //     'name' => 'Jeki Gates',
        //     'email' => 'jekigates2004@gmail.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('12345678'),
        //     'phone_number' => '081234567890',
        //     'address' => 'Jl. Kebon Jeruk No. 1',
        //     'province' => 'DKI Jakarta',
        //     'city' => 'Jakarta Barat',
        //     'gender' => 'Male',
        //     'dob' => date('Y-m-d', strtotime('2004-07-17')),
        // ]);

        /*
            =====================
            1. Provinces & Cities
            =====================
        */
        Province::factory(3)->create();

        /*
            ========
            2. Users
            ========
        */
        User::factory(27)->create();

        /*
            =========
            3. Genres
            =========
        */
        $genres = ["2D", "R13+", "D17+", "SU"];

        foreach ($genres as $genre) {
            Genre::create([
                'name' => $genre,
            ]);
        }

        /*
            ========================
            4. Movies & Movie Genres
            ========================
        */
        Movie::factory(9)->create();

        /*
            =========
            5. Brands
            =========
        */
        $brands = ['Cinema XXI', 'The Premiere', 'IMAX'];

        foreach ($brands as $brand) {
            Brand::create([
                'name' => $brand,
            ]);
        }

        /*
            ===================================================
            6. Product Categories & Products & Product Variants
            ===================================================
        */
        ProductCategory::factory(9)->create();


        /*
            ==============================================================================
            6. Locations & Cinemas & Cinema Movies & Cinema Products & Studios & Showtimes
            ==============================================================================
        */
        $cities = City::all();

        foreach ($cities as $city) {
            Location::factory(3)->create([
                'city_id' => $city->id,
                'user_id' => User::all()->random()->id,
            ]);
        }

        /*
            =========
            7. Promos
            =========
        */
        Promo::factory(9)->create();

        /*
            ==========
            8. Banners
            ==========
        */
        Banner::factory(3)->create();
    }
}
