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
            $table->char('id', 36)->primary();
            $table->string('title', 50);
            $table->string('description', 100);
            $table->string('producer', 50)->nullable();
            $table->string('director', 50)->nullable();
            $table->string('writer', 50)->nullable();
            $table->string('cast', 100)->nullable();
            $table->string('distributor', 50)->nullable();
            $table->string('website', 50)->nullable();
            $table->integer('duration');
            $table->string('image', 50);
            $table->string('trailer', 50);
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
