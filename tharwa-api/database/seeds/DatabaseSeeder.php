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
            'email' => 'bl_banquier@Tharwa.com',
            'firstName' => 'bantest',
            'lastName' => 'bantest',
            'password' => bcrypt('bl_bank'),
            'address' => 'oued essamar',
            'phone' => '+213553673740',
            'role' => 'Banquier',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        $managers->insert([
            'email' => 'gestionnaire@tharwa.com',
            'firstName' => 'gestest',
            'lastName' => 'gestest',
            'password' => bcrypt('Admin'),
            'address' => 'oued essamar',
            'phone' => '+213553673740',
            'role' => 'Gestionnaire',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);


        $clients = DB::table('clients');
        $clients->insert([
            'email' => 'client@domaine.com',
            'firstName' => 'cltest',
            'lastName' => 'cltest',
            'password' => bcrypt('clientmdp'),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => '+213553673740',
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
            'phone' => '+213553673740',
            'type' => 'Employeur',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);

    }
}
