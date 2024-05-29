<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Promo;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $promos = [
            [
                'name' => 'Weekendasik Pakai M.food',
                'image' => 'images/promos/images/weekend-asik.jpg',
                'banner_image' => 'images/promos/banner-images/weekend-asik.jpg',
            ],
            [
                'name' => 'Xxi Cafe - Pesan Xxi Snack Box Di Sini!',
                'image' => 'images/promos/images/snackbox.jpg',
                'banner_image' => 'images/promos/banner-images/snackbox.jpg',
            ],
            [
                'name' => 'Mandiri - Cashback 100% Qr Livin By Mandiri',
                'image' => 'images/promos/images/mandiri-cashback.jpg',
                'banner_image' => 'images/promos/banner-images/mandiri-cashback.jpeg',
            ]
        ];

        foreach ($promos as $promo) {
            $new_promo = Promo::factory()->create([
                'name' => $promo['name'],
            ]);

            $banner = $new_promo->banner()->create();
            $banner->image()->create([
                'url' => $promo['banner_image'],
            ]);

            $new_promo->image()->create([
                'url' => $promo['image'],
            ]);
        }
    }
}
