<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Branch::create(['name' => 'Main Branch', 'location' => 'Downtown']);
        Branch::create(['name' => 'West Branch', 'location' => 'West City']);
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Manager',
            'email' => 'manager@example.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
        ]);
        User::create([
            'name' => 'Technician',
            'email' => 'technician@example.com',
            'password' => Hash::make('password'),
            'role' => 'technician',
            'branch_id' => 1,
        ]);
        User::create([
            'name' => 'Accountant',
            'email' => 'accountant@example.com',
            'password' => Hash::make('password'),
            'role' => 'accountant',
            'branch_id' => 1,
        ]);
        User::create([
            'name' => 'Receptionist',
            'email' => 'receptionist@example.com',
            'password' => Hash::make('password'),
            'role' => 'receptionist',
            'branch_id' => 1,
        ]);
    }
}