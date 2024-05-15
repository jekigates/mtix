<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ProductVariantData extends Data
{
    public function __construct(
        public string $id,
        public string $product_id,
        public string $name,
        public null|int $price,
    ) {}
}
