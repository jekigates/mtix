<?php

namespace App\Data;

use App\Models\Showtime;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class ShowtimeData extends Data
{
    public function __construct(
        public string $id,
        public string $theater_movie_id,
        public string $studio_id,
        public string $start_at,
        public Lazy|TheaterMovieData $theater_movie,
        public Lazy|StudioData $studio,
    ) {}

    public static function fromModel(Showtime $showtime): self
    {
        return new self(
            $showtime->id,
            $showtime->theater_movie_id,
            $showtime->studio_id,
            $showtime->start_at,
            Lazy::create(fn() => TheaterMovieData::fromModel($showtime->theaterMovie)),
            Lazy::create(fn() => StudioData::fromModel($showtime->studio)),
        );
    }
}
