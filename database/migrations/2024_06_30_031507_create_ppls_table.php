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
        Schema::create('ppls', function (Blueprint $table) {
            $table->string('nip', 18)->primary();
            $table->unsignedBigInteger('account_id')->unique();
            $table->foreign('account_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->string('name', 50);
            $table->string('employee_status', 50);
            $table->string('front_title', 50)->nullable();
            $table->string('back_title', 50)->nullable();
            $table->string('place_of_birth', 255);
            $table->date('date_of_birth');
            $table->string('gender', 20);
            $table->string('religion', 50);
            $table->string('areas_of_expertise', 50);
            $table->string('last_education', 50);
            $table->string('field_of_education', 50);
            $table->string('major', 50);
            $table->string('school_name', 50);
            $table->string('work_location', 255);
            $table->date('date_sk');
            $table->date('date_spmt');
            $table->string('position', 255);
            $table->string('address', 255);
            $table->string('provinsi', 50);
            $table->string('regency', 50);
            $table->string('post_code', 10);
            $table->string('phone_number', 15);
            $table->string('email', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppls');
    }
};
