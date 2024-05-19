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
            'img/news-images/garfield.jpg',
            'img/news-images/waspada.jpg',
            'img/news-images/makin-asik.jpg',
        ];

        foreach ($images as $image) {
            $infos = Info::factory()->create();

            $infos->image()->create([
                'url' => $image,
            ]);
        }
    }
}
