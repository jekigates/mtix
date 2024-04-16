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
        Schema::create('transaction_seats', function (Blueprint $table) {
            $table->char('transaction_id', 36);
            $table->foreign('transaction_id')->references('id')->on('transaction_headers');
            $table->char('seat_id', 36);
            $table->foreign('seat_id')->references('id')->on('seats');
            $table->primary(['transaction_id', 'seat_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_seats');
    }
};
