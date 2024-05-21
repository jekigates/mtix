<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Delete all generated images in the public disk
        $directories = Storage::disk('public')->directories();

        foreach ($directories as $directory) {
            Storage::disk('public')->deleteDirectory($directory);
        }

        $this->call([
            // 1. Provinces & Cities
            ProvinceSeeder::class,

            // 2. Users
            UserSeeder::class,

            // 3. Genres
            GenreSeeder::class,

            // 4. Movies & Movie Genres
            MovieSeeder::class,

            // 5. Brands
            BrandSeeder::class,

            // 6. Categories & Products & Product Variants
            CategorySeeder::class,

            // 7. Locations & Theaters & Theater Movies & Theater Products & Studios
            LocationSeeder::class,

            // 8. Showtimes
            ShowtimeSeeder::class,

            // 9. Promos
            PromoSeeder::class,

            // 10. Info
            InfoSeeder::class,

            PermissionSeeder::class,
        ]);
    }
}
