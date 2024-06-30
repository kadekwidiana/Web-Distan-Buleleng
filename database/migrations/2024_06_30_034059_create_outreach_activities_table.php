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
        Schema::create('outreach_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('built_area_id');
            $table->foreign('built_area_id')
                ->references('id')
                ->on('built_areas')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('title', 255);
            $table->json('location');
            $table->text('address');
            $table->text('photo');
            $table->text('file');
            $table->text('notes');
            $table->text('activity_report');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outreach_activities');
    }
};
