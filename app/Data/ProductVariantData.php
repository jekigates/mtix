<?php

namespace App\Data;

use App\Models\ProductVariant;
use Spatie\LaravelData\Data;

class ProductVariantData extends Data
{
    public function __construct(
        public string $id,
        public string $product_id,
        public string $name,
        public int $stock,
        public int $price,
    ) {}

    public static function fromModel(ProductVariant $productVariant): self
    {
        return new self(
            $productVariant->id,
            $productVariant->product_id,
            $productVariant->name,
            $productVariant->stock,
            $productVariant->price,
        );
    }
}
