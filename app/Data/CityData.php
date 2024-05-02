<?php

namespace App\Data;

use App\Models\City;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class CityData extends Data
{
    public function __construct(
      public string $id,
      public string $name,
      public Lazy|ProvinceData $province,
    ) {}

    public static function fromModel(City $city): self
    {
        return new self(
            $city->id,
            $city->name,
            Lazy::create(fn() => ProvinceData::from($city->province)),
        );
    }
}
