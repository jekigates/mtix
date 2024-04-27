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
            $table->char('movie_id', length: 36);
            $table->foreign('movie_id')->references('id')->on('movies');
            $table->char('studio_id', length: 36);
            $table->foreign('studio_id')->references('id')->on('studios');
            $table->timestamp('start_at');
            $table->unique(['movie_id', 'studio_id', 'start']);
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
