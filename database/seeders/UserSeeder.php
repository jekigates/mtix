<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Jeki Gates',
            'email' => 'jekigates2004@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('123456'),
            'phone_number' => '082351980595',
        ]);
    }
}
