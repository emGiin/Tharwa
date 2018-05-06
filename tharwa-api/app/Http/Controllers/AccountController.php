<?php

namespace App\Http\Controllers;

use App\Account;
use App\AccountRequest;
use App\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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


        //todo check if he already did the same acc type request !

        $client = $this->client();
        $accsType = $client->accounts()->get(['type_id']);

        //the client should not have an acc of the same type
        if ($accsType->contains('type_id', $request->type)) {
            return response(["saved" => false, "account" => "already exist"], config('code.UNAUTHORIZED'));
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
        $res = AccountRequest::notValidated()->with('client')->get();//todo check with

        $res->each(function ($item, $key) {
            $item->client->picture =
                url(config('filesystems.uploaded_file')) . '/'
                . $item->client->picture;
        });

        return response($res, config('code.OK'));

    }

    public function validateAccount(Request $request)
    {
        //validation
        $validator = \Validator::make($request->all(), [
            'id' => 'required|integer|min:1|exists:accountRequests,id',
            'code' => 'required|in:0,1', //0 => rejected, 1 => accepted
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        if ($request->input('code') === 0) {//rejected

            $rejectedAccRequest = AccountRequest::find($request->input('id'));
            $rejectedAccRequest->validated = true;
            $rejectedAccRequest->save();

//            Mail::to($request->input('email'))
//                ->queue(new ClientRequestValidatedMail($rejectedRequest->firstname.' '.$rejectedRequest->lastname
//                    , $request->input('code')));

            return response(["saved" => true], config('code.CREATED'));

        } else {//accepted

            /**start transaction**/
            DB::beginTransaction();

            try {

                //get the accepted client
                $acceptedAccount = AccountRequest::find($request->input('id'));

                $currencies = ['EPARN' => 'DZD', 'DVEUR' => 'EUR', 'DVUSD' => 'USD'];
                $currency = $currencies[$acceptedAccount->type_id];
                $accountNb = Account::count() + 1;

                //save to db
                Account::create([
                    'number' => 'THW' . sprintf("%06d", $accountNb) . $currency, //todo check if it s the best way
                    'isValid' => true,
                    'currency_id' => $currency,
                    'type_id' => $acceptedAccount->type_id,
                    'client_id' => $acceptedAccount->client_id,
                ]);

                $acceptedAccount->delete();

//                Mail::to($request->input('email'))
//                    ->queue(new ClientRequestValidatedMail($acceptedClient->firstname.' '.$acceptedClient->lastname
//                        , $request->input('code')));

                // all good
                /**commit - no problems **/
                DB::commit();
                return response(["saved" => true], config('code.CREATED'));

            } catch (\Exception $e) {

                // something went wrong
                /**rollback every thing - problems **/
                DB::rollback();

                return response(["saved" => false], config('code.UNKNOWN_ERROR'));
            }


        }
    }

}
