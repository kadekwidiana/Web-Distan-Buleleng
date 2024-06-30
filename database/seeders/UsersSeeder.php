<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'role' => 'admin',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // Encrypt password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'PPL 1',
                'email' => 'ppl1@gmail.com',
                'role' => 'ppl',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // Encrypt password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'PPL 3',
                'email' => 'ppl3@gmail.com',
                'role' => 'ppl',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // Encrypt password
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
