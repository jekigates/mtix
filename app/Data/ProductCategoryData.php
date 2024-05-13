<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ProductCategoryData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
    ) {}
}
