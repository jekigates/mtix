<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class PromoData extends Data
{
    public function __construct(
      public string $id,
      public string $name,
      public string $description,
      public string $image,
      public string $banner_image,
    ) {}
}
