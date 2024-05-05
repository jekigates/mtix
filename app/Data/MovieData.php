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
    */
    public function __construct(
        public string $id,
        public string $title,
        public string $description,
        public ?string $producer,
        public ?string $director,
        public ?string $writer,
        public ?string $cast,
        public ?string $distributor,
        public ?string $website,
        public int $duration,
        public string $image,
        public string $trailer,
        public Lazy|Collection $genres,
    ) {}

        public static function fromModel(Movie $movie): self
    {
        return new self(
            $movie->id,
            $movie->title,
            $movie->description,
            $movie->producer,
            $movie->director,
            $movie->writer,
            $movie->cast,
            $movie->distributor,
            $movie->website,
            $movie->duration,
            $movie->image,
            $movie->trailer,
            Lazy::create(fn() => GenreData::collect($movie->genres)),
        );
    }
}
