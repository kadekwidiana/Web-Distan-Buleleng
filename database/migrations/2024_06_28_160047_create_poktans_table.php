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
        Schema::create('poktans', function (Blueprint $table) {
            $table->id();
            $table->string('village_id');
            $table->foreign('village_id')
                ->references('id')
                ->on('villages')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('gapoktan_id')->nullable();
            $table->foreign('gapoktan_id')
                ->references('id')
                ->on('gapoktans')
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
            $table->string('status');
            $table->string('ability_class');
            $table->string('group_confirmation_status');
            $table->string('year_of_class_assignment');
            $table->json('location');
            $table->text('address');
            $table->string('icon')->default('/assets/icons/icon-layer/poktan.png');
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
        Schema::dropIfExists('poktans');
    }
};
