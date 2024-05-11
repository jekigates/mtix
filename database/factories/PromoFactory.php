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
        $valid_start_date = now()->addDays(fake()->numberBetween(0, 7));

        return [
            'description' => fake()->paragraphs(9, true),
            'image' => 'img/promos/weekend-asik.jpg',
            'banner_image' => 'img/promos/banner-images/weekend-asik.jpg',
            'valid_start_date' => $valid_start_date->toDateString(),
            'valid_end_date' => $valid_start_date->addDays(7)->toDateString(),
        ];
    }
}
