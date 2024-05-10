<?php

namespace App\Data;

use App\Models\Location;
use App\Models\Theater;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class TheaterData extends Data
{
    /**
    * @param Lazy|Collection<int, LocationData> $locations
    */
    public function __construct(
        public string $id,
        public string $location_id,
        public string $brand_id,
        public Lazy|LocationData $location,
    ) {}

    public static function fromModel(Theater $theater): self
    {
        return new self(
            $theater->id,
            $theater->location_id,
            $theater->brand_id,
            Lazy::create(fn() => LocationData::from($theater->location)),
        );
    }
}
