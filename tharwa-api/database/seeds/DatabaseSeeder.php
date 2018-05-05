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
//        $commissions = DB::table('commissions');
//        $commissions->insert([
//            'code' => '',
//        ]);

        $accountTypes = DB::table('accountTypes');
        $accountTypes->insert([
            'code' => 'COUR',
            'name' => 'courant',
        ]);
        $accountTypes->insert([
            'code' => 'EPARN',
            'name' => 'épargne',
        ]);
        $accountTypes->insert([
            'code' => 'DVEUR',
            'name' => 'devise euro',
        ]);
        $accountTypes->insert([
            'code' => 'DVUSD',
            'name' => 'devise dollar',
        ]);


        $currencies = DB::table('currencies');
        $currencies->insert([
            'code' => 'DZD',
            'name' => 'DINAR ALGERIAN',
        ]);
        $currencies->insert([
            'code' => 'EUR',
            'name' => 'EURO',
        ]);
        $currencies->insert([
            'code' => 'USD',
            'name' => 'DOLAR AMERICAN',
        ]);

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

        $accounts  = DB::table('accounts');
        $accounts->insert([
            'number'=>'THW000000DZD',
            'currency_id'=>'DZD',
            'type_id'=>'COUR',
            'client_id'=>'gestionnaire@tharwa.com',
        ]);
        $accounts->insert([
            'number'=>'THW000001DZD',
            'currency_id'=>'DZD',
            'type_id'=>'COUR',
            'client_id'=>'client@domaine.com',
        ]);
        $accounts->insert([
            'number'=>'THW000002DZD',
            'currency_id'=>'DZD',
            'type_id'=>'COUR',
            'client_id'=>'a@d.c',
        ]);


        $banks  = DB::table('banks');
        $banks->insert([
            'code'=>'THW',
            'name'=>'tharwa',
            'email'=>'tharwa@thrwa.dz',
            'address'=>'Esi ^^',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        $banks->insert([
            'code'=>'BNA',
            'name'=>'bank bna',
            'email'=>'bna@bna.dz',
            'address'=>'Esi ^^',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        $banks->insert([
            'code'=>'BDL',
            'name'=>'bank bdl',
            'email'=>'bdl@bdl.dz',
            'address'=>'Esi ^^',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
    }
}
