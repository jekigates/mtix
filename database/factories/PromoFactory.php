<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
            'discount' => fake()->numberBetween(1, 3) * 5000,
            'valid_start_date' => $valid_start_date->toDateString(),
            'valid_end_date' => $valid_start_date->addDays(7)->toDateString(),
            'description' => fake()->paragraphs(9, true),
        ];
    }
}
