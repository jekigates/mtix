<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Movie extends Model
{
    use HasFactory, HasUuids;

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }
}
