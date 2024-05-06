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
        Schema::create('movie_genres', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->char('genre_id', length: 36);
            $table->foreign('genre_id')->references('id')->on('genres');
            $table->char('movie_id', length: 36);
            $table->foreign('movie_id')->references('id')->on('movies');
            $table->unique(['genre_id', 'movie_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_genres');
    }
};
