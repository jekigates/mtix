<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductVariant extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'price'];

    /**
     * Get the product that owns the product variant.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function theaterProducts(): HasMany
    {
        return $this->hasMany(TheaterProduct::class);
    }
}
