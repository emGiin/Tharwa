<?php

namespace App\Http\Controllers;

use App\Account;
use App\Client;
use App\InternTransfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class VirmentController extends Controller
{

    public function createIntern(Request $request)
    {
        //validation//todo check if the account is valid not blocked
        $validator = Validator::make($request->all(), [
            'receiver.account' => 'required|regex:/^THW[0-9]{6}DZD$/|exists:accounts,number',
            'amount' => 'required|numeric|min:0',
            'reason' => 'required|max:255',
        ]);
        $validator->sometimes('justification', 'required', function ($input) {
            return $input->amount > 200000; // Amount "Depasse" 200 000
        });
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        $amount = $request->input('amount');
        $hasEnoughMoney = false;
        /**start transaction**/
        DB::beginTransaction();

        try {

            $senderAccount = $this->client()->accounts()
                ->courant()->first();

            //check the amount
            if (!$senderAccount->hasEnoughMoney(0)) throw new \Exception;////
            $hasEnoughMoney = true;

            //create the transfer
            $commission = config('commission.COUR_COUR') * $amount;
            $now = \Carbon\Carbon::now();
            if ($amount > 200000) {
                $transferDate = null;
                $creationDate = $now->format('Y-m-d H:i:s');
                $status = 'traitement';
            } else {
                $status = 'valide';
                $transferDate = $creationDate = $now->format('Y-m-d H:i:s');
            }
            InternTransfer::create([
                'code' => $senderAccount->number . $request->input('receiver.account') . $now->format('YmdHi'),
                'amount' => $amount,
                'justification' => $request->input('justification'),
                'reason' => $request->input('reason'),
                'transferDate' => $transferDate,
                'creationDate' => $creationDate,
                'status' => $status,
                'transfers_type' => 'vir_client',
                'commission' => $commission,
                'source_id' => $senderAccount->number,
                'destination_id' => $request->input('receiver.account'),
            ]);


            //todo send commission to Tharwa account
            //change the amount of the two account
            $senderAccount->balance = $senderAccount->balance - $commission - $amount;
            $senderAccount->save();

            $receiverAccount = Account::find($request->input('receiver.account'));
            $receiverAccount->balance = $receiverAccount->balance + $amount;
            $receiverAccount->save();


//            Mail::to($request->input('email'))
//                ->queue(new ClientRequestValidatedMail($acceptedClient->firstname.' '.$acceptedClient->lastname
//                    , $request->input('code')));

            // all good
            /**commit - no problems **/
            DB::commit();
            return response(["saved" => true], config('code.CREATED'));

        } catch (\Exception $e) {

            // something went wrong
            /**rollback every thing - problems **/
            DB::rollback();

            if (!$hasEnoughMoney)
                return response(["amount" => false], config('code.NOT_FOUND'));

            return response(["saved" => false], config('code.UNKNOWN_ERROR'));
        }

    }

    private function client()
    {
        return resolve(Client::class);
    }
}