<?php

namespace Tests\Feature;

use App\Account;
use App\Client;
use App\InternTransfer;
use App\Token;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TransferTest extends TestCase
{
    use DatabaseTransactions;

    public function testVirementInternNeedValidationOK()
    {
        //given : we have 2 client with their 2 "courant" accounts
        // & the sender has a valid access token, pin and
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
            'client_id' => 'sender@tharwa.dz',
            'balance' => '1000000',//one million
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
            'number' => 'THW112233DZD', //todo check if it s the best way
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

        //when
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/intern', [
            'receiver' => ['account' => 'THW112233DZD'],
            'amount' => '200001',
            'reason' => 'somethingTest',
            'justification' => 'data:image/gif;base64,R0lGODlhAQABAAAAACw==',
        ]);


        //then
        $transferRaw = InternTransfer::where('source_id', 'THW445566DZD')
            ->where('destination_id', 'THW112233DZD')
            ->where('reason', 'somethingTest')
            ->where('transfers_type', 'vir_client')
            ->where('status', 'traitement')
            ->where('justification', 'data:image/gif;base64,R0lGODlhAQABAAAAACw==')
            ->where('commission', 200001 * config('commission.COUR_COUR'))
            ->where('amount', 200001)->get();

        $this->assertNotNull($transferRaw);

        $response
            ->assertStatus(config('code.CREATED'))
            ->assertJson(["saved" => true]);
    }

    public function testVirementInternNeedValidationAmountNotEnough()
    {
        //given : we have 2 client with their 2 "courant" accounts
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
            'number' => 'THW112233DZD', //todo check if it s the best way
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

        //when
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/intern', [
            'receiver' => ['account' => 'THW112233DZD'],
            'amount' => '200001',
            'reason' => 'something',
            'justification' => 'data:image/gif;base64,R0lGODlhAQABAAAAACw==',
        ]);

        //then
        $response
            ->assertStatus(config('code.NOT_FOUND'))
            ->assertJson(["amount" => false]);
    }

    public function testValidationVirementInternTTTT()
    {
        //given : we have 2 client with their 2 "courant" accounts
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
            'number' => 'THW112233DZD', //todo check if it s the best way
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

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/validations', [
            'receiver.account' => 'THW112233DZD',
            'amount' => '200001',
            'reason' => 'something',
            'justification' => 'data:image/gif;base64,R0lGODlhAQABAAAAACw==',
        ]);

//        dd($this,$response);
        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson(array(
                'email' =>
                    array(
                        0 => 'The email must be a valid email address.',
                    ),
                'password' =>
                    array(
                        0 => 'The password field is required.',
                    ),
                'type' =>
                    array(
                        0 => 'The type must be 1 digits.',
                    ),
            ));
    }

}
