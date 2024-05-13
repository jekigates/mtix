<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Image extends Model
{
    use HasFactory, HasUuids;

    /**
     * Get the parent imageable model (product or promo).
     */
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }
}
