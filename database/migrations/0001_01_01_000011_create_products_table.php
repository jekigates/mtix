<?php

use App\Enums\ProductStatusesEnum;
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
        Schema::create('products', function (Blueprint $table) {
            $table->char('id', length: 36)->primary();
            $table->string('name', length: 50);
            $table->string('description', length: 100);
            $table->text('recipe');
            $table->char('category_id', length: 36);
            $table->foreign('category_id')->references('id')->on('categories');
            $table->enum('status', ProductStatusesEnum::toArray());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
