<?php

namespace App\Data;

use App\Models\ProductVariant;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Attributes\Computed;

class ProductVariantData extends Data
{
    #[Computed]
    public int $theater_products_count;

    /**
    * @param Lazy|Collection<int, TheaterProductData> $theater_products
    */
    public function __construct(
        public string $id,
        public string $product_id,
        public string $name,
        public int $price,
        public Lazy|Collection $theater_products,
    ) {
        $this->theater_products_count = $theater_products->count();
    }

    public static function fromModel(ProductVariant $productVariant): self
    {
        return new self(
            $productVariant->id,
            $productVariant->product_id,
            $productVariant->name,
            $productVariant->price,
            Lazy::create(fn() => TheaterProductData::collect($productVariant->theaterProducts)),
        );
    }
}
