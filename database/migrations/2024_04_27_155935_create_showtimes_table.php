<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('showtimes', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->char('theater_movie_id', length: 36);
            $table->foreign('theater_movie_id')->references('id')->on('theater_movies');
            $table->char('studio_id', length: 36);
            $table->foreign('studio_id')->references('id')->on('studios');
            $table->timestamp('start_at');
            $table->unique(['theater_movie_id', 'studio_id', 'start_at']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('showtimes');
    }
};
