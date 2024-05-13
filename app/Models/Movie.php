<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Movie extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    /**
     * Get the movie's image.
     */
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'movie_genres');
    }

    public function theaters(): BelongsToMany
    {
        return $this->belongsToMany(Theater::class, 'theater_movies');
    }

    public function theaterMovies(): HasMany
    {
        return $this->hasMany(TheaterMovie::class);
    }

    public function getActiveTheaters($city_id)
    {
        $theaters = Theater::whereIn('id', $this->theaters->pluck('id'))
        ->whereRelation('location', 'city_id', $city_id)
        ->whereRelation('showtimes', 'start_at', '>=', date('Y-m-d'))
        ->get();

        return $theaters;
    }

    public function getActiveTheaterMovies($city_id, $theater_id = null)
    {
        $theaters = Theater::whereIn('id', ($theater_id) ? [$theater_id] : $this->theaters->pluck('id'))
        ->whereRelation('location', 'city_id', $city_id)
        ->whereRelation('showtimes', 'start_at', '>=', date('Y-m-d'))
        ->get();

        $theater_movies = TheaterMovie::whereIn('theater_id', $theaters->pluck('id'))
        ->where('movie_id', $this->id)
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
