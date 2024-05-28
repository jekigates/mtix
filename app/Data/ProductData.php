<?php

namespace App\Data;

use App\Enums\ProductStatusesEnum;
use App\Models\Product;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class ProductData extends Data
{
    /**
    * @param Lazy|Collection<int, ProductVariantData> $variants
    * @param Lazy|Collection<int, TheaterProductData> $theater_products
    */
    public function __construct(
        public string $id,
        public string $name,
        public string $description,
        public string $recipe,
        public string $category_id,
        public string $image,
        public ProductStatusesEnum $status,
        public Lazy|CategoryData $category,
        public Lazy|Collection $variants,
        public Lazy|Collection $theater_products,
        public Lazy|int $theater_products_count,
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
            $product->status,
            Lazy::create(fn() => CategoryData::from($product->category)),
            Lazy::create(fn() => ProductVariantData::collect($product->variants)),
            Lazy::create(fn() => TheaterProductData::collect($product->theaterProducts)),
            Lazy::create(fn() => $product->theaterProducts()->count()),
            $product->created_at,
            $product->updated_at,
        );
    }
}
