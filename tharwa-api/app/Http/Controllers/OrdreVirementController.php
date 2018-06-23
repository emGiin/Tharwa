<?php

namespace App\Http\Controllers;

use App\Account;
use App\BalanceHistory;
use App\Client;
use App\ExternAccountTransferOrder;
use App\ExternTransfer;
use App\InternTransfer;
use App\TransferOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use View;


class OrdreVirementController extends Controller
{
    public function create(Request $request)
    {
        //validation//todo check if the account is valid not blocked
        $validator = Validator::make($request->all(), [
            'reason' => 'required|max:255',

            'receivers.intern' => 'sometimes|required|array',
            'receivers.intern.*.account' => 'required|regex:/^THW[0-9]{6}DZD$/|exists:accounts,number',
            'receivers.intern.*.amount' => 'required|numeric|min:0',

            'receivers.extern' => 'sometimes|required|array',
            'receivers.extern.*.name' => 'required|max:255',
            'receivers.extern.*.bank' => 'required|regex:/^[A-Z]{3}$/|exists:banks,code',//todo
            'receivers.extern.*.account' => 'required|regex:/^[A-Z]{3}[0-9]{6}DZD$/',
            'receivers.extern.*.amount' => 'required|numeric|min:0',
        ]);
//        $validator->sometimes('justification', 'required', function ($input) {//todo more validation
//            return $input->amount > config('utils.amount_limit_validation'); // Amount "Depasse" 200 000
//        });
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        //todo check amount enough!
        //todo check the
        /**start transaction**/
        DB::beginTransaction();

        try {
            $employerAccount = $this->client()->accounts()
                ->courant()->first();//todo check methode first()


//        $transferOrder = TransferOrder::create([
            $date = date('Y-m-d H:i:s');
            $transferOrder = DB::table('transferOrders')->insertGetId([
                'justification' => $request->input('justification'),
                'reason' => $request->input('reason'),
                'status' => 'traitement',
                'employer_account_id' => $employerAccount->number,
                'created_at' => $date,
                'updated_at' => $date,
            ]);


            $transferOrder = TransferOrder::find($transferOrder);
            //todo optimize
            if (array_key_exists('intern', $request['receivers']))
                foreach ($request['receivers']['intern'] as $internReceiver) {
                    $transferOrder->internAccounts()
                        ->attach($internReceiver['account'],
                            ['amount' => $internReceiver['amount']]
                        );
                }

            if (array_key_exists('extern', $request['receivers']))
                foreach ($request['receivers']['extern'] as $externReceiver) {
                    ExternAccountTransferOrder::create([
                        'number' => $externReceiver['account'],
                        'name' => $externReceiver['name'],
                        'transferOrder_id' => $transferOrder->id,
                        'amount' => $externReceiver['amount'],
                        'bank' => $externReceiver['bank'],//todo
                    ]);
                }

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


    public function validationList()
    {

        $notValidatedTrnasferOrders = TransferOrder::notValidated()
            ->with(['externAccounts', 'internAccounts.client', 'employerAccount.client'])
            ->get();

        $baseUrl = url(config('filesystems.uploaded_file'));

        foreach ($notValidatedTrnasferOrders as $notValidatedTrnasferOrder) {
            $notValidatedTrnasferOrder['source_id'] = clone $notValidatedTrnasferOrder['employerAccount']['client'];
            $notValidatedTrnasferOrder['source_id']['picture'] =
                $baseUrl . '/' . $notValidatedTrnasferOrder['source_id']['picture'];

            unset($notValidatedTrnasferOrder['employerAccount']);

            $notValidatedTrnasferOrder['source_id']['account'] = $notValidatedTrnasferOrder['employer_account_id'];
            $notValidatedTrnasferOrder['creationdate'] = "" . $notValidatedTrnasferOrder['created_at'];

            $notValidatedTrnasferOrder['destination_ids'] = collect();

            foreach ($notValidatedTrnasferOrder['externAccounts'] as $externAccount) {
                $new['account'] = $externAccount['number'];
                $names = explode(' ', $externAccount['name']);
                $new['firstname'] = $names[0];
                if (array_key_exists(1, $names))
                    $new['lastname'] = $names[1];
                $new['amount'] = $externAccount['amount'];
                $new['bank'] = $externAccount['bank'];
                $notValidatedTrnasferOrder['destination_ids']->push($new);
            }
            unset($notValidatedTrnasferOrder['externAccounts']);

            foreach ($notValidatedTrnasferOrder['internAccounts'] as $internAccount) {
                $new['account'] = $internAccount['number'];
                $new['firstname'] = $internAccount['client']['firstname'];
                $new['lastname'] = $internAccount['client']['lastname'];
                $new['amount'] = $internAccount['pivot']['amount'];
                $new['bank'] = 'tharwa';
                $notValidatedTrnasferOrder['destination_ids']->push($new);
            }
            unset($notValidatedTrnasferOrder['internAccounts']);
        }

        return response($notValidatedTrnasferOrders, config('code.OK'));
    }

    public function validateVirement(Request $request)
    {
        //validation
        $validator = \Validator::make($request->all(), [
            'id' => 'required|integer|min:1|exists:transferOrders,id',
            'code' => 'required|in:0,1', //0 => rejected, 1 => accepted
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        /**start transaction**/
        DB::beginTransaction();


        try {

            $transferOrder = TransferOrder::find($request->input('id'));
            $senderAccount = $transferOrder->employerAccount()->first();
            $senderEmployer = $senderAccount->client()->first();

            if ($request->input('code') === 0) {//rejected
                $transferOrder->status = 'rejete';
            } else {//accepted & executeIt

                //todo suppose that amount is checked ?


                $now = \Carbon\Carbon::now();
                $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB

                //create the intern trasfers
                $internReceiverAccounts = $transferOrder->internAccounts()->get();
                foreach ($internReceiverAccounts as $internReceiverAccount) {

                    $amount = $internReceiverAccount->pivot->amount;
                    $internTransferCode = $senderAccount->number . $internReceiverAccount->number . $now->format('YmdHi');
                    $commission = config('commission.COUR_COUR') * $amount;

//                    $receiverClient = $receiverAccount->client()->get(['email', 'firstname', 'lastname'])->first();

                    //sender history
                    BalanceHistory::create([
                        'id' => ++$nb,
                        'amount' => $amount + $commission,
                        'commission' => $commission,
                        'transaction_type' => 'vir_client',
                        'transaction_direction' => 'out',
                        'isIntern' => true,
                        'target' => $internReceiverAccount->number,
                        'account_id' => $senderAccount->number,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s'),
                        'transfer_code' => $internTransferCode,
                    ]);

                    //Tharwa commission history
                    BalanceHistory::create([
                        'id' => ++$nb,
                        'amount' => $commission,
                        'transaction_type' => 'commiss',
                        'transaction_direction' => 'in',
                        'account_id' => 'THW000000DZD',
                        'target' => $senderAccount->number,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s'),
                    ]);
                    //change the amount of the Tharwa account
                    $tharwaAccount = Account::find('THW000000DZD');
                    $tharwaAccount->balance = $tharwaAccount->balance + $commission;
                    $tharwaAccount->save();

                    //receiver history
                    BalanceHistory::create([
                        'id' => ++$nb,
                        'amount' => $amount,
                        'transaction_type' => 'vir_client',
                        'transaction_direction' => 'in',
                        'isIntern' => true,
                        'target' => $senderAccount->number,
                        'account_id' => $internReceiverAccount->number,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s'),
                        'transfer_code' => $internTransferCode,
                    ]);
                    //change the amount of the destination client
                    $internReceiverAccount->balance = $internReceiverAccount->balance + $amount;
                    $internReceiverAccount->save();

//                        //email virement recu (to reciever)
//                        Mail::to($receiverClient->email)
//                            ->queue(new TransferMail($receiverClient->firstname . ' ' . $receiverClient->lastname
//                                , 1
//                                , $senderClient->firstname . ' ' . $senderClient->lastname
//                                , ""
//                                , $amount
//                                , ""
//                            ));//todo : _to & currency


                    InternTransfer::create([
                        'code' => $internTransferCode,
                        'amount' => $amount,
                        'reason' => $transferOrder->reason,
                        'transferDate' => $now->format('Y-m-d H:i:s'),
                        'creationDate' => $now->format('Y-m-d H:i:s'),
                        'status' => 'valide',
                        'transfers_type' => 'vir_client',
                        'commission' => $commission,
                        'source_id' => $senderAccount->number,
                        'destination_id' => $internReceiverAccount->number,
                    ]);


                    //we retrieve the amount from the sender account
                    $senderAccount->balance = $senderAccount->balance - $commission - $amount;
                    $senderAccount->save();


//                    //email virement validé ou traitement
//                    Mail::to($senderClient->email)
//                        ->queue(new TransferMail($senderClient->firstname . ' ' . $senderClient->lastname
//                            , 2
//                            , $senderClient->firstname . ' ' . $senderClient->lastname
//                            , $receiverAccount->firstname . ' ' . $receiverAccount->lastname
//                            , $amount
//                            , $status
//                        ));//todo : _to & currency

                }

                //create extern transfers
                $externReceiverAccounts = $transferOrder->externAccounts()->get();
                foreach ($externReceiverAccounts as $externReceiverAccount) {

                    //create the transfer
                    $commission = config('commission.SENDEXTBANK') * $amount;
                    $virement_code = $senderAccount->number . $externReceiverAccount->number . $now->format('YmdHi');

                    //generate the XML file that will be treated later equivalent to send money
                    $xmlBody = View::make('xml_transfer_template', [
                        "code" => $virement_code,
                        "date" => $now->format('YmdHi'),
                        "senderName" => $this->client()->firstname . ' ' . $this->client()->lastname,
                        "senderAccount" => $senderAccount->number,
                        "receiverName" => $externReceiverAccount->name,
                        "receiverBank" => $externReceiverAccount->bank,
                        "receiverAccount" => $externReceiverAccount->number,
                        "amount" => $amount,
                        "reason" => $transferOrder->reason,
                    ])->render();
                    $xmlBody = '<?xml version="1.0" encoding="utf-8"?>' . $xmlBody;

                    $filePath = $externReceiverAccount->bank . '/' . $virement_code . '.xml';
                    Storage::disk('xml_out')->put($filePath, $xmlBody);


                    ExternTransfer::create([
                        'code' => $virement_code,
                        'amount' => $amount,
                        'reason' => $transferOrder->reason,
                        'transferDate' => $now->format('Y-m-d H:i:s'),
                        'creationDate' => $now->format('Y-m-d H:i:s'),
                        'status' => 'valide',
                        'commission' => $commission,
                        'intern_account_id' => $senderAccount->number,
                        'direction' => 'out',
                        'extern_account_name' => $externReceiverAccount->name,
                        'extern_bank' => $externReceiverAccount->bank,
                        'extern_account_number' => $externReceiverAccount->number,
                    ]);


                    //we retrieve the amount from the sender account
                    $senderAccount->balance = $senderAccount->balance - $commission - $amount;
                    $senderAccount->save();

                    //sender history
                    BalanceHistory::create([
                        'id' => ++$nb,
                        'amount' => $amount + $commission,
                        'commission' => $commission,
                        'transaction_type' => 'transf',
                        'transaction_direction' => 'out',
                        'isIntern' => false,
                        'target' =>  $externReceiverAccount->name,
                        'account_id' => $senderAccount->number,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s'),
                        'transfer_code' => $virement_code,
                    ]);

                    //Tharwa commission history
                    BalanceHistory::create([
                        'id' => ++$nb,
                        'amount' => $commission,
                        'transaction_type' => 'commiss',
                        'transaction_direction' => 'in',
                        'account_id' => 'THW000000DZD',
                        'target' => $senderAccount->number,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s')
                    ]);
                    //change the amount of the Tharwa account
                    $tharwaAccount = Account::find('THW000000DZD');
                    $tharwaAccount->balance = $tharwaAccount->balance + $commission;
                    $tharwaAccount->save();

//            Mail::to($request->input('email'))
//                ->queue(new ClientRequestValidatedMail($acceptedClient->firstname.' '.$acceptedClient->lastname
//                    , $request->input('code')));

                }


                $transferOrder->status = 'valide';
            }
            $transferOrder->save();


            /**commit - no problems **/
            DB::commit();

            return response(["saved" => true], config('code.CREATED'));

        } catch (\Exception $e) {
            // something went wrong

            /**rollback every thing - problems **/
            DB::rollback();

//            if (isset($filePath))
//                if (Storage::disk('xml_out')->exists($filePath))
//                    Storage::disk('xml_out')->exists($filePath);

            dd($e);
            return response(["saved" => false], config('code.UNKNOWN_ERROR'));

        }

    }

    private function client()
    {
        return resolve(Client::class);
    }

}
