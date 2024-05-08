<?php

namespace Database\Factories;

use App\Models\Theater;
use App\Models\TheaterMovie;
use App\Models\TheaterProduct;
use App\Models\Movie;
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
            $movieIds = Movie::inRandomOrder()->limit(3)->pluck('id');

            foreach ($movieIds as $movieId) {
                TheaterMovie::factory()->create([
                    'theater_id' => $theater->id,
                    'movie_id' => $movieId,
                ]);
            }

            $productVariants = ProductVariant::inRandomOrder()->take(3)->get();

            foreach ($productVariants as $productVariant) {
                TheaterProduct::factory()->create([
                    'theater_id' => $theater->id,
                    'product_id' => $productVariant->product->id,
                    'product_variant_id' => $productVariant->id,
                ]);
            }

            $studioCount = fake()->numberBetween(0, 3);

            for ($i = 0; $i < $studioCount; $i++) {
                Studio::factory()->create([
                    'theater_id' => $theater->id,
                    'number' => $i + 1,
                ]);
            }
        });
    }
}
