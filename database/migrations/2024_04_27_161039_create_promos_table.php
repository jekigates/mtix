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
        Schema::create('promos', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->string('name', length: 50);
            $table->text('description');
            $table->string('image', length: 50);
            $table->string('banner_image', length: 50);
            $table->date('valid_start_date');
            $table->date('valid_end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promos');
    }
};
