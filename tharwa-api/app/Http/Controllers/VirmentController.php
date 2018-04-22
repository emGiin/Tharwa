<?php

namespace App\Http\Controllers;

use App\Account;
use App\Bank;
use App\Client;
use App\ExternTransfer;
use App\InternTransfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use View;
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
        $validator->sometimes('justification', 'required', function ($input) {//todo
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
                ->courant()->first();//todo check methode first()

            //check the amount
            if (!$senderAccount->hasEnoughMoney($amount)) throw new \Exception;
            $hasEnoughMoney = true;

            //create the transfer
            $commission = config('commission.COUR_COUR') * $amount;
            $now = \Carbon\Carbon::now();
            if ($amount > 200000) {
                $transferDate = null;
                $creationDate = $now->format('Y-m-d H:i:s');
                $status = 'traitement';
            } else {
                //change the amount of the destination client just in case of < 200 000 else till validation
                $receiverAccount = Account::find($request->input('receiver.account'));
                $receiverAccount->balance = $receiverAccount->balance + $amount;
                $receiverAccount->save();

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
            //we retrieve the amount from the sender account
            $senderAccount->balance = $senderAccount->balance - $commission - $amount;
            $senderAccount->save();


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

    public function createExtern(Request $request)
    {
        //validation            //todo check if the account is valid not blocked
        $validator = Validator::make($request->all(), [
            'receiver.account' => ['required', 'regex:/^[A-Z]{3}[0-9]{6}(DZD|EUR|USD)$/'],
            'receiver.name' => 'required|max:255',
            'receiver.bank' => 'required|regex:/^[A-Z]{3}$/|exists:banks,code',
            'amount' => 'required|numeric|min:0',
            'reason' => 'required|max:255',
        ]);
        $validator->sometimes('justification', 'required', function ($input) {//todo
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
                ->courant()->first();//todo check methode first()


            //check the amount
            if (!$senderAccount->hasEnoughMoney($amount)) throw new \Exception;
            $hasEnoughMoney = true;


            //create the transfer
            $commission = config('commission.SENDEXTBANK') * $amount;
            $now = \Carbon\Carbon::now();
            $virement_code = $senderAccount->number . $request->input('receiver.account') . $now->format('YmdHi');
            if ($amount > 200000) {
                $transferDate = null;
                $creationDate = $now->format('Y-m-d H:i:s');
                $status = 'traitement';
            } else {
                //generate the XML file that will be treated later equivalent to send money
                $xmlBody = View::make('xml_transfer_template', [
                    "code" => $virement_code,
                    "date" => $now->format('YmdHis'),
                    "senderName" => $this->client()->firstname .' '. $this->client()->lastname,
                    "senderAccount" => $senderAccount->number,
                    "receiverName" => $request->input('receiver.name'),
                    "receiverBank" => $request->input('receiver.bank'),
                    "receiverAccount" => $request->input('receiver.account'),
                    "amount" => $amount,
                    "reason" => $request->input('reason'),
                ])->render();
                $xmlBody = '<?xml version="1.0" encoding="utf-8"?>' . $xmlBody;

                Storage::disk('xml_out')->put($virement_code.'.xml', $xmlBody);

                $status = 'valide';
                $transferDate = $creationDate = $now->format('Y-m-d H:i:s');
            }
            ExternTransfer::create([
                'code' => $virement_code,
                'amount' => $amount,
                'justification' => $request->input('justification'),
                'reason' => $request->input('reason'),
                'transferDate' => $transferDate,
                'creationDate' => $creationDate,
                'status' => $status,
                'commission' => $commission,
                'intern_account_id' => $senderAccount->number,
                'direction' => 'out',
                'extern_account_name' => $request->input('receiver.name'),
                'extern_account_number' => $request->input('receiver.account'),
                'extern_bank' => $request->input('receiver.bank'),
            ]);


            //todo send commission to Tharwa account
            //we retrieve the amount from the sender account
            $senderAccount->balance = $senderAccount->balance - $commission - $amount;
            $senderAccount->save();


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

    public function validationList()
    {

        $transferExternNeedValidations = ExternTransfer::needValidation()->get([
            'code', 'amount', 'justification', 'reason',
            'creationDate', 'extern_account_name', 'extern_account_number',
            'intern_account_id','direction'
        ]);

        //todo refactor and change it with with() fct
        foreach ($transferExternNeedValidations as $transfer) {
            $extenBank = Bank::find(
                substr($transfer->extern_account_number, 0, 3)
            )->name;
            if ($transfer->isFromExtern()) { //from thrwa to out
                $transfer->source_id = collect(
                    [
                        'firstName' => $transfer->extern_account_name,
                        'lastName' => '',
                        'account' => $transfer->extern_account_number,
                        'bank' => $extenBank
                    ]
                );

                $receiver = collect(
                    Account::find($transfer->intern_account_id)
                        ->client()
                        ->get(['firstName', 'lastName'])
                        ->first()
                );
                $receiver->put('account', $transfer->intern_account_id);
                $receiver->put('bank', "Tharwa");
                $transfer->destination_id = $receiver;
            } else {
                $sender = collect(
                    Account::find($transfer->intern_account_id)
                        ->client()
                        ->get(['firstName', 'lastName'])
                        ->first()
                );
                $sender->put('account', $transfer->intern_account_id);
                $sender->put('bank', "Tharwa");
                $transfer->source_id = $sender;

                $transfer->destination_id = collect(
                    [
                        'firstName' => $transfer->extern_account_name,
                        'lastName' => '',//todo
                        'account' => $transfer->extern_account_number,
                        'bank' => $extenBank
                    ]
                );
            }
            unset($transfer->extern_account_name);
            unset($transfer->extern_account_number);
            unset($transfer->intern_account_id);
            unset($transfer->direction);
        }


        $transferInternNeedValidations = InternTransfer::needValidation()->get([
            'code', 'amount', 'justification', 'reason',
            'creationDate', 'source_id', 'destination_id'
        ]);


        foreach ($transferInternNeedValidations as $transfer) {
            $sender = collect(
                Account::find($transfer->source_id)
                    ->client()
                    ->get(['firstName', 'lastName'])
                    ->first()
            );
            $sender->put('bank', "Tharwa");
            $sender->put('account', $transfer->source_id);
            $transfer->source_id = $sender;

            $receiver = collect(
                Account::find($transfer->destination_id)
                    ->client()
                    ->get(['firstName', 'lastName'])
                    ->first()
            );
            $receiver->put('bank', "Tharwa");
            $receiver->put('account', $transfer->destination_id);
            $transfer->destination_id = $receiver;
        }

        //todo !or not! order by date!
        $transferNeedValidations = $transferInternNeedValidations
            ->merge($transferExternNeedValidations);

        return response($transferNeedValidations);
    }

    private function client()
    {
        return resolve(Client::class);
    }


    public function validateVirement(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'virement_code' => ['required', 'regex:/^([A-Z]{3}[0-9]{6}(DZD|EUR|USD)){2}[0-9]{12}$/'],
            'code' => 'required|in:0,1', //0 => rejected, 1 => accepted
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

        $exterTransfer = ExternTransfer::find($request->virement_code);
        $interTransfer = InternTransfer::find($request->virement_code);

        if (empty($interTransfer) && empty($exterTransfer))
            return response(["virement_code" => false], config('code.NOT_FOUND'));

        $now = \Carbon\Carbon::now();

        /**start transaction**/
        DB::beginTransaction();
        try {

            if (!empty($interTransfer)) {

                //change date and status
                $interTransfer->transferDate = $now->format('Y-m-d H:i:s');

                if ($request->code == 0) {
                    $interTransfer->status = 'rejete';
                    $interTransfer->save();

                    //return money if rejete
                    $senderAccount = Account::find($interTransfer->source_id);
                    $senderAccount->balance = $senderAccount->balance + $interTransfer->amount;
                    $senderAccount->save();

                } else {
                    $interTransfer->status = 'valide';
                    $interTransfer->save();

                    //send money if valide
                    $receiverAccount = Account::find($interTransfer->destination_id);
                    $receiverAccount->balance = $receiverAccount->balance + $interTransfer->amount;
                    $receiverAccount->save();

                }

            } else {//extern transfer from tharwa to an otherBank

                //change date and status
                $exterTransfer->transferDate = $now->format('Y-m-d H:i:s');

                if ($request->code == 0) {
                    $exterTransfer->status = 'rejete';
                    $exterTransfer->save();

                    //return money if rejete
                    $senderAccount = Account::find($exterTransfer->intern_account_id);
                    $senderAccount->balance = $senderAccount->balance + $exterTransfer->amount;
                    $senderAccount->save();

                } else {
                    $exterTransfer->status = 'valide';
                    $exterTransfer->save();

                    $sender = Account::find($exterTransfer->intern_account_id)
                        ->client()->get(['firstname', 'lastname']);
                    //send money if valide (genrate the XML file that will be treated later)
                    $xmlBody = View::make('xml_transfer_template', [
                        "code" => $request->virement_code,
                        "date" => $now->format('YmdHis'),
                        "senderName" => $sender->firstname . ' ' . $sender->lastname,
                        "senderAccount" => $exterTransfer->intern_account_id,
                        "receiverName" => $exterTransfer->extern_account_name,
                        "receiverBank" => $exterTransfer->extern_bank,
                        "receiverAccount" => $exterTransfer->extern_account_number,
                        "amount" => $exterTransfer->amount,
                        "reason" => $exterTransfer->reason,
                    ])->render();
                    $xmlBody = '<?xml version="1.0" encoding="utf-8"?>' . $xmlBody;

                    dd($xmlBody);

                    Storage::disk('xml_out')->put($request->virement_code.'.xml', $xmlBody);

//                    $receiverAccount = Account::find($exterTransfer->extern_account_name);
//                    $receiverAccount->balance = $receiverAccount->balance + ;
//                    $receiverAccount->save();

                }
            }

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
