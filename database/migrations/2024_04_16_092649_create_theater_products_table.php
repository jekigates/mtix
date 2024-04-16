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
            $table->char('theater_id', 36);
            $table->foreign('theater_id')->references('id')->on('theaters');
            $table->char('product_variant_id', 36);
            $table->foreign('product_variant_id')->references('id')->on('product_variants');
            $table->primary(['theater_id', 'product_variant_id']);
            $table->integer('stock');
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
