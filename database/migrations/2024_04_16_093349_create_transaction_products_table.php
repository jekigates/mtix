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
        Schema::create('transaction_products', function (Blueprint $table) {
            $table->char('transaction_id', 36);
            $table->foreign('transaction_id')->references('id')->on('transaction_headers');
            $table->char('product_variant_id', 36);
            $table->foreign('product_variant_id')->references('id')->on('product_variants');
            $table->integer('quantity');
            $table->primary(['transaction_id', 'product_variant_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_products');
    }
};
