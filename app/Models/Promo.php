<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Builder;

class Promo extends Model
{
    use HasFactory, HasUuids;

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('active', function (Builder $builder) {
            $builder->where('valid_start_date', '<=', now())
            ->where('valid_end_date', '>=', now())
            ->orWhere('valid_start_date', '>', now());
        });
    }

    public function scopeValid(Builder $query): void
    {
        $query->where('valid_start_date', '<=', now())
        ->Where('valid_end_date', '>=', now());
    }

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
