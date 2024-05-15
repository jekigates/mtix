<?php

namespace Database\Factories;

use App\Models\Theater;
use App\Models\TheaterMovie;
use App\Models\TheaterProduct;
use App\Models\Movie;
use App\Models\Product;
use App\Models\ProductVariant;
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
            $movie_ids = Movie::inRandomOrder()->where('screening_start_date', '!=', null)->limit(2)->pluck('id');

            foreach ($movie_ids as $movie_id) {
                TheaterMovie::factory()->create([
                    'theater_id' => $theater->id,
                    'movie_id' => $movie_id,
                ]);
            }
            TheaterMovie::factory()->create([
                'theater_id' => $theater->id,
                'movie_id' => Movie::inRandomOrder()->where('screening_start_date', null)->first()->id,
            ]);

            $products = Product::inRandomOrder()->take(27)->get();

            foreach ($products as $product) {
                $productVariant = ProductVariant::inRandomOrder()->where('product_id', $product->id)->get();

                if ($productVariant) {
                    for ($x = 0; $x < fake()->numberBetween(0, $productVariant->count()); $x++) {
                        TheaterProduct::factory()->create([
                            'theater_id' => $theater->id,
                            'product_id' => $product->id,
                            'product_variant_id' => $productVariant[$x]->id,
                        ]);
                    }
                } else {
                    TheaterProduct::factory()->create([
                        'theater_id' => $theater->id,
                        'product_id' => $product->id,
                    ]);
                }
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
