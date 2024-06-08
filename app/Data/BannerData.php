<?php

namespace App\Data;

use App\Models\Banner;
use Spatie\LaravelData\Data;

class BannerData extends Data
{
    public function __construct(
        public string $id,
        public string $bannerable_id,
        public string $bannerable_type,
        public string $created_at,
        public string $image,
    ) {}

    public static function fromModel(Banner $banner): self
    {
        return new self(
            $banner->id,
            $banner->bannerable_id,
            $banner->bannerable_type,
            $banner->created_at,
            asset($banner->image->url),
        );
    }
}
