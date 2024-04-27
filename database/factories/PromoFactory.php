<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Promo>
 */
class PromoFactory extends Factory
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
            'description' => fake()->text(),
            'image' => function () {
                $filename = uniqid() . '.jpg';

                Storage::disk('public')->put('promo-images/' . $filename, file_get_contents('https://source.unsplash.com/random'));

                return 'storage/promo-images/' . $filename;
            },
        ];
    }
}
