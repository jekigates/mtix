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
        public string $image,
        public string $created_at,
        public string $updated_at,
      ) {}

      public static function fromModel(Info $info): self
      {
          return new self(
                $info->id,
                $info->title,
                $info->description,
                asset($info->image->url),
                $info->created_at,
                $info->updated_at,
          );
      }
}
