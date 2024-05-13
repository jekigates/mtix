<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ProductData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $product_category_id,
        public string $image,
    ) {}
}
