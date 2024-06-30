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
        Schema::create('subak_commodities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('commodity_id');
            $table->foreign('commodity_id')
                ->references('id')
                ->on('commodities')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('subak_id');
            $table->foreign('subak_id')
                ->references('id')
                ->on('subaks')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subak_commodities');
    }
};
