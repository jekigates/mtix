<?php

namespace Database\Factories;

use App\Models\Cinema;
use App\Models\CinemaMovie;
use App\Models\CinemaProduct;
use App\Models\Movie;
use App\Models\ProductVariant;
use App\Models\Studio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cinema>
 */
class CinemaFactory extends Factory
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
        return $this->afterCreating(function (Cinema $cinema) {
            $movieIds = fake()->randomElements(Movie::all()->pluck('id'), 3);

            foreach ($movieIds as $movieId) {
                CinemaMovie::factory()->create([
                    'cinema_id' => $cinema->id,
                    'movie_id' => $movieId,
                ]);
            }

            $productVariants = ProductVariant::inRandomOrder()->take(3)->get();

            foreach ($productVariants as $productVariant) {
                CinemaProduct::factory()->create([
                    'cinema_id' => $cinema->id,
                    'product_id' => $productVariant->product->id,
                    'product_variant_id' => $productVariant->id,
                ]);
            }

            $studioCount = fake()->numberBetween(0, 3);

            for ($i = 0; $i < $studioCount; $i++) {
                Studio::factory()->create([
                    'cinema_id' => $cinema->id,
                    'number' => $i + 1,
                ]);
            }
        });
    }
}
