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
        Schema::create('land_agricultures', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('poktan_id');
            $table->foreign('poktan_id')
                ->references('id')
                ->on('poktans')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('subak_id');
            $table->foreign('subak_id')
                ->references('id')
                ->on('subaks')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('type_land_agriculture_id');
            $table->foreign('type_land_agriculture_id')
                ->references('id')
                ->on('type_land_agricultures')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('layer_group_id');
            $table->foreign('layer_group_id')
                ->references('id')
                ->on('layer_grups')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('owner', 50);
            $table->json('location');
            $table->text('address');
            $table->json('area_json');
            $table->string('land_area');
            $table->boolean('is_active');
            $table->string('icon')->default('/assets/icons/icon-layer/lahan-pertanian.png');
            $table->text('photo');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('land_agricultures');
    }
};
