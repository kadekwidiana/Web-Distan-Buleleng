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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 16);
            $table->string('name');
            $table->string('email')->unique()->nullable();
            $table->text('foto')->nullable();
            $table->text('address');
            $table->string('phone_number', 20);
            $table->string('role')->default('PPL'); //pake string karna nanti role nya belum tentu apa saja
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable(); // bisa null tergantung role nya
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
