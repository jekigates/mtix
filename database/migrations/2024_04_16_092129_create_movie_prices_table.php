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
        Schema::create('movie_prices', function (Blueprint $table) {
            $table->char('movie_id', 36);
            $table->foreign('movie_id')->references('id')->on('movies');
            $table->char('cinema_id', 36);
            $table->foreign('cinema_id')->references('id')->on('cinemas');
            $table->primary(['movie_id', 'cinema_id']);
            $table->integer('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_prices');
    }
};
