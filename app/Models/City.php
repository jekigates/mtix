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

    public function cinemas(): HasManyThrough
    {
        return $this->hasManyThrough(Cinema::class, Location::class);
    }

    public function get_active_movies()
    {
        $cinemas = $this->cinemas;
        $cinema_movies = CinemaMovie::whereIn('cinema_id', $cinemas->pluck('id'))->groupBy('movie_id')->get();
        $active_movies = $cinema_movies->map(function ($cinema_movie) {
            $showtimes = $cinema_movie->showtimes()->where(date('Y-m-d', $cinema_movie->start_at), '>=', date('Y-m-d'))->get();;

            if ($showtimes) return $cinema_movie;
        });
        $movies = Movie::whereIn('id', $active_movies->pluck('movie_id'))->get();

        return $movies;
    }

    public function get_upcoming_movies()
    {
        $cinemas = $this->cinemas;
        $cinema_movies = CinemaMovie::whereIn('cinema_id', $cinemas->pluck('id'))->groupBy('movie_id')->get();
        $movies = Movie::whereIn('id', $cinema_movies->pluck('movie_id'))->where('screening_start_date', '=', null)->get();

        return $movies;

    }
}
