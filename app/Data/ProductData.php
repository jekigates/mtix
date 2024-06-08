<?php

namespace App\Data;

use App\Enums\ProductStatusesEnum;
use App\Models\Product;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Attributes\Computed;

class ProductData extends Data
{
    #[Computed]
    public int $theater_products_count;

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
        public string $created_at,
        public string $updated_at,
    ) {
        $this->theater_products_count = $this->theater_products->count();
    }

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
            $product->created_at,
            $product->updated_at,
        );
    }
}
