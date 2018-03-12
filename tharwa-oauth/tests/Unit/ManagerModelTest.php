<?php

namespace Tests\Unit;

use App\Manager;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ManagerModelTest extends TestCase
{
    use DatabaseTransactions;


    public function testCheckFunction()
    {
        $userName = 'gestionnaire2@tharwa.con';
        $password = 'test';

        Manager::create([
            'email' => $userName,
            'firstName' => 'gestest',
            'lastName' => 'gestest',
            'password' => bcrypt($password),
            'address' => 'oued essamar',
            'phone' => str_random(9),
            'role' => 'Gestionnaire',
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);

        $isCorrect = Manager::check($userName, $password);

        $this->assertTrue($isCorrect);


        //try false credentials
        $isCorrect = Manager::check($userName, "false pass");

        $this->assertFalse($isCorrect);
    }


    public function testCheckAndGetInfoFunction()
    {
        $userName = 'gestionnaire2@tharwa.con';
        $password = 'test';
        $phone = '0555555';
        $scope = 'Gestionnaire';

        Manager::create([
            'email' => $userName,
            'firstName' => 'gestest',
            'lastName' => 'gestest',
            'password' => bcrypt($password),
            'address' => 'oued essamar',
            'phone' => $phone,
            'role' => $scope,
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);

        $infos = Manager::checkAndGetInfo($userName, $password);


        $this->assertEquals($phone, $infos['phone']);
        $this->assertEquals($scope, $infos['scope']);


        //try false credentials
        $infos = Manager::checkAndGetInfo($userName, "false pass");


        $this->assertFalse($infos);
    }
}
