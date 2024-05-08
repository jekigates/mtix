<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class TheaterData extends Data
{
    public function __construct(
        public string $id,
    ) {}
}
