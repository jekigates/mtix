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
            'password' => Hash::make('12345678'),
            'phone_number' => '082351980595',
            'address' => 'Jl. Kebon Jeruk No. 1',
            'province' => 'DKI Jakarta',
            'city' => 'Jakarta Barat',
            'gender' => 'Male',
            'dob' => date('Y-m-d', strtotime('2004-07-17')),
        ]);
    }
}
