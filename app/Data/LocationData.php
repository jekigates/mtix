<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class LocationData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $contact,
        public string $address,
        public string $city_id,
        public string $user_id,
    ) {}
}
