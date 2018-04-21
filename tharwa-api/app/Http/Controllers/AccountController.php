<?php

namespace App\Http\Controllers;

use App\AccountRequest;
use App\Client;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function create(Request $request)
    {

        //validation
        $validator = \Validator::make($request->all(), [
            'type' => 'required|in:EPARN,DVEUR,DVUSD',//acc type : EPARN DVEUR DVUSD
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        //todo if he already did the same acc type request !

        $client = $this->client();
        $accsType = $client->accounts()->get(['type_id']);

        //the client should not have an acc of the same type
        if ($accsType->contains('type_id', $request->type)) {
            return response(["saved" => false], config('code.UNAUTHORIZED'));
        }

        //save to db
        AccountRequest::create([
            'validated' => false, // todo
            'type_id' => $request->type,
            'client_id' => $client->email,
        ]);

        return response(["saved" => true], config('code.CREATED'));
    }


    private function client()
    {
        return resolve(Client::class);
    }

    public function validationList()
    {
        return response(
            AccountRequest::notValidated()->with('client')->get()
            , config('code.OK')
        );

    }
}
