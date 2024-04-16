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
        Schema::create('theaters', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->string('name', 50);
            $table->char('location_id', 36);
            $table->foreign('location_id')->references('id')->on('locations');
            $table->string('contact', 16);
            $table->char('cinema_id', 36);
            $table->foreign('cinema_id')->references('id')->on('cinemas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theaters');
    }
};
