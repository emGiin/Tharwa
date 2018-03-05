<?php

namespace Tests\Feature;

use App\Token;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OauthTokenTest extends TestCase
{

    use DatabaseTransactions;


    public function testNonValidData()
    {
        $response = $this->json('POST', '/oauth/token', [
            'temporary_token' => 'SDF11QDF',
            'pin' => 'nonvalide',
        ]);

        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson(array (
                'pin' =>
                    array (
                        0 => 'The pin must be 4 digits.',
                    ),
            ));
    }


    public function testRequiredData()
    {
        //without pin code
        $response = $this->json('POST', '/oauth/token', [
            'temporary_token' => 'SDF11QDF',
        ]);

        $response
            ->assertStatus(config('code.BAD_REQUEST'))
            ->assertJson(array (
                'pin' =>
                    array (
                        0 => 'The pin field is required.',
                    ),
            ));
    }


    public function testFalseData()
    {
        //here we are using transactions so it s not gonna affect
        //the real DB ( we rollback at the end)

        DB::delete('delete from oauth_access_tokens');

        $response = $this->json('POST', '/oauth/token', [
            'temporary_token' => 'test_token',
            'pin' => '1111',
        ]);

        $response
            ->assertStatus(config('code.UNAUTHORIZED'))
            ->assertJson(["authorization" => false]);

    }


    public function testOutDatedPin()
    {
        //here we are using transactions so it s not gonna affect
        //the real DB ( we rollback at the end)

        $temp_token = 'AZE45454ZRAZERAEZR';
        $pin = '2222';

        Token::create([
            'id' => $temp_token,
            'user_id' => 'cltest@e.c',
            'pin_code' => $pin,
            'pin_code_expires_at' =>
                \Carbon\Carbon::now()
                    ->subSeconds(1)  //allah ghaleb ! he s barely 1 s off
                    ->format('Y-m-d H:i:s'),
            'scopes' => 'Client',
        ]);

        $response = $this->json('POST', '/oauth/token', [
            'temporary_token' => $temp_token,
            'pin' => $pin,
        ]);

        $response
            ->assertStatus(config('code.UNAUTHORIZED'))
            ->assertJson(["authorization" => false]);
    }


    public function testCorrectAnswer()
    {
        //here we are using transactions so it s not gonna affect
        //the real DB ( we rollback at the end)

        $temp_token = 'AZE45454ZRAZERAEZR$FAF£A£££QSFD$$';
        $pin = '2222';

        Token::create([
            'id' => $temp_token,
            'user_id' => 'cltest@e.c',
            'pin_code' => $pin,
            'pin_code_expires_at' => \Carbon\Carbon::now()->addHours(1)->format('Y-m-d H:i:s'),
            'scopes' => 'Client',
        ]);

        $response = $this->json('POST', '/oauth/token', [
            'temporary_token' => $temp_token,
            'pin' => $pin,
        ]);

        $response
            ->assertStatus(config('code.OK'))
            ->assertJsonStructure(['token_',
                'expires_at']);
    }

}
