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
        Schema::create('locations', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->string('name', length: 50);
            $table->string('contact', length: 16)->unique();
            $table->string('address', length: 100);
            $table->char('city_id', length: 36);
            $table->foreign('city_id')->references('id')->on('cities');
            $table->char('user_id', length: 36);
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
