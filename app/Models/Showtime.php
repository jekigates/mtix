<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Showtime extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    public function studio(): BelongsTo
    {
        return $this->belongsTo(Studio::class);
    }

    public function theaterMovie(): BelongsTo
    {
        return $this->belongsTo(TheaterMovie::class);
    }
}
