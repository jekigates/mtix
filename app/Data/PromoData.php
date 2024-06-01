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
      public int $discount,
      public string $valid_start_date,
      public string $valid_end_date,
      public string $image,
      public string $created_at,
      public string $updated_at,
    ) {}

    public static function fromModel(Promo $promo): self
    {
        return new self(
            $promo->id,
            $promo->name,
            $promo->description,
            $promo->discount,
            $promo->valid_start_date,
            $promo->valid_end_date,
            asset($promo->image->url),
            $promo->created_at,
            $promo->updated_at,
        );
    }
}
