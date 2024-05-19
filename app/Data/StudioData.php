<?php

namespace App\Data;

use App\Models\Studio;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class StudioData extends Data
{
    /**
    * @param Lazy|Collection<int, SeatData> $seats
    */
    public function __construct(
        public string $id,
        public string $theater_id,
        public int $number,
        public Lazy|TheaterData $theater,
        public Lazy|Collection $seats,
    ) {}

    public static function fromModel(Studio $studio): self
    {
        return new self(
            $studio->id,
            $studio->theater_id,
            $studio->number,
            Lazy::create(fn() => TheaterData::from($studio->theater)),
            Lazy::create(fn() => SeatData::collect($studio->seats)),
        );
    }
}
