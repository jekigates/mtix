<?php

namespace Database\Factories;

use App\Models\Theater;
use App\Models\TheaterMovie;
use App\Models\TheaterProduct;
use App\Models\Movie;
use App\Models\Product;
use App\Models\Studio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Theater>
 */
class TheaterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Theater $theater) {
            $movieIds = Movie::inRandomOrder()->where('screening_start_date', '!=', null)->limit(2)->pluck('id');

            foreach ($movieIds as $movieId) {
                TheaterMovie::factory()->create([
                    'theater_id' => $theater->id,
                    'movie_id' => $movieId,
                ]);
            }
            TheaterMovie::factory()->create([
                'theater_id' => $theater->id,
                'movie_id' => Movie::inRandomOrder()->where('screening_start_date', null)->first()->id,
            ]);

            $products = Product::inRandomOrder()->take(fake()->numberBetween(1, Product::count()))->get();

            foreach ($products as $product) {
                TheaterProduct::factory()->create([
                    'theater_id' => $theater->id,
                    'product_id' => $product->id,
                    'product_variant_id' => $product->variants->random()->id,
                ]);
            }

            for ($i = 0; $i < 3; $i++) {
                Studio::factory()->create([
                    'theater_id' => $theater->id,
                    'number' => $i + 1,
                ]);
            }
        });
    }
}
