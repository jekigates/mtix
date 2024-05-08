<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class BrandData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
    ) {}
}
