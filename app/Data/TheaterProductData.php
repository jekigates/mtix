<?php

namespace App\Data;

use App\Models\TheaterProduct;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class TheaterProductData extends Data
{
    public function __construct(
        public string $id,
        public string $theater_id,
        public string $product_id,
        public ?string $product_variant_id,
        public int $stock,
        public Lazy|ProductData $product,
        public null|Lazy|ProductVariantData $product_variant,
    ) {}

    public static function fromModel(TheaterProduct $theater_product): self
    {
        return new self(
            $theater_product->id,
            $theater_product->theater_id,
            $theater_product->product_id,
            $theater_product->product_variant_id,
            $theater_product->stock,
            Lazy::create(fn() => ProductData::fromModel($theater_product->product)),
            $theater_product->productVariant ? Lazy::create(fn() => ProductVariantData::from($theater_product->productVariant)) : null,
        );
    }
}
