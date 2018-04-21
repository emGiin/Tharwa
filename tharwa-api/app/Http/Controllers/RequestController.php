<?php

namespace App\Http\Controllers;

use App\Account;
use App\Client;
use App\ClientRequest;
use App\Mail\ClientRequestValidatedMail;
use App\Manager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Validator;
use Illuminate\Support\Facades\DB;



class RequestController extends Controller
{

    private function manager()
    {
        return  resolve(Manager::class);
    }

    public function index()
    {
        return ClientRequest::notValidated();
    }

    public function edit(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:55|exists:clientRequests,email',
            'code' => 'required|in:0,1', //0 => rejected, 1 => accepted
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

//        $nexmo = app('Nexmo\Client');
//        $nexmo->message()->send([
//            'to'   => '+213553673740',//$clientInfo['phone'] +213669479443 +213656092713
//            'from' => '+213553673740',
//            'text' => 'code pin: '.$pinCode.' valide pour une heure, Tharwa '
//        ]);


        if ($request->input('code') === 0){//rejected

            $rejectedRequest =ClientRequest::find($request->input('email'));
            $rejectedRequest->validated = true;
            $rejectedRequest->save();

            Mail::to($request->input('email'))
                ->queue(new ClientRequestValidatedMail($rejectedRequest->firstname.' '.$rejectedRequest->lastname
                    , $request->input('code')));

        }else{//accepted

            /**start transaction**/
            DB::beginTransaction();

            try {

                //get the accepted client
                $acceptedClient =ClientRequest::find($request->input('email'));

                //save to db
                Client::create([
                    'email' => $acceptedClient->email,
                    'firstName' => $acceptedClient->firstname,
                    'lastName' => $acceptedClient->lastname,
                    'password' => $acceptedClient->password,
                    'address' => $acceptedClient->address,
                    'picture' => $acceptedClient->picture,
                    'function' => $acceptedClient->function,
                    'phone' => $acceptedClient->phone,
                    'type' => $acceptedClient->type,
                ]);
                $accountNb = Client::count();
                Account::create([
                    'number' => 'THW'.sprintf("%06d", $accountNb).'DZD', //todo check if it s the best way
                    'isValid' => true,
                    'currency_id' => 'DZD',
                    'type_id' => 'COUR',
                    'client_id' => $acceptedClient->email,
                ]);

                $acceptedClient->delete();

                Mail::to($request->input('email'))
                    ->queue(new ClientRequestValidatedMail($acceptedClient->firstname.' '.$acceptedClient->lastname
                        , $request->input('code')));

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
