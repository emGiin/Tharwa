<?php

namespace Tests\Unit;

use App\Token;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TokenModelTest extends TestCase
{
    use DatabaseTransactions;

    public function testSetPinCodeFunction()
    {
        $email = 'a@a.c';
        $pincode = '1111';
        $pin_code_expires_at = date('Y-m-d H:i:s');
        $scope = 'Client';

        $tmp_token = Token::setPinCode($email, $pincode, $pin_code_expires_at, $scope);

        $this->assertDatabaseHas('oauth_access_tokens', [
            'id' => $tmp_token,
            'user_id' => $email,
            'pin_code' => $pincode,
            'pin_code_expires_at' => $pin_code_expires_at,
            'scopes' => $scope
        ]);
    }

    public function testCheckPinCodeFunction()
    {
        $temp_token = 'AZE45454ZRAZERAEZR$FAF£A£££QSFD$$';
        $pin = '2222';

        Token::create([
            'id' => $temp_token,
            'user_id' => 'cltest@e.c',
            'pin_code' => $pin,
            'pin_code_expires_at' => \Carbon\Carbon::now()->addHours(1)->format('Y-m-d H:i:s'),
            'scopes' => 'Client',
        ]);

        $result = Token::checkPinCode($temp_token, $pin);

        $count = Token::where('id', $temp_token)
            ->where('pin_code', $pin)
            ->where('token', $result['token_'])
            ->where('expires_at', $result['expires_at'])
            ->count();

        $this->assertEquals(1, $count);

    }
}
