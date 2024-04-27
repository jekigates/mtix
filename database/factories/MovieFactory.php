<?php

namespace Database\Factories;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\MovieGenre;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name(),
            'description' => fake()->text(),
            'producer' => implode(', ', array_map(function() {
                return $this->faker->name($this->faker->randomElement(['male', 'female']));
            }, range(1, $this->faker->numberBetween(1, 3)))),
            'director' => implode(', ', array_map(function() {
                return $this->faker->name($this->faker->randomElement(['male', 'female']));
            }, range(1, $this->faker->numberBetween(1, 3)))),
            'writer' => implode(', ', array_map(function() {
                return $this->faker->name($this->faker->randomElement(['male', 'female']));
            }, range(1, $this->faker->numberBetween(1, 3)))),
            'cast' => implode(', ', array_map(function() {
                return $this->faker->name($this->faker->randomElement(['male', 'female']));
            }, range(1, $this->faker->numberBetween(1, 3)))),
            'distributor' => fake()->company(),
            'website' => fake()->url(),
            'duration' => fake()->numberBetween(60, 180),
            'image' => function () {
                $filename = uniqid() . '.jpg';

                Storage::disk('public')->put('movie-images/' . $filename, file_get_contents('https://source.unsplash.com/random'));

                return 'storage/movie-images/' . $filename;
            },
            'trailer' => fake()->url(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Movie $movie) {
            $genreIds = Genre::inRandomOrder()->take(2)->pluck('id');

            foreach ($genreIds as $genreId) {
                MovieGenre::factory()->create([
                    'movie_id' => $movie->id,
                    'genre_id' => $genreId,
                ]);
            }
        });
    }
}
