<?php

namespace Tests\Unit;

use App\Client;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientModelTest extends TestCase
{

    use DatabaseTransactions;


    public function testCheckFunction()
    {
        $userName = 'a2@c.c';
        $password = 'test';

        Client::create([
            'email' => $userName,
            'firstName' => 'cltest',
            'lastName' => 'cltest',
            'password' => bcrypt($password),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => str_random(9),
            'type' => 'Client',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);

        $isCorrect = Client::check($userName, $password);

        $this->assertTrue($isCorrect);


        //try false credentials
        $isCorrect = Client::check($userName, "false pass");

        $this->assertFalse($isCorrect);
    }


    public function testCheckAndGetInfoFunction()
    {
        $userName = 'a2@c.c';
        $password = 'test';
        $phone = '0555555';
        $scope = 'Client';

        Client::create([
            'email' => $userName,
            'firstName' => 'cltest',
            'lastName' => 'cltest',
            'password' => bcrypt($password),
            'address' => 'oued essamar',
            'picture' => 'hi.png',
            'function' => 'teacher',
            'phone' => $phone,
            'type' => $scope,
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);

        $infos = Client::checkAndGetInfo($userName, $password);


        $this->assertTrue($phone === $infos['phone']
            && $scope === $infos['scope']);


        //try false credentials
        $infos = Client::checkAndGetInfo($userName, "false pass");


        $this->assertFalse($infos);
    }

}
