<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $managers = DB::table('managers');
        $managers->insert([
            'email' => 'a@a.c',
            'firstName' => 'bantest',
            'lastName' => 'bantest',
            'password' => bcrypt('1'),
            'address' => 'oued essamar',
            'phone' => str_random(9),
            'role' => 'Banquier',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        $managers->insert([
            'email' => 'gestionnaire@tharwa.con',
            'firstName' => 'gestest',
            'lastName' => 'gestest',
            'password' => bcrypt('1'),
            'address' => 'oued essamar',
            'phone' => str_random(9),
            'role' => 'Gestionnaire',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);


        $clients = DB::table('clients');
        $clients->insert([
            'email' => 'a@c.c',
            'firstName' => 'cltest',
            'lastName' => 'cltest',
            'password' => bcrypt('1'),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => str_random(9),
            'type' => 'Client',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        $clients->insert([
            'email' => 'a@d.c',
            'firstName' => 'emtest',
            'lastName' => 'emtest',
            'password' => bcrypt('1'),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => str_random(9),
            'type' => 'Employeur',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);

    }
}
