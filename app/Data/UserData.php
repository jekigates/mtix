<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $phone_number,
        public string $address,
        public string $city_id,
        public string $gender,
        public string $dob,
    ) {}
}
