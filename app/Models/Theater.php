<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Theater extends Model
{
    use HasFactory, HasUuids;

    public function studios(): HasMany
    {
        return $this->hasMany(Studio::class);
    }

    public function theaterMovies(): HasMany
    {
        return $this->hasMany(TheaterMovie::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function showtimes(): HasManyThrough
    {
        return $this->hasManyThrough(Showtime::class, TheaterMovie::class);
    }

    public function theaterProducts(): HasMany
    {
        return $this->hasMany(TheaterProduct::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'theater_products');
    }

    public function getActiveTheaterMovies()
    {
        $theater_movies = TheaterMovie::where('theater_id', $this->id)
        ->whereRelation('showtimes', 'start_at', '>=', date('Y-m-d'))
        ->get()
        ->filter(function ($theater_movie) {
            $start_at = $theater_movie->showtimes->where('start_at', '>=', date('Y-m-d'))->min('start_at');
            $showtimes = Showtime::whereIn('id', $theater_movie->showtimes->pluck('id'))->where('start_at', '>=', date('Y-m-d'))->where('start_at', '<', date('Y-m-d', strtotime($start_at . '+1 day')))->orderBy('start_at')->get();
            $theater_movie->showtimes = $showtimes;

            return $theater_movie;
        });

        return $theater_movies;
    }
}
