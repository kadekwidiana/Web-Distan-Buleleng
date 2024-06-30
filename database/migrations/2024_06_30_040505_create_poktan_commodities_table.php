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
        Schema::create('poktan_commodities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('commodity_id');
            $table->foreign('commodity_id')
                ->references('id')
                ->on('commodities')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('poktan_id');
            $table->foreign('poktan_id')
                ->references('id')
                ->on('poktans')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poktan_commodities');
    }
};
