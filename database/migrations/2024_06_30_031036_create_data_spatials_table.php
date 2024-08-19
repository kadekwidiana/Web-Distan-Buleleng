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
        Schema::create('data_spatials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('layer_group_id');
            $table->foreign('layer_group_id')
                ->references('id')
                ->on('layer_grups')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('name', 50);
            $table->text('url')->nullable();
            $table->text('file')->nullable();
            $table->string('type');
            $table->string('status');
            $table->string('color');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_spatials');
    }
};
