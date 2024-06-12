<?php

namespace Database\Factories;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\MovieGenre;
use Illuminate\Database\Eloquent\Factories\Factory;

use function App\Helpers\generateUnsplashImage;

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
        $isUpcoming = fake()->boolean();
        $screening_start_date = now()->addDays(fake()->numberBetween(0, 7));

        return [
            'title' => fake()->unique()->words(fake()->numberBetween(2, 4), true),
            'description' => fake()->text(),
            'minimum_age' => fake()->randomElement([0, 13, 17, 21]),
            'type' => fake()->randomElement(['2D', '3D', '4D']),
            'producer' => implode(', ', array_map(function() {
                return fake()->name(fake()->randomElement(['male', 'female']));
            }, range(1, fake()->numberBetween(1, 3)))),
            'director' => fake()->name(fake()->randomElement(['male', 'female'])),
            'writer' => implode(', ', array_map(function() {
                return fake()->name(fake()->randomElement(['male', 'female']));
            }, range(1, fake()->numberBetween(1, 3)))),
            'cast' => implode(', ', array_map(function() {
                return fake()->name(fake()->randomElement(['male', 'female']));
            }, range(1, fake()->numberBetween(1, 3)))),
            'distributor' => fake()->optional()->company(),
            'website' => fake()->optional()->url(),
            'runtime' => fake()->numberBetween(60, 180),
            'trailer' => 'videos/trailer.mp4',
            'screening_start_date' => ($isUpcoming) ? null : $screening_start_date->toDateString(),
            'screening_end_date' => ($isUpcoming) ? null : $screening_start_date->addDays(7)->toDateString(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Movie $movie) {
            $movie->image()->create([
                'url' => generateUnsplashImage('movie-images'),
            ]);

            $genreIds = Genre::inRandomOrder()->take(fake()->numberBetween(1, 2))->pluck('id');

            foreach ($genreIds as $genreId) {
                MovieGenre::factory()->create([
                    'movie_id' => $movie->id,
                    'genre_id' => $genreId,
                ]);
            }
        });
    }
}
