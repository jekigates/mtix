<?php

namespace App\Data;

use App\Models\Movie;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class MovieData extends Data
{
    /**
    * @param Lazy|Collection<int, GenreData> $genres
    * @param Lazy|Collection<int, TheaterMovieData> $theater_movies
    */
    public function __construct(
        public string $id,
        public string $title,
        public string $description,
        public int $minimum_age,
        public string $type,
        public ?string $producer,
        public ?string $director,
        public ?string $writer,
        public ?string $cast,
        public ?string $distributor,
        public ?string $website,
        public int $runtime,
        public string $image,
        public string $trailer,
        public ?string $screening_start_date,
        public ?string $screening_end_date,
        public Lazy|Collection $genres,
        public Lazy|Collection $theater_movies,
    ) {}

    public static function fromModel(Movie $movie): self
    {
        return new self(
            $movie->id,
            $movie->title,
            $movie->description,
            $movie->minimum_age,
            $movie->type,
            $movie->producer,
            $movie->director,
            $movie->writer,
            $movie->cast,
            $movie->distributor,
            $movie->website,
            $movie->runtime,
            asset($movie->image),
            asset($movie->trailer),
            $movie->screening_start_date,
            $movie->screening_end_date,
            Lazy::create(fn() => GenreData::collect($movie->genres)),
            Lazy::create(fn() => TheaterMovieData::collect($movie->theaterMovies)),
        );
    }
}
