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
            $table->string('village_id');
            $table->foreign('village_id')
                ->references('id')
                ->on('villages')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('ppl_nip');
            $table->foreign('ppl_nip')
                ->references('nip')
                ->on('ppls')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('title', 255);
            $table->json('location');
            $table->text('address');
            $table->text('photo');
            $table->text('file')->nullable();
            $table->text('notes');
            $table->text('activity_report');
            $table->string('others_involved', 255)->nullable();
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
