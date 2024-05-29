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
        $bannerImages = [
            'images/infos/garfield.jpg',
            'images/infos/waspada.jpg',
            'images/infos/makin-asik.jpg',
        ];

        foreach ($bannerImages as $bannerImage) {
            $info = Info::factory()->create();

            $banner = $info->banner()->create();
            $banner->image()->create([
                'url' => $bannerImage,
            ]);
        }
    }
}
