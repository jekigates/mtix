<?php

namespace Database\Factories;

use App\Models\Seat;
use App\Models\Studio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Studio>
 */
class StudioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Studio $studio) {
            for ($i = 0; $i < 81; $i++) {
                Seat::factory()->create([
                    'studio_id' => $studio->id,
                    'row_code' => chr(65 + floor($i / 9)),
                    'column_number' => $i % 9 + 1,
                ]);
            }
        });
    }
}
