<?php

namespace App\Http\Controllers;

use App\Account;
use App\BalanceHistory;
use App\Bank;
use App\Client;
use App\ExternTransfer;
use App\InternTransfer;
use App\Mail\TransferMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use View;
use Validator;

class VirmentController extends Controller
{
    public function getConversionRate($method)
    {
        if ($method == 'cour_epar' || $method == 'epar_cour')
            return 1;

        $mapMethodeToCurrencies = ['cour_devi_usd' => 'DZD_USD',
            'devi_cour_usd' => 'USD_DZD',
            'cour_devi_eur' => 'DZD_EUR',
            'devi_cour_eur' => 'EUR_DZD'];

        $currencies = $mapMethodeToCurrencies[$method];

        $api = new \GuzzleHttp\Client();
        $res = $api->get('http://free.currencyconverterapi.com/api/v5/convert?q=' . $currencies . '&compact=y')
            ->getBody();

        $res = json_decode($res);

        return $res->$currencies->val;
    }

    public function toDZD($amount, $conversionRate, $method)
    {
        if (in_array($method, ['cour_epar', 'epar_cour', 'cour_devi_usd', 'cour_devi_eur']))
            return $amount;

        return $amount * $conversionRate;
    }

    public function createBetweenMyAccounts(Request $request)
    {
        //validation//todo check if the account is valid not blocked
        $validator = Validator::make($request->all(), [
            'method' => 'required|in:cour_epar,epar_cour,cour_devi_usd,devi_cour_usd,cour_devi_eur,devi_cour_eur',
            'amount' => 'required|numeric|min:0'
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

        $amount = $request->input('amount');
        $method = $request->input('method');
        $hasEnoughMoney = false;
        $hasTheAccount = false;

        /**start transaction**/
        DB::beginTransaction();

        try {

            $senderAccount = $this->client()->accounts()
                ->typeSender($method)->first();//todo check methode first()

            $receiverAccount = $this->client()->accounts()
                ->typeReceiver($method)->first();//todo check methode first()

            //check has the two accounts
            if (is_null($senderAccount) || is_null($receiverAccount)) throw new \Exception;
            $hasTheAccount = true;

            //check the amount
            if (!$senderAccount->hasEnoughMoney($amount)) throw new \Exception;
            $hasEnoughMoney = true;

            //create the transfer
            $mapMethodeToCommission = ['cour_epar' => 'COUR_EPART', 'epar_cour' => 'EPART_COUR',
                'cour_devi_usd' => 'COUR_DEV', 'cour_devi_eur' => 'COUR_DEV',
                'devi_cour_eur' => 'DEV_COUR', 'devi_cour_usd' => 'DEV_COUR'];
            $commission = config('commission.' . $mapMethodeToCommission[$method]) * $amount;
            $conversionRate = $this->getConversionRate($method);
            $now = \Carbon\Carbon::now();
            $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
            //sender history
            $mapMethodeToTransactionType = ['cour_epar' => 'vir_epar', 'epar_cour' => 'vir_cour',
                'cour_devi_usd' => 'vir_devi', 'cour_devi_eur' => 'vir_devi',
                'devi_cour_eur' => 'vir_cour', 'devi_cour_usd' => 'vir_cour'];
            BalanceHistory::create([
                'id' => $nb + 1,
                'amount' => $amount + $commission,//without conversion rate
                'commission' => $commission,
                'transaction_type' => $mapMethodeToTransactionType[$method],
                'transaction_direction' => 'out',
                'isIntern' => true,
                'target' => $receiverAccount->number,
                'account_id' => $senderAccount->number,
                'created_at' => $now->format('Y-m-d H:i:s'),
                'updated_at' => $now->format('Y-m-d H:i:s'),
                'transfer_code' => $senderAccount->number . $receiverAccount->number . $now->format('YmdHi'),
            ]);


            //receiver history
            BalanceHistory::create([
                'id' => $nb + 2,
                'amount' => $amount * $conversionRate,//use conversion rate
                'transaction_type' => $mapMethodeToTransactionType[$method],
                'transaction_direction' => 'in',
                'isIntern' => true,
                'target' => $senderAccount->number,
                'account_id' => $receiverAccount->number,
                'created_at' => $now->format('Y-m-d H:i:s'),
                'updated_at' => $now->format('Y-m-d H:i:s'),
                'transfer_code' => $senderAccount->number . $receiverAccount->number . $now->format('YmdHi'),
            ]);
            //change the amount of the destination client
            $receiverAccount->balance = $receiverAccount->balance + ($amount * $conversionRate);
            $receiverAccount->save();

            $mapMethodeToTransferType = ['cour_epar' => 'cour_epar', 'epar_cour' => 'epar_cour',
                'cour_devi_usd' => 'cour_devi', 'cour_devi_eur' => 'cour_devi',
                'devi_cour_eur' => 'devi_cour', 'devi_cour_usd' => 'devi_cour'];
            $commissionDZD = $this->toDZD($commission, $conversionRate, $method);
            $amountDZD = $this->toDZD($amount, $conversionRate, $method);
            InternTransfer::create([
                'code' => $senderAccount->number . $receiverAccount->number . $now->format('YmdHi'),
                'amount' => $amountDZD,
                'transferDate' => $now->format('Y-m-d H:i:s'),
                'creationDate' => $now->format('Y-m-d H:i:s'),
                'status' => 'valide',
                'transfers_type' => $mapMethodeToTransferType[$method],
                'commission' => $commissionDZD,
                'conversionRate' => $conversionRate,
                'source_id' => $senderAccount->number,
                'destination_id' => $receiverAccount->number,
            ]);

            //we retrieve the amount from the sender account
            $senderAccount->balance = $senderAccount->balance - $commission - $amount;
            $senderAccount->save();


            //Tharwa commission history
            BalanceHistory::create([
                'id' => $nb + 3,
                'amount' => $commissionDZD,
                'transaction_type' => 'commiss',
                'transaction_direction' => 'in',
                'account_id' => 'THW000000DZD',
                'target' => $senderAccount->number,
                'created_at' => $now->format('Y-m-d H:i:s'),
                'updated_at' => $now->format('Y-m-d H:i:s')
            ]);
            //change the amount of the Tharwa account
            $tharwaAccount = Account::find('THW000000DZD');
            $tharwaAccount->balance = $tharwaAccount->balance + $commissionDZD;
            $tharwaAccount->save();

            //email virement entre ses comptes
            $client = $this->client()->get(['email', 'firstname', 'lastname'])->first();
            Mail::to($client->email)
                ->queue(new TransferMail($client->firstname . ' ' . $client->lastname
                    , 0
                    , $mapMethodeToCommission[$method]
                    , ""
                    , $amount
                    , ""
                ));//todo : _to & currency

            // all good
            /**commit - no problems **/
            DB::commit();

            return response([
                "saved" => true,
                "commission" => $commission
            ], config('code.CREATED'));

        } catch (\Exception $e) {

            // something went wrong
            /**rollback every thing - problems **/
            DB::rollback();

            if (!$hasTheAccount)
                return response(["account" => false], config('code.NOT_FOUND'));

            if (!$hasEnoughMoney)
                return response(["amount" => false], config('code.NOT_FOUND'));

            return response(["saved" => false], config('code.UNKNOWN_ERROR'));
        }

    }

    public function createIntern(Request $request)
    {
        //validation//todo check if the account is valid not blocked
        $validator = Validator::make($request->all(), [
            'receiver.account' => 'required|regex:/^THW[0-9]{6}DZD$/|exists:accounts,number',
            'amount' => 'required|numeric|min:0',
            'reason' => 'required|max:255',
        ]);
        $validator->sometimes('justification', 'required', function ($input) {//todo more validation
            return $input->amount > config('utils.amount_limit_validation'); // Amount "Depasse" 200 000
        });
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        $path = '';
        $image = '';
        $amount = $request->input('amount');
        $hasEnoughMoney = false;
        /**start transaction**/
        DB::beginTransaction();

        try {

            $senderAccount = $this->client()->accounts()
                ->courant()->first();//todo check methode first()

            $senderClient = $this->client()->get(['email', 'firstname', 'lastname'])->first();
            $receiverAccount = Account::find($request->input('receiver.account'));
            $receiverClient = $receiverAccount->client()->get(['email', 'firstname', 'lastname'])->first();

            //check the amount
            if (!$senderAccount->hasEnoughMoney($amount)) throw new \Exception;
            $hasEnoughMoney = true;

            //create the transfer
            $commission = config('commission.COUR_COUR') * $amount;
            $now = \Carbon\Carbon::now();
            $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
            //sender history
            BalanceHistory::create([
                'id' => $nb + 1,
                'amount' => $amount + $commission,
                'commission' => $commission,
                'transaction_type' => 'vir_client',
                'transaction_direction' => 'out',
                'isIntern' => true,
                'target' => $request->input('receiver.account'),
                'account_id' => $senderAccount->number,
                'created_at' => $now->format('Y-m-d H:i:s'),
                'updated_at' => $now->format('Y-m-d H:i:s'),
                'transfer_code' => $senderAccount->number . $request->input('receiver.account') . $now->format('YmdHi'),
            ]);

            //Tharwa commission history
            BalanceHistory::create([
                'id' => $nb + 2,
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

            if ($amount > config('utils.amount_limit_validation')) {
                $transferDate = null;
                $creationDate = $now->format('Y-m-d H:i:s');
                $status = 'traitement';

                //save image from 64base
                $file_name = strtoupper(md5(uniqid(rand(), true))) . ".jpeg";
                $path = 'pictures/justification/' . $file_name;//todo config
                //save file in disk
                $image = self::base64_to_jpeg($request->input('justification'), $path);

                //email virement besoin de validation
                //todo : mail to manager

            } else {
                //receiver history
                BalanceHistory::create([
                    'id' => $nb + 3,
                    'amount' => $amount,
                    'transaction_type' => 'vir_client',
                    'transaction_direction' => 'in',
                    'isIntern' => true,
                    'target' => $senderAccount->number,
                    'account_id' => $request->input('receiver.account'),
                    'created_at' => $now->format('Y-m-d H:i:s'),
                    'updated_at' => $now->format('Y-m-d H:i:s'),
                    'transfer_code' => $senderAccount->number . $request->input('receiver.account') . $now->format('YmdHi'),
                ]);
                //change the amount of the destination client just in case of < 200 000 else till validation
                $receiverAccount->balance = $receiverAccount->balance + $amount;
                $receiverAccount->save();

                $status = 'valide';
                $transferDate = $creationDate = $now->format('Y-m-d H:i:s');


                //email virement recu (to reciever)
                Mail::to($receiverClient->email)
                    ->queue(new TransferMail($receiverClient->firstname . ' ' . $receiverClient->lastname
                        , 1
                        , $senderClient->firstname . ' ' . $senderClient->lastname
                        , ""
                        , $amount
                        , ""
                    ));//todo : _to & currency
            }

            InternTransfer::create([
                'code' => $senderAccount->number . $request->input('receiver.account') . $now->format('YmdHi'),
                'amount' => $amount,
                'justification' => $image,
                'reason' => $request->input('reason'),
                'transferDate' => $transferDate,
                'creationDate' => $creationDate,
                'status' => $status,
                'transfers_type' => 'vir_client',
                'commission' => $commission,
                'source_id' => $senderAccount->number,
                'destination_id' => $request->input('receiver.account'),
            ]);


            //we retrieve the amount from the sender account
            $senderAccount->balance = $senderAccount->balance - $commission - $amount;
            $senderAccount->save();


            //email virement validé ou traitement
            Mail::to($senderClient->email)
                ->queue(new TransferMail($senderClient->firstname . ' ' . $senderClient->lastname
                    , 2
                    , $senderClient->firstname . ' ' . $senderClient->lastname
                    , $receiverAccount->firstname . ' ' . $receiverAccount->lastname
                    , $amount
                    , $status
                ));//todo : _to & currency


            // all good
            /**commit - no problems **/
            DB::commit();

            return response([
                "saved" => true,
                "commission" => $commission
            ], config('code.CREATED'));

        } catch (\Exception $e) {

            // something went wrong
            /**rollback every thing - problems **/
            DB::rollback();

            if (!$hasEnoughMoney)
                return response(["amount" => false], config('code.NOT_FOUND'));

            if (Storage::exists($path)) Storage::delete($path);

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
            return $input->amount > config('utils.amount_limit_validation'); // Amount "Depasse" 200 000
        });
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        $path = '';
        $image = '';
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
            if ($amount > config('utils.amount_limit_validation')) {
                $transferDate = null;
                $creationDate = $now->format('Y-m-d H:i:s');
                $status = 'traitement';

                //save image from 64base
                $file_name = strtoupper(md5(uniqid(rand(), true))) . ".jpeg";
                $path = 'pictures/justification/' . $file_name;//todo config
                //save file in disk
                $image = self::base64_to_jpeg($request->input('justification'), $path);

            } else {
                //generate the XML file that will be treated later equivalent to send money
                $xmlBody = View::make('xml_transfer_template', [
                    "code" => $virement_code,
                    "date" => $now->format('YmdHi'),
                    "senderName" => $this->client()->firstname . ' ' . $this->client()->lastname,
                    "senderAccount" => $senderAccount->number,
                    "receiverName" => $request->input('receiver.name'),
                    "receiverBank" => $request->input('receiver.bank'),
                    "receiverAccount" => $request->input('receiver.account'),
                    "amount" => $amount,
                    "reason" => $request->input('reason'),
                ])->render();
                $xmlBody = '<?xml version="1.0" encoding="utf-8"?>' . $xmlBody;

                Storage::disk('xml_out')->put($request->input('receiver.bank') . '/' . $virement_code . '.xml', $xmlBody);

                $status = 'valide';
                $transferDate = $creationDate = $now->format('Y-m-d H:i:s');
            }
            ExternTransfer::create([
                'code' => $virement_code,
                'amount' => $amount,
                'justification' => $image,
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


            //we retrieve the amount from the sender account
            $senderAccount->balance = $senderAccount->balance - $commission - $amount;
            $senderAccount->save();

            $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
            //sender history
            BalanceHistory::create([
                'id' => $nb + 1,
                'amount' => $amount + $commission,
                'commission' => $commission,
                'transaction_type' => 'transf',
                'transaction_direction' => 'out',
                'isIntern' => false,
                'target' => $request->input('receiver.name'),
                'account_id' => $senderAccount->number,
                'created_at' => $now->format('Y-m-d H:i:s'),
                'updated_at' => $now->format('Y-m-d H:i:s'),
                'transfer_code' => $virement_code,
            ]);

            //Tharwa commission history
            BalanceHistory::create([
                'id' => $nb + 2,
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

            // all good
            /**commit - no problems **/
            DB::commit();

            return response([
                "saved" => true,
                "commission" => $commission
            ], config('code.CREATED'));

        } catch (\Exception $e) {

            // something went wrong
            /**rollback every thing - problems **/
            DB::rollback();

            if (!$hasEnoughMoney)
                return response(["amount" => false], config('code.NOT_FOUND'));

            if (Storage::exists($path)) Storage::delete($path);

            return response(["saved" => false], config('code.UNKNOWN_ERROR'));
        }

    }

    public function createMicro(Request $request)
    {
        //validation//todo check if the account is valid not blocked
        $validator = Validator::make($request->all(), [
            'account' => 'required|regex:/^THW[0-9]{6}DZD$/|exists:accounts,number',
            'amount' => 'required|numeric|min:0|max:' . config('utils.amount_max_micro_transfer')
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

        $amount = $request->input('amount');
        $hasEnoughMoney = false;
        $didMicroTodayToSameClient = true;

        /**start transaction**/
        DB::beginTransaction();

        try {

            $senderAccount = $this->client()->accounts()
                ->courant()->first();//todo check methode first()

            $senderClient = $this->client()->get(['email', 'firstname', 'lastname'])->first();
            $receiverAccount = Account::find($request->input('account'));
            $receiverClient = $receiverAccount->client()->get(['email', 'firstname', 'lastname'])->first();

            //check the amount
            if (!$senderAccount->hasEnoughMoney($amount)) throw new \Exception;
            $hasEnoughMoney = true;

            $now = \Carbon\Carbon::now();

            //check if he already made a micro for the same client today
            if ($senderAccount->didMicroTodayToSameClient($request->input('account'), $now))
                throw new \Exception;
            $didMicroTodayToSameClient = false;

            //create the transfer
            $commission = config('commission.COUR_COUR') * $amount;
            $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
            //sender history
            BalanceHistory::create([
                'id' => $nb + 1,
                'amount' => $amount + $commission,
                'commission' => $commission,
                'transaction_type' => 'micro',
                'transaction_direction' => 'out',
                'isIntern' => true,
                'target' => $request->input('account'),
                'account_id' => $senderAccount->number,
                'created_at' => $now->format('Y-m-d H:i:s'),
                'updated_at' => $now->format('Y-m-d H:i:s'),
                'transfer_code' => $senderAccount->number . $request->input('account') . $now->format('YmdHi'),
            ]);

            //Tharwa commission history
            BalanceHistory::create([
                'id' => $nb + 2,
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
                'id' => $nb + 3,
                'amount' => $amount,
                'transaction_type' => 'micro',
                'transaction_direction' => 'in',
                'isIntern' => true,
                'target' => $senderAccount->number,
                'account_id' => $request->input('account'),
                'created_at' => $now->format('Y-m-d H:i:s'),
                'updated_at' => $now->format('Y-m-d H:i:s'),
                'transfer_code' => $senderAccount->number . $request->input('account') . $now->format('YmdHi'),
            ]);
            //change the amount of the destination client just in case of < 200 000 else till validation
            $receiverAccount->balance = $receiverAccount->balance + $amount;
            $receiverAccount->save();

            $status = 'traitement';//todo check with manager validation
            $transferDate = $creationDate = $now->format('Y-m-d H:i:s');


            //email virement recu (to reciever)
            Mail::to($receiverClient->email)
                ->queue(new TransferMail($receiverClient->firstname . ' ' . $receiverClient->lastname
                    , 1
                    , $senderClient->firstname . ' ' . $senderClient->lastname
                    , ""
                    , $amount
                    , ""
                ));//todo : _to & currency


            InternTransfer::create([
                'code' => $senderAccount->number . $request->input('account') . $now->format('YmdHi'),
                'amount' => $amount,
                'transferDate' => $transferDate,
                'creationDate' => $creationDate,
                'status' => $status,
                'transfers_type' => 'micro',
                'commission' => $commission,
                'source_id' => $senderAccount->number,
                'destination_id' => $request->input('account'),
            ]);


            //we retrieve the amount from the sender account
            $senderAccount->balance = $senderAccount->balance - $commission - $amount;
            $senderAccount->save();


            //email virement validé ou traitement
            Mail::to($senderClient->email)
                ->queue(new TransferMail($senderClient->firstname . ' ' . $senderClient->lastname
                    , 2
                    , $senderClient->firstname . ' ' . $senderClient->lastname
                    , $receiverAccount->firstname . ' ' . $receiverAccount->lastname
                    , $amount
                    , $status
                ));//todo : _to & currency


            // all good
            /**commit - no problems **/
            DB::commit();

            return response([
                "saved" => true,
                "commission" => $commission
            ], config('code.CREATED'));

        } catch (\Exception $e) {

            // something went wrong
            /**rollback every thing - problems **/
            DB::rollback();

            if (!$hasEnoughMoney)
                return response(["amount" => false], config('code.NOT_FOUND'));

            if ($didMicroTodayToSameClient)
                return response(["micro" => false], config('code.NOT_FOUND'));

            return response(["saved" => false], config('code.UNKNOWN_ERROR'));
        }
    }

    public function validationList()
    {

        $transferExternNeedValidations = ExternTransfer::needValidation()->get([
            'code', 'amount', 'justification', 'reason',
            'creationDate', 'extern_account_name', 'extern_account_number',
            'intern_account_id', 'direction'
        ]);

        //todo refactor and change it with with() fct
        foreach ($transferExternNeedValidations as $transfer) {
            $extenBank = Bank::find(
                substr($transfer->extern_account_number, 0, 3)
            )->name;
            if ($transfer->isFromExtern()) { //from thrwa to out
                $transfer->source_id = collect(
                    [
                        'firstname' => $transfer->extern_account_name,
                        'lastname' => '',
                        'account' => $transfer->extern_account_number,
                        'bank' => $extenBank
                    ]
                );

                $receiver = collect(
                    Account::find($transfer->intern_account_id)
                        ->client()
                        ->get(['firstname', 'lastname'])
                        ->first()
                );
                $receiver->put('account', $transfer->intern_account_id);
                $receiver->put('bank', "Tharwa");
                $transfer->destination_id = $receiver;
            } else {
                $sender = collect(
                    Account::find($transfer->intern_account_id)
                        ->client()
                        ->get(['firstname', 'lastname'])
                        ->first()
                );
                $sender->put('account', $transfer->intern_account_id);
                $sender->put('bank', "Tharwa");
                $transfer->source_id = $sender;

                $transfer->destination_id = collect(
                    [
                        'firstname' => $transfer->extern_account_name,
                        'lastname' => '',//todo
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
                    ->get(['firstname', 'lastname'])
                    ->first()
            );
            $sender->put('bank', "Tharwa");
            $sender->put('account', $transfer->source_id);
            $transfer->source_id = $sender;

            $receiver = collect(
                Account::find($transfer->destination_id)
                    ->client()
                    ->get(['firstname', 'lastname'])
                    ->first()
            );
            $receiver->put('bank', "Tharwa");
            $receiver->put('account', $transfer->destination_id);
            $transfer->destination_id = $receiver;
        }

        $transferNeedValidations = $transferInternNeedValidations
            ->merge($transferExternNeedValidations);

        foreach ($transferNeedValidations as $transferNeedValidation) {
            $transferNeedValidation->justification = url(config('filesystems.uploaded_file')) . '/'
                . $transferNeedValidation->justification;
        }

        $transferNeedValidations->sortBy("creationdate");

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

                    $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
                    //sender history
                    BalanceHistory::create([
                        'id' => $nb + 1,
                        'amount' => $interTransfer->amount,
                        'transaction_type' => 'reject',
                        'transaction_direction' => 'in',
                        //'isIntern' => null,
                        'target' => $interTransfer->destination_id,
                        'account_id' => $interTransfer->source_id,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s'),
                        'transfer_code' => $request->virement_code,
                    ]);

                    //return money if rejete
                    $senderAccount = Account::find($interTransfer->source_id);
                    $senderAccount->balance = $senderAccount->balance + $interTransfer->amount;
                    $senderAccount->save();

                } else {
                    $interTransfer->status = 'valide';
                    $interTransfer->save();

                    $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
                    //receiver history
                    BalanceHistory::create([
                        'id' => $nb + 1,
                        'amount' => $interTransfer->amount,
                        'transaction_type' => 'vir_client',
                        'transaction_direction' => 'in',
                        'isIntern' => true,
                        'target' => $interTransfer->source_id,
                        'account_id' => $interTransfer->destination_id,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s'),
                        'transfer_code' => $request->virement_code,
                    ]);

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

                    $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
                    //sender history
                    BalanceHistory::create([
                        'id' => $nb + 1,
                        'amount' => $exterTransfer->amount,
                        'transaction_type' => 'reject',
                        'transaction_direction' => 'in',
                        //'isIntern' => null,
                        'target' => $exterTransfer->extern_account_name,
                        'account_id' => $exterTransfer->intern_account_id,
                        'created_at' => $now->format('Y-m-d H:i:s'),
                        'updated_at' => $now->format('Y-m-d H:i:s'),
                        'transfer_code' => $request->virement_code,
                    ]);

                    //return money if rejete
                    $senderAccount = Account::find($exterTransfer->intern_account_id);
                    $senderAccount->balance = $senderAccount->balance + $exterTransfer->amount;
                    $senderAccount->save();

                } else {
                    $exterTransfer->status = 'valide';
                    $exterTransfer->save();

                    $sender = Account::find($exterTransfer->intern_account_id)
                        ->client()->get(['firstname', 'lastname'])->first();//todo check first()
                    //send money if valide (genrate the XML file that will be treated later)
                    $xmlBody = View::make('xml_transfer_template', [
                        "code" => $request->virement_code,
                        "date" => $now->format('YmdHi'),
                        "senderName" => $sender->firstname . ' ' . $sender->lastname,
                        "senderAccount" => $exterTransfer->intern_account_id,
                        "receiverName" => $exterTransfer->extern_account_name,
                        "receiverBank" => $exterTransfer->extern_bank,
                        "receiverAccount" => $exterTransfer->extern_account_number,
                        "amount" => $exterTransfer->amount,
                        "reason" => $exterTransfer->reason,
                    ])->render();
                    $xmlBody = '<?xml version="1.0" encoding="utf-8"?>' . $xmlBody;

                    Storage::disk('xml_out')->put($exterTransfer->extern_bank . '/' . $request->virement_code . '.xml', $xmlBody);
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


    public function getMicro()
    {
        //check if had
        $microToday = $this->client()->accounts()
            ->courant()->first()->microToday();

        if (is_null($microToday))
            return response(["micro" => false],
                config('code.NOT_FOUND'));

        $microTransefer = InternTransfer::find($microToday->transfer_code);

        if ('valide' == $microTransefer->status)
            return response(["micro" => false],
                config('code.NOT_FOUND'));


        //change to valid
        $microTransefer->status = 'valide';//todo
        $microTransefer->save();

        $accountSender = $microTransefer->senderAccount()->get()->first();
        $clientSender = $accountSender->client()->get()->first();

        $res = collect([
            "amount" => $microTransefer->amount,
            "name" => $clientSender->name(),
            "email" => $clientSender->email,
            "accountNumber" => $microTransefer->source_id,
        ]);

        return response($res,
            config('code.OK'));

    }

}
