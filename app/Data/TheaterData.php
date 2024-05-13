<?php

namespace App\Data;

use App\Models\Theater;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class TheaterData extends Data
{
    /**
    * @param Lazy|Collection<int, TheaterMovieData> $theater_movies
    */
    public function __construct(
        public string $id,
        public string $location_id,
        public string $brand_id,
        public Lazy|LocationData $location,
        public Lazy|BrandData $brand,
        public Lazy|Collection $theater_movies,
    ) {}

    public static function fromModel(Theater $theater): self
    {
        return new self(
            $theater->id,
            $theater->location_id,
            $theater->brand_id,
            Lazy::create(fn() => LocationData::from($theater->location)),
            Lazy::create(fn() => BrandData::from($theater->brand)),
            Lazy::create(fn() => TheaterMovieData::collect($theater->theaterMovies))
        );
    }
}
