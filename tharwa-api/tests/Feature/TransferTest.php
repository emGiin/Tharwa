<?php

namespace Tests\Feature;

use App\Account;
use App\BalanceHistory;
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

    public function testMicroAmountNotEnough()
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
            'balance' => '1',
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
            ->assertJson(["amount" => false]);
    }

    public function testMicroDataValidation()
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
            'balance' => '1',
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

        /**when**/
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/micro', [
            'account' => 'THW112233DZD',
            'amount' => '20000',//amount > limit
        ]);

        /**then**/
        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson(["amount" =>
                ["The amount may not be greater than ".config('utils.amount_max_micro_transfer')."."]
            ]);


        /**when**/
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/micro', [
            'account' => 'THW112233UUD',//account format error
            'amount' => '2000',
        ]);

        /**then**/
        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson(["account" =>
                ["The account format is invalid."]
            ]);
    }

    public function testMicroTodayToSameClient()
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

    public function testVirementInternAmountNotEnough()
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
            ->where('commission', 200001 * config('commission.COUR_COUR'))
            ->where('amount', 200001)->get();

        $this->assertFalse($transferRaw->isEmpty());

        $historySender = BalanceHistory::where('amount', 200001 * config('commission.COUR_COUR') + 200001)
            ->where('transaction_type', 'vir_client')
            ->where('transaction_direction', 'out')
            ->where('account_id', 'THW445566DZD')->get();

        $this->assertFalse($historySender->isEmpty());

        $response
            ->assertStatus(config('code.CREATED'))
            ->assertJson(["saved" => true]);
    }

    public function testVirementInternOK()
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

        //when
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Pin' => $pin,
        ])->json('POST', '/api/virement/intern', [
            'receiver' => ['account' => 'THW112233DZD'],
            'amount' => '199999',
            'reason' => 'somethingTest',
            'justification' => 'data:image/gif;base64,R0lGODlhAQABAAAAACw==',
        ]);

        //then
        $transferRaw = InternTransfer::where('source_id', 'THW445566DZD')
            ->where('destination_id', 'THW112233DZD')
            ->where('reason', 'somethingTest')
            ->where('transfers_type', 'vir_client')
            ->where('status', 'valide')
            ->where('commission', 199999 * config('commission.COUR_COUR'))
            ->where('amount', 199999)->get();

        $this->assertFalse($transferRaw->isEmpty());

        $historySender = BalanceHistory::where('amount', 199999 * config('commission.COUR_COUR') + 199999)
            ->where('transaction_type', 'vir_client')
            ->where('transaction_direction', 'out')
            ->where('account_id', 'THW445566DZD')->get();

        $this->assertFalse($historySender->isEmpty());

        $historyReceiver = BalanceHistory::where('amount', 199999)
            ->where('transaction_type', 'vir_client')
            ->where('transaction_direction', 'in')
            ->where('account_id', 'THW112233DZD')->get();

        $this->assertFalse($historyReceiver->isEmpty());

        $response
            ->assertStatus(config('code.CREATED'))
            ->assertJson([
                "saved" => true,
                "commission" => 199999 * config('commission.COUR_COUR')
            ]);
    }

}
