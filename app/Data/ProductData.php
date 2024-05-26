<?php

namespace App\Data;

use App\Models\Product;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class ProductData extends Data
{
    /**
    * @param Lazy|Collection<int, ProductVariantData> $variants
    */
    public function __construct(
        public string $id,
        public string $name,
        public string $description,
        public string $recipe,
        public string $category_id,
        public string $image,
        public Lazy|CategoryData $category,
        public Lazy|Collection $variants,
        public string $created_at,
        public string $updated_at,
    ) {}

    public static function fromModel(Product $product): self
    {
        return new self(
            $product->id,
            $product->name,
            $product->description,
            $product->recipe,
            $product->category_id,
            asset($product->image->url),
            Lazy::create(fn() => CategoryData::from($product->category)),
            Lazy::create(fn() => ProductVariantData::collect($product->variants)),
            $product->created_at,
            $product->updated_at,
        );
    }
}
