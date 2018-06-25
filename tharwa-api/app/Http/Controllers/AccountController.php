<?php

namespace App\Http\Controllers;

use App\Account;
use App\AccountRequest;
use App\AccountStatus;
use App\Client;
use App\Mail\AccountBlockedMail;
use App\Mail\AccountDeblockedMail;
use App\Mail\AccountDeblockedRequestMail;
use App\Mail\AccountRequestAcceptedMail;
use App\Mail\AccountRequestRefusedMail;
use App\Mail\NewAccountRequestMail;
use App\Manager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

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

        $banquier = Manager::banquier()->first();

        Mail::to($banquier->email)
            ->queue(new NewAccountRequestMail($client->name(), $request->type));

        //save to db
        AccountRequest::create([
            'validated' => false, // todo
            'type_id' => $request->type,
            'client_id' => $client->email,
        ]);

        Log::info("Le client ".$client->name()." ( ".$client->email." ) "." a demander un nouveau compte de type ".$request->type);

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

        Log::info("Le banquier a demander la list des compte a valider");

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

            $client = $rejectedAccRequest->client()->first();
            Mail::to($client->email)
                ->queue(new AccountRequestRefusedMail(""));

            event(new \App\Events\AccountRequestRefused(
                "Votre Demande de creation d'un compte ".$rejectedAccRequest->type_id
                ." a été refusée",
                $client->email));

            Log::info("Le banquier a refusé la demande du compte ".
                $rejectedAccRequest->type_id." de M.".$client->name()." ( ".$client->email." ) ");

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

                $client = $acceptedAccount->client()->first();
                Mail::to($client->email)
                    ->queue(new AccountRequestAcceptedMail());

                event(new \App\Events\AccountRequestAccepted(
                    "Votre Demande de creation d'un compte ".
                    $acceptedAccount->type_id
                    ." a été acceptée",
                    $client->email));

                Log::info("Le banquier a accepté la demande du compte ".
                    $acceptedAccount->type_id." de M.".$client->name()." ( ".$client->email." ) ");

                $acceptedAccount->delete();


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

        Log::info("Le banquier a regarder la list de tout les comptes");

        return response($allAccounts);
    }

    public function edit(Request $request)
    {
        //todo more validation
        //validation
        $validator = \Validator::make($request->all(), [
            'id' => 'sometimes|required|integer|min:0|exists:account_statuses,id',//todo if present means it s a response of a demande
            'account' => ['required', 'regex:/^THW[0-9]{6}(DZD|EUR|USD)$/', 'exists:accounts,number'],
            'motif' => 'required|max:255',
            'code' => 'required|in:0,1',//0 ==> blocage //in:true,false
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

        $deblocDemandeId = $request->input('id');
        $managerAnswer = null;

        /**start transaction**/
        DB::beginTransaction();

        try {

            //it's a bloq or debloq (AFTER a demande from client)
            if (!is_null($deblocDemandeId)) {
                $accountStatus = AccountStatus::find($deblocDemandeId);
                $accountStatus->treated = true;
                $accountStatus->save();
            }

            $account = Account::find($request->input('account'));
            $client = $account->client()->first();

            if (1 == $request->input('code')) {//deblocage
                $account->isvalid = true;
                $managerAnswer = 'debloq';
                Mail::to($client->email)
                    ->queue(new AccountDeblockedMail($account->number, "" . $request->input('motif')));

                Log::info("Le banquier a debloqué le compte ".
                    $account->number." de M.".$client->name()." ( ".$client->email." ) ");

            } else {//block
                $account->isvalid = false;
                $managerAnswer = 'bloq';
                Mail::to($client->email)
                    ->queue(new AccountBlockedMail($account->number, "" . $request->input('motif')));


                Log::info("Le banquier a bloqué le compte ".
                    $account->number." de M.".$client->name()." ( ".$client->email." ) ");

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

            return response(["saved" => false], config('code.UNKNOWN_ERROR'));

        }
    }

    public function debloqageDemande(Request $request)
    {
        //validation
        $validator = \Validator::make($request->all(), [
            'account_type' => 'required|in:COUR,EPARN,DVEUR,DVUSD',
            'justification' => 'required',//img
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }
        $type_id = $request->input('account_type');
        if ('COUR' == $type_id) $type_id = 'COUR ';

        $account = $this->client()->accounts()
            ->where('type_id', $type_id)->first();
        if (is_null($account))
            return response(["saved" => false, "account" => "does not exist"], config('code.UNAUTHORIZED'));


        if (true == $account->isValid)
            return response(["message" => "the account is not blocked"], config('code.UNAUTHORIZED'));


        //save image from 64base
        $file_name = strtoupper(md5(uniqid(rand(), true))) . ".jpeg";
        $path = config('filesystems.justification_img') . $file_name;

        //save file in disk
        $image = self::base64_to_jpeg(\Request::input('justification'), $path);


        AccountStatus::create([
            'type' => 'dem_debloq',
            'justification' => $image,
            'treated' => false,
            'type_id' => $account->type_id,
            'account_id' => $account->number,
        ]);


        $client = $account->client()->first();
        $banquier = Manager::banquier()->first();
        Mail::to($banquier->email)
            ->queue(new AccountDeblockedRequestMail($client->name()));

        Log::info("Le client ".$client->name()." ( ".$client->email." ) "." a demander le deblocage de son compte de type ".$type_id);

        return response(["saved" => true], config('code.CREATED'));

    }

    public function deblockList()
    {
        $deblockDemandes = AccountStatus::notValidated()
            ->with('account.client')
            ->get();

        $baseUrl = url(config('filesystems.uploaded_file'));

        foreach ($deblockDemandes as $deblockDemande) {
            $deblockDemande['justification'] = $baseUrl . '/'
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


        Log::info("Le banquier a regarder la list des demandes deblocage compte");

        return response($deblockDemandes);
    }

}
