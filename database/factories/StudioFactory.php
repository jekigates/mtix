<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\Seat;
use App\Models\Showtime;
use App\Models\Studio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Studio>
 */
class StudioFactory extends Factory
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
        return $this->afterCreating(function (Studio $studio) {
            for ($i = 0; $i < 81; $i++) {
                Seat::factory()->create([
                    'studio_id' => $studio->id,
                    'row_code' => chr(65 + floor($i / 9)),
                    'column_number' => $i % 9 + 1,
                ]);
            }

            $cinema_movies = $studio->cinema->cinema_movies;

            foreach ($cinema_movies as $cinema_movie) {
                if ($cinema_movie->movie->screening_start_date !== null) {
                    for ($i = 0; $i < 3; $i++) {
                        $start_at = now()->addDays($i);
                        for ($j = 0; $j < 3; $j++) {
                            Showtime::factory()->create([
                                'cinema_movie_id' => $cinema_movie->id,
                                'studio_id' => $studio->id,
                                'start_at' => $start_at->addHours(3),
                            ]);
                        }
                    }
                }
            }
        });
    }
}
