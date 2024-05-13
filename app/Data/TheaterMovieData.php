<?php

namespace App\Data;

use App\Models\TheaterMovie;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class TheaterMovieData extends Data
{
    /**
    * @param Lazy|Collection<int, ShowtimeData> $showtimes
    */
    public function __construct(
        public string $id,
        public string $theater_id,
        public string $movie_id,
        public int $price,
        public Lazy|TheaterData $theater,
        public Lazy|Collection $showtimes,
        public Lazy|MovieData $movie,
    ) {}

    public static function fromModel(TheaterMovie $theater_movie): self
    {
        return new self(
            $theater_movie->id,
            $theater_movie->theater_id,
            $theater_movie->movie_id,
            $theater_movie->price,
            Lazy::create(fn() => TheaterData::fromModel($theater_movie->theater)),
            Lazy::create(fn() => ShowtimeData::collect($theater_movie->showtimes)),
            Lazy::create(fn() => MovieData::fromModel($theater_movie->movie)),
        );
    }
}
