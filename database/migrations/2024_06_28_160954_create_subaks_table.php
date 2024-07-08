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
        Schema::create('subaks', function (Blueprint $table) {
            $table->id();
            $table->string('village_id');
            $table->foreign('village_id')
                ->references('id')
                ->on('villages')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('layer_group_id');
            $table->foreign('layer_group_id')
                ->references('id')
                ->on('layer_grups')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('name', 50);
            $table->string('leader', 50);
            $table->string('secretary', 50);
            $table->string('treasurer', 50);
            $table->integer('number_of_members');
            $table->string('since', 4);
            $table->json('location');
            $table->text('address');
            $table->string('icon')->default('/assets/icons/icon-layer/subak.png');
            $table->text('photo');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subaks');
    }
};
