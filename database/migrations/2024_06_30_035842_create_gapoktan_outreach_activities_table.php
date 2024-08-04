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
        Schema::create('gapoktan_outreach_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('outreach_activities_id');
            $table->foreign('outreach_activities_id')
                ->references('id')
                ->on('outreach_activities')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('gapoktan_id');
            $table->foreign('gapoktan_id')
                ->references('id')
                ->on('gapoktans')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gapoktan_outreach_activities');
    }
};
