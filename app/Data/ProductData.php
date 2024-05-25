<?php

namespace App\Data;

use App\Models\Product;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class ProductData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $description,
        public string $category_id,
        public string $image,
        public Lazy|CategoryData $category,
        public string $created_at,
        public string $updated_at,
    ) {}

    public static function fromModel(Product $product): self
    {
        return new self(
            $product->id,
            $product->name,
            $product->description,
            $product->category_id,
            asset($product->image->url),
            Lazy::create(fn() => CategoryData::from($product->category)),
            $product->created_at,
            $product->updated_at,
        );
    }
}
