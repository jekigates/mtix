<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = City::all();

        foreach ($cities as $city) {
            Location::factory(3)->create([
                'city_id' => $city->id,
                'user_id' => User::all()->random()->id,
            ]);
        }
    }
}
