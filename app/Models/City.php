<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class City extends Model
{
    use HasFactory, HasUuids;

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function locations(): HasMany
    {
        return $this->hasMany(Location::class);
    }

    public function theaters(): HasManyThrough
    {
        return $this->hasManyThrough(Theater::class, Location::class);
    }

    public function getActiveMovies()
    {
        $theaters = $this->theaters;
        $theater_movies = TheaterMovie::whereIn('theater_id', $theaters->pluck('id'))->get();
        $active_movies = $theater_movies->filter(function ($theater_movie) {
            $showtimes = $theater_movie->showtimes()->whereDate('start_at', '>=', date('Y-m-d'))->get();

            return $showtimes->isNotEmpty();
        });
        $movies = Movie::whereIn('id', $active_movies->pluck('movie_id'))->get();

        return $movies;
    }

    public function getUpcomingMovies()
    {
        $theaters = $this->theaters;
        $theater_movies = TheaterMovie::whereIn('theater_id', $theaters->pluck('id'))->get();
        $movies = Movie::whereIn('id', $theater_movies->pluck('movie_id'))->where('screening_start_date', '=', null)->get();

        return $movies;
    }
}
