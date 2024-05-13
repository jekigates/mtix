<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Showtime;
use App\Models\Theater;
use Illuminate\Database\Seeder;

class ShowtimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $theaters = Theater::all();

        foreach ($theaters as $theater) {
            $theater_movies = $theater->theaterMovies;
            $x = 0;
            foreach ($theater->studios as $studio) {
                $theater_movie = $theater_movies[$x];

                if ($theater_movie->movie->screening_start_date !== null) {
                    for ($i = 0; $i < 3; $i++) {
                        $start_at = now()->setHours(9)->setMinutes(0)->addDays($i);
                        for ($j = 0; $j < 3; $j++) {
                            Showtime::factory()->create([
                                'theater_movie_id' => $theater_movie->id,
                                'studio_id' => $studio->id,
                                'start_at' => $start_at->addHours(3)->addMinutes(fake()->randomElement([0, 15, 30, 45, 60])),
                            ]);
                        }
                    }
                }
                $x++;
            }
        }
    }
}
