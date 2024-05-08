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
            $table->char('id', length: 36)->primary();
            $table->char('location_id', length: 36);
            $table->foreign('location_id')->references('id')->on('locations');
            $table->char('brand_id', length: 36);
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->unique(['location_id', 'brand_id']);
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
