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
            $table->string('description', length: 100);
            $table->string('producer', length: 50)->nullable();
            $table->string('director', length: 50)->nullable();
            $table->string('writer', length: 50)->nullable();
            $table->string('cast', length: 50)->nullable();
            $table->string('distributor', length: 50)->nullable();
            $table->string('website', length: 50)->nullable();
            $table->integer('duration');
            $table->string('image', length: 50);
            $table->string('trailer', length: 50);
            $table->date('screening_start_date')->nullable();
            $table->date('screening_end_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
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
