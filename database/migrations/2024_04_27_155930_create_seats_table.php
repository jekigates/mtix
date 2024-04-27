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
        Schema::create('seats', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->char('studio_id', length: 36);
            $table->foreign('studio_id')->references('id')->on('studios');
            $table->char('row_code', length: 1);
            $table->integer('column_number');
            $table->unique(['studio_id', 'row_code', 'column_number']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
