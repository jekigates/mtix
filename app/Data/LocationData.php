<?php

namespace App\Data;

use App\Models\Location;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class LocationData extends Data
{
    #[Computed]
    public int $theaters_count;

    /**
    * @param Lazy|Collection<int, TheaterData> $theaters
    */
    public function __construct(
        public string $id,
        public string $name,
        public string $contact,
        public string $address,
        public string $city_id,
        public string $user_id,
        public string $created_at,
        public Lazy|CityData $city,
        public Lazy|UserData $user,
        public Lazy|Collection $theaters,
    ) {
        $this->theaters_count = $this->theaters->count();
    }

    public static function fromModel(Location $location): self
    {
        return new self(
            $location->id,
            $location->name,
            $location->contact,
            $location->address,
            $location->city_id,
            $location->user_id,
            $location->created_at,
            Lazy::create(fn() => CityData::from($location->city)),
            Lazy::create(fn() => UserData::from($location->user)),
            Lazy::create(fn() => TheaterData::collect($location->theaters)),
        );
    }
}
