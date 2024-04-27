<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Banner>
 */
class BannerFactory extends Factory
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

                Storage::disk('public')->put('banner-images/' . $filename, file_get_contents('https://source.unsplash.com/random'));

                return 'storage/banner-images/' . $filename;
            },
        ];
    }
}
