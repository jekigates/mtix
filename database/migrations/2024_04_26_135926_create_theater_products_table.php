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
        Schema::create('theater_products', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->char('theater_id', length: 36);
            $table->foreign('theater_id')->references('id')->on('theaters');
            $table->char('product_id', length: 36);
            $table->foreign('product_id')->references('id')->on('products');
            $table->char('product_variant_id', length: 36);
            $table->foreign('product_variant_id')->references('id')->on('product_variants');
            $table->integer('stock');
            $table->unique(['theater_id', 'product_id', 'product_variant_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theater_products');
    }
};
