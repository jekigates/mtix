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
        Schema::create('theater_movies', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->char('theater_id', length: 36);
            $table->foreign('theater_id')->references('id')->on('theaters');
            $table->char('movie_id', length: 36);
            $table->foreign('movie_id')->references('id')->on('movies');
            $table->integer('price');
            $table->unique(['theater_id', 'movie_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theater_movies');
    }
};
