<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->name(),
            'image' => function () {
                $filename = uniqid() . '.jpg';

                Storage::disk('public')->put('product-images/' . $filename, file_get_contents('https://source.unsplash.com/random'));

                return 'storage/product-images/' . $filename;
            },
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Product $product) {
            $isRegular = fake()->boolean();

            if ($isRegular) {
                ProductVariant::factory()->create([
                    'product_id' => $product->id,
                    'name' => 'Regular',
                ]);
            } else {
                $variantCount = fake()->numberBetween(0, 2);
                for ($i = 0; $i < $variantCount; $i++) {
                    ProductVariant::factory()->create([
                        'product_id' => $product->id,
                    ]);
                }
            }
        });
    }
}