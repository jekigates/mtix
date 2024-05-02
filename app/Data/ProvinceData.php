<?php

namespace App\Data;

use App\Models\Province;
use Spatie\LaravelData\Data;
use App\Data\CityData;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Lazy;

class ProvinceData extends Data
{
    /**
    * @param Lazy|Collection<int, CityData> $cities
    */
    public function __construct(
        public string $id,
        public string $name,
        public Lazy|Collection $cities,
    ) {}

    public static function fromModel(Province $province): self
    {
        return new self(
            $province->id,
            $province->name,
            Lazy::create(fn() => CityData::collect($province->cities)),
        );
    }
}
