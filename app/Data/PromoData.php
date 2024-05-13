<?php

namespace App\Data;

use App\Models\Promo;
use Spatie\LaravelData\Data;

class PromoData extends Data
{
    public function __construct(
      public string $id,
      public string $name,
      public string $description,
      public string $image,
      public string $banner_image,
      public string $valid_start_date,
      public string $valid_end_date,
    ) {}

    public static function fromModel(Promo $promo): self
    {
        return new self(
            $promo->id,
            $promo->name,
            $promo->description,
            asset($promo->image->url),
            asset($promo->banner_image),
            $promo->valid_start_date,
            $promo->valid_end_date,
        );
    }
}
