<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class GenreData extends Data
{
    public function __construct(
      public string $id,
      public string $name,
    ) {}
}
