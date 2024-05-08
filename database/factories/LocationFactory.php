<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Location;
use App\Models\Theater;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->company() . ' Mall',
            'contact' => fake()->phoneNumber(),
            'address' => fake()->address(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Location $location) {
            $brandIds = Brand::inRandomOrder()->take(fake()->numberBetween(1, 3))->pluck('id');

            foreach ($brandIds as $brandId) {
                Theater::factory()->create([
                    'location_id' => $location->id,
                    'brand_id' => $brandId,
                ]);
            }
        });
    }
}
