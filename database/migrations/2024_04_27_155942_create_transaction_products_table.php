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
            $table->char('id', length: 36)->primary();
            $table->char('transaction_id', length: 36);
            $table->foreign('transaction_id')->references('id')->on('transactions');
            $table->char('theater_product_id', length: 36);
            $table->foreign('theater_product_id')->references('id')->on('theater_products');
            $table->integer('quantity');
            $table->unique(['transaction_id', 'theater_product_id']);
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
