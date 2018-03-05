<?php

namespace Tests\Feature;

use App\Client;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OauthPinTest extends TestCase
{
    use DatabaseTransactions;

    public function testNonValidData()
    {
        $response = $this->json('POST', '/oauth/pincode', [
            'grant_type' => 'passwordd',
            'client_id' => '111s',
            'username' => 'aates.com',
            'password' => '',
            'confirmation_method' => 'ttemail',
        ]);

        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson(array(
                'grant_type' =>
                    array(
                        0 => 'The selected grant type is invalid.',
                    ),
                'client_id' =>
                    array(
                        0 => 'The client id must be 1 digits.',
                    ),
                'username' =>
                    array(
                        0 => 'The username must be a valid email address.',
                    ),
                'password' =>
                    array(
                        0 => 'The password field is required.',
                    ),
                'confirmation_method' =>
                    array(
                        0 => 'The selected confirmation method is invalid.',
                    ),
            ));
    }


    public function testRequiredData()
    {
        //without password
        $response = $this->json('POST', '/oauth/pincode', [
            'grant_type' => 'password',
            'client_id' => '1',
            'username' => 'aa@tes.com',
            'confirmation_method' => 'email',
        ]);

        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson([
                'password' =>
                    array(
                        0 => 'The password field is required.',
                    )
            ]);
    }


    public function testFalseCredentials()
    {

        //here we are using transactions so it s not gonna affect
        //the real DB ( we rollback at the end)

        DB::delete('delete from clients');

        $response = $this->json('POST', '/oauth/pincode', [
            'grant_type' => 'password',
            'client_id' => '1',
            'username' => 'a@a.com',
            'password' => '5454',
            'confirmation_method' => 'email',
        ]);

        $response
            ->assertStatus(config('code.UNAUTHORIZED'))
            ->assertJson(["credentials" => false]);

    }


    public function testCorrectAnswer()
    {
        //here we are using transactions so it s not gonna affect
        //the real DB ( we rollback at the end)

        Client::create([
            'email' => 'test@c.c',
            'firstName' => 'cltest',
            'lastName' => 'cltest',
            'password' => bcrypt('pwdtest'),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => str_random(9),
            'type' => 'Client',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);

        $response = $this->json('POST', '/oauth/pincode', [
            'grant_type' => 'password',
            'client_id' => '2',
            'username' => 'test@c.c',
            'password' => 'pwdtest',
            'confirmation_method' => 'email',
        ]);

        $response
            ->assertStatus(config('code.OK'))
            ->assertJsonStructure(['temporary_token',
                'expires_at']);
    }


}
