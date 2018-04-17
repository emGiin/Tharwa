<?php

namespace App\Http\Controllers;

use App\Client;
use App\ClientRequest;
use App\Mail\PinCodeMail;
use App\Manager;
use App\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Validator;

class OauthController extends Controller
{

    public function pincode(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'grant_type' => 'nullable|in:password',
            'client_id' => 'required|digits:1',
            'username' => 'required|email|max:55',
            'password' => 'required|max:255',
            'confirmation_method' => 'required|in:sms,email',
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

        //client type web or mob tharwa
        if (2 == $request->client_id) {
            //check credentials
            $clientInfo = Client::checkAndGetInfo($request->username, $request->password);
        } else {
            //check credentials
            $clientInfo = Manager::checkAndGetInfo($request->username, $request->password);
        }
        if (empty($clientInfo)) {

            $isNewClient = ClientRequest::check($request->username, $request->password);

            if (!empty($isNewClient) && (2 == $request->client_id)) {
                return response(["status" => $isNewClient->validated], config('code.UNAUTHORIZED'));
            }

            return response(["credentials" => false], config('code.UNAUTHORIZED'));
        }


        //generate pin code then send it
        $pinCode = sprintf("%04d", rand(0, 9999));
        $pin_code_expires_at = \Carbon\Carbon::now()->addHours(1)->format('Y-m-d H:i:s');
        if ('sms' == $request->confirmation_method) {

            return 'sms sent';

            $nexmo = app('Nexmo\Client');
            $nexmo->message()->send([
                'to' => '+213553673740',//$clientInfo['phone'] +213669479443 +213656092713
                'from' => '+213553673740',
                'text' => 'code pin: ' . $pinCode . ' valide pour une heure, Tharwa '
            ]);

        } else
            Mail::to($request->username)->queue(new PinCodeMail($pinCode, $pin_code_expires_at));


        //save it to db
        $token_id = Token::setPinCode($request->username, $pinCode, $pin_code_expires_at, $clientInfo['scope']);


        //response with an identifier and time for the code to expire
        return response(["temporary_token" => $token_id,
            "expires_at" => $pin_code_expires_at],
            config('code.OK'));

    }


    public function token(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'temporary_token' => 'required|max:100',
            'pin' => 'required|digits:4'
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        //check infos
        $token = Token::checkPinCode($request->temporary_token, $request->pin);
        if (!$token)
            return response(["authorization" => false], config('code.UNAUTHORIZED'));


        //send token
        return response($token, config('code.OK'));

    }
}
