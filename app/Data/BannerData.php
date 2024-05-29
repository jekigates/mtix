<?php

namespace App\Data;

use App\Models\Banner;
use Spatie\LaravelData\Data;

class BannerData extends Data
{
    public function __construct(
        public string $id,
        public string $image,
    ) {}

    public static function fromModel(Banner $banner): self
    {
        return new self(
            $banner->id,
            asset($banner->image->url),
        );
    }
}
