<?php

namespace App\Data;

use App\Models\City;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class CityData extends Data
{
    /**
    * @param Lazy|Collection<int, TheaterData> $theaters
    */
    public function __construct(
      public string $id,
      public string $name,
      public string $province_id,
      public Lazy|ProvinceData $province,
      public Lazy|Collection $theaters,
    ) {}

    public static function fromModel(City $city): self
    {
        return new self(
            $city->id,
            $city->name,
            $city->province_id,
            Lazy::create(fn() => ProvinceData::from($city->province)),
            Lazy::create(fn() => TheaterData::collect($city->theaters)),
        );
    }
}
