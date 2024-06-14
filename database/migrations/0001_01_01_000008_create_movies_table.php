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
        Schema::create('movies', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->string('title', length: 50);
            $table->string('description');
            $table->integer('minimum_age');
            $table->string('type', length: 50);
            $table->string('producer')->nullable();
            $table->string('director', length: 50)->nullable();
            $table->string('writer', length: 100)->nullable();
            $table->string('cast')->nullable();
            $table->string('distributor', length: 100)->nullable();
            $table->string('website')->nullable();
            $table->integer('runtime');
            $table->string('trailer', length: 50);
            $table->date('screening_start_date')->nullable();
            $table->date('screening_end_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
