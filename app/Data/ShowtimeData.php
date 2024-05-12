<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ShowtimeData extends Data
{
    public function __construct(
        public string $id,
        public string $theater_movie_id,
        public string $studio_id,
        public string $start_at,
    ) {}
}
