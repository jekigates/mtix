<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

use function App\Helpers\generate_unsplash_image;

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
            'price' => fake()->numberBetween(1, 10) * 1000,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Product $product) {
            $product->image()->create([
                'url' => generate_unsplash_image('product-images'),
            ]);

            $variantCount = fake()->numberBetween(0, 2);
            for ($i = 0; $i < $variantCount; $i++) {
                ProductVariant::factory()->create([
                    'product_id' => $product->id,
                    'price' => fake()->boolean() ? fake()->numberBetween(1, 10) * 1000 : null,
                ]);
            }
        });
    }
}
