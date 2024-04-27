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
        Schema::create('transaction_headers', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->char('user_id', length: 36);
            $table->foreign('user_id')->references('id')->on('users');
            $table->char('showtime_id', length: 36);
            $table->foreign('showtime_id')->references('id')->on('showtimes');
            $table->char('promo_id', length: 36);
            $table->foreign('promo_id')->references('id')->on('promos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_headers');
    }
};
