<?php

namespace Database\Seeders;

use App\Models\Info;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            'images/infos/garfield.jpg',
            'images/infos/waspada.jpg',
            'images/infos/makin-asik.jpg',
        ];

        foreach ($images as $image) {
            $infos = Info::factory()->create();

            $infos->image()->create([
                'url' => $image,
            ]);
        }
    }
}
