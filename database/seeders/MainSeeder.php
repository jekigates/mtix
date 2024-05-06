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
use Illuminate\Support\Facades\Storage;

class MainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $directories = Storage::disk('public')->directories();

        foreach ($directories as $directory) {
            Storage::disk('public')->deleteDirectory($directory);
        }

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
        Movie::factory(18)->create();

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
        $promos = [
            [
                'name' => 'Weekendasik Pakai M.food',
                'image' => 'img/promos/weekend-asik.jpg',
                'banner_image' => 'img/promos/banner-images/weekend-asik.jpg',
            ],
            [
                'name' => 'Xxi Cafe - Pesan Xxi Snack Box Di Sini!',
                'image' => 'img/promos/snackbox.jpg',
                'banner_image' => 'img/promos/banner-images/snackbox.jpg',
            ],
            [
                'name' => 'Mandiri - Cashback 100% Qr Livin By Mandiri',
                'image' => 'img/promos/mandiri-cashback.jpg',
                'banner_image' => 'img/promos/banner-images/mandiri-cashback.jpeg',
            ]
        ];

        foreach ($promos as $promo) {
            Promo::factory()->create([
                'name' => $promo['name'],
                'image' => $promo['image'],
                'banner_image' => $promo['banner_image'],
            ]);
        }
    }
}
