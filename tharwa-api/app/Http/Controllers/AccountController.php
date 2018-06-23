<?php

namespace App\Http\Controllers;

use App\Account;
use App\AccountRequest;
use App\AccountStatus;
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


        $client = $this->client();
        $accsType = $client->accounts()->get(['type_id']);
        //the client should not have an acc of the same type
        if ($accsType->contains('type_id', $request->type)) {
            return response(["saved" => false, "account" => "already exist"], config('code.UNAUTHORIZED'));
        }

        $accsType = $client->accountRequests()->get(['type_id']);
        //the client should not have made a request for same acc type
        if ($accsType->contains('type_id', $request->type)) {
            return response(["saved" => false, "account_request" => "already exist"], config('code.UNAUTHORIZED'));
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

    public function index()
    {
        $allAccounts = Account::get(['number', 'isvalid', 'type_id', 'created_at']);

        return response($allAccounts);
    }

    public function edit(Request $request)
    {
        //todo more validation
        //validation
        $validator = \Validator::make($request->all(), [
            'id' => 'sometimes|required|integer|min:0|exists:account_statuses,id',//todo if present means it s a response of a demande
            'account' => ['required', 'regex:/^THW[0-9]{6}(DZD|EUR|USD)$/', 'exists:accounts,number'],
            'motif' => 'required_without:id|max:255',
            'code' => 'required|in:0,1',//0 ==> blocage //in:true,false
        ]);
//        $validator->sometimes('motif', 'required|max:255', function ($input) {//todo
//            return is_null(\Request->input('id'));
//        });
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }
//dd($request);
        $deblocDemandeId = $request->input('id');
        $managerAnswer = null;

        /**start transaction**/
        DB::beginTransaction();

        try {

            if (!is_null($deblocDemandeId)) {//it's a bloq or debloq (AFTER a demande from client)
                $accountStatus = AccountStatus::find($deblocDemandeId);
                $accountStatus->treated = true;
                $accountStatus->save();
//            dd($accountStatus);
                //todo create a new status
            }
//dd("nn");
            $account = Account::find($request->input('account'));

            //todo send mail with the motif

            if (1 == $request->input('code')) {//blocage
                $account->isvalid = true;
                $managerAnswer = 'bloq';
            } else {//deblocage
                $account->isvalid = false;
                $managerAnswer = 'debloq';
            }

            $account->save();

            AccountStatus::create([
                'type' => $managerAnswer,
                'justification' => \Request::input('motif'),
                'treated' => null,
                'type_id' => $account->type_id,
                'account_id' => \Request::input('account'),
            ]);

            /**commit - no problems **/
            DB::commit();
            return response(["saved" => true], config('code.CREATED'));
        } catch (\Exception $e) {
            // something went wrong

            /**rollback every thing - problems **/
            DB::rollback();

            if (Storage::exists($path)) Storage::delete($path);

            return response(["saved" => false], config('code.UNKNOWN_ERROR'));

        }
    }

    public function debloqageDemande(Request $request)
    {
        //validation
        $validator = \Validator::make($request->all(), [
            'numero' => ['required', 'regex:/^THW[0-9]{6}(DZD|EUR|USD)$/', 'exists:accounts,number'],
            'justification' => 'required',//img
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

        //save image from 64base
        $file_name = strtoupper(md5(uniqid(rand(), true))) . ".jpeg";
        $path = config('filesystems.justification_img') . $file_name;

        //save file in disk
        $image = self::base64_to_jpeg(\Request::input('justification'), $path);

        //todo check account belongs to client

        $account = Account::find($request->input('numero'));

        if (true == $account->isValid)
            return response(["message" => "the account is not blocked"], config('code.UNAUTHORIZED'));


        AccountStatus::create([
            'type' => 'dem_debloq',
            'justification' => $image,
            'treated' => false,
            'type_id' => $account->type_id,
            'account_id' => \Request::input('numero'),
        ]);

        //todo send mail to banqie

        return response(["saved" => true], config('code.CREATED'));

    }

    public function deblockList()
    {
        $deblockDemandes = AccountStatus::notValidated()
            ->with('account.client')
            ->get();

        $baseUrl = url(config('filesystems.uploaded_file'));

        foreach ($deblockDemandes as $deblockDemande) {
            $deblockDemande['justification'] =  $baseUrl . '/'
                . $deblockDemande['justification'];
            $deblockDemande['client'] = clone $deblockDemande['account']['client'];
            $deblockDemande['client']['picture'] =
                $baseUrl . '/'
                . $deblockDemande['client']['picture'];
            unset($deblockDemande->account);

            $deblockDemande['account'] = $deblockDemande['account_id'];
            unset($deblockDemande['account_id']);
            $deblockDemande['client']['type_id'] = $deblockDemande['client']['type'];
            unset($deblockDemande['client']['type']);

        }

        return response($deblockDemandes);
    }

}
