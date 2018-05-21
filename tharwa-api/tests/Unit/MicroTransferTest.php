<?php

namespace Tests\Unit;

use App\Client;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MicroTransferTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testDidMicroTodayToSameClientFunction()
    {
        /**given**/
        // we have 2 client with their 2 "courant" accounts
        // & the sender has a valid access token and pin
        Client::create([
            'email' => 'sender@tharwa.dz',
            'firstName' => 'cltest',
            'lastName' => 'cltest',
            'password' => bcrypt('clientmdp'),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => '+213553673740',
            'type' => 'Client',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        Account::create([
            'number' => 'THW445566DZD',
            'isValid' => true,
            'currency_id' => 'DZD',
            'type_id' => 'COUR',
            'balance' => '100000',
            'client_id' => 'sender@tharwa.dz',
        ]);
        Client::create([
            'email' => 'reciever@tharwa.dz',
            'firstName' => 'cltest',
            'lastName' => 'cltest',
            'password' => bcrypt('clientmdp'),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => '+213553673740',
            'type' => 'Client',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        Account::create([
            'number' => 'THW112233DZD',
            'isValid' => true,
            'currency_id' => 'DZD',
            'type_id' => 'COUR',
            'client_id' => 'reciever@tharwa.dz',
        ]);
        $token = 'AZE45454ZRAZERAEZR';
        $pin = '2222';
        Token::create([
            'id' => 'just_a_dummy_temp_token',
            'user_id' => 'sender@tharwa.dz',
            'pin_code' => $pin,
            'pin_code_expires_at' =>
                \Carbon\Carbon::now()
                    ->addSeconds(3600)
                    ->format('Y-m-d H:i:s'),
            'scopes' => 'Client',
            'token' => $token,
        ]);
        $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/micro', [
            'account' => 'THW112233DZD',
            'amount' => '2000',
        ]);

        /**when**/
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/micro', [
            'account' => 'THW112233DZD',
            'amount' => '2000',
        ]);

        /**then**/
        $response
            ->assertStatus(config('code.NOT_FOUND'))
            ->assertJson(["micro" => false]);
    }
}
