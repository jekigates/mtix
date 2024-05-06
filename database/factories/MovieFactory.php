<?php

namespace Database\Factories;

use App\Models\Genre;
use App\Models\GenreMovie;
use App\Models\Movie;
use Carbon\Carbon;
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
        $isUpcoming = fake()->boolean();
        $screening_start_date = now()->addDays(fake()->numberBetween(0, 7));

        return [
            'title' => fake()->unique()->words(fake()->numberBetween(2, 4), true),
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
            'screening_start_date' => ($isUpcoming) ? null : $screening_start_date->toDateString(),
            'screening_end_date' => ($isUpcoming) ? null : $screening_start_date->addDays(7)->toDateString(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Movie $movie) {
            $genreIds = Genre::inRandomOrder()->take(2)->pluck('id');

            foreach ($genreIds as $genreId) {
                GenreMovie::factory()->create([
                    'movie_id' => $movie->id,
                    'genre_id' => $genreId,
                ]);
            }
        });
    }
}
