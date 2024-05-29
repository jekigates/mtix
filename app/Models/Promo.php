<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Promo extends Model
{
    use HasFactory, HasUuids;

    /**
     * Get the promo's image.
     */
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * Get the promo's banner.
     */
    public function banner(): MorphOne
    {
        return $this->morphOne(Banner::class, 'bannerable');
    }
}
