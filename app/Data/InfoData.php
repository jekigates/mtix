<?php

namespace App\Data;

use App\Models\Info;
use Spatie\LaravelData\Data;

class InfoData extends Data
{
    public function __construct(
        public string $id,
        public string $title,
        public string $description,
        public string $created_at,
        public string $updated_at,
      ) {}
}
