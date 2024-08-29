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
        Schema::create('analysis_geospatials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('land_agriculture_id');
            $table->foreign('land_agriculture_id')
                ->references('id')
                ->on('land_agricultures')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->json('data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analysis_geospatials');
    }
};
