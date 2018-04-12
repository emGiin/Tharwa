<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientTest extends TestCase
{

    use DatabaseTransactions;

//    public function testNonValidData()
//    {
//        $response = $this->json('POST', '/oauth/pincode', [
//            'grant_type' => 'passwordd',
//            'client_id' => '111s',
//            'username' => 'aates.com',
//            'password' => '',
//            'confirmation_method' => 'ttemail',
//        ]);
//
//        $response
//            ->assertStatus(config('code.BAD_REQUEST'))
//            ->assertJson(array(
//                'grant_type' =>
//                    array(
//                        0 => 'The selected grant type is invalid.',
//                    ),
//                'client_id' =>
//                    array(
//                        0 => 'The client id must be 1 digits.',
//                    ),
//                'username' =>
//                    array(
//                        0 => 'The username must be a valid email address.',
//                    ),
//                'password' =>
//                    array(
//                        0 => 'The password field is required.',
//                    ),
//                'confirmation_method' =>
//                    array(
//                        0 => 'The selected confirmation method is invalid.',
//                    ),
//            ));
//    }

    public function testNewClientNonValidData()
    {
        $response = $this->json('POST', '/api/client', [
            'email' => '@nonvalide@email@something@test.cc',
            'firstName' => 'something',
            'lastName' => 'something',
            'password' => '',//no password
            'address' => 'something',
            'phone' => 'something',
            'picture' => 'something',
            'function' => 'something',
            'type' => 'something',
        ]);

        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson(array (
                'email' =>
                    array (
                        0 => 'The email must be a valid email address.',
                    ),
                'password' =>
                    array (
                        0 => 'The password field is required.',
                    ),
                'type' =>
                    array (
                        0 => 'The type must be 1 digits.',
                    ),
            ));
    }

//    public function testNewValidData()
//    {
//        $response = $this->json('POST', '/api/client', [
//            'email' => '@nonvalide@email@something@test.cc',
//            'firstName' => 'something',
//            'lastName' => 'something',
//            'password' => '',//no password
//            'address' => 'something',
//            'phone' => 'something',
//            'picture' => 'something',
//            'function' => 'something',
//            'type' => 'something',
//        ]);
//
//        $response
//            ->assertStatus(config('code.BAD_REQUEST'))
//            ->assertJson(array (
//                'email' =>
//                    array (
//                        0 => 'The email must be a valid email address.',
//                    ),
//                'password' =>
//                    array (
//                        0 => 'The password field is required.',
//                    ),
//                'type' =>
//                    array (
//                        0 => 'The type must be 1 digits.',
//                    ),
//            ));
//    }

}
