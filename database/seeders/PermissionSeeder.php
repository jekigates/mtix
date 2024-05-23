<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
// use Spatie\Permission\Models\Role;
use App\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        // Permission::create(['name' => 'edit articles']);
        // Permission::create(['name' => 'delete articles']);
        // Permission::create(['name' => 'publish articles']);
        // Permission::create(['name' => 'unpublish articles']);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'admin']);
        // $role1->givePermissionTo('edit articles');
        // $role1->givePermissionTo('delete articles');

        $role2 = Role::create(['name' => 'owner']);
        // $role2->givePermissionTo('publish articles');
        // $role2->givePermissionTo('unpublish articles');

        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create demo users
        $user = User::factory()->create([
            'name' => 'Jeki Gates',
            'email' => 'jekigates2004@gmail.com',
            'password' => Hash::make('jekigates'),
            'phone_number' => '081234567890',
            'address' => 'Jl. Kebon Jeruk No. 1',
            'city_id' =>  City::all()->random()->id,
            'gender' => 'Male',
            'dob' => '2004-07-17',
        ]);
        $user->assignRole($role1);

        // $user = User::factory()->create([
        //     'name' => 'Example Admin User',
        //     'email' => 'admin@example.com',
        // ]);
        // $user->assignRole($role2);

        // $user = User::factory()->create([
        //     'name' => 'Example Super-Admin User',
        //     'email' => 'superadmin@example.com',
        // ]);
        // $user->assignRole($role3);
    }
}
