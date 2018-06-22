<?php

namespace App\Http\Controllers;

use App\Client;
use App\ExternAccountTransferOrder;
use App\TransferOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

//use Illuminate\Validation\Validator;

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
            'receivers.extern.*.bank' => 'required|regex:/^[A-Z]{3}$/|exists:banks,code',
            'receivers.extern.*.account' => 'required|regex:/^[A-Z]{3}[0-9]{6}DZD$/|exists:accounts,number',
            'receivers.extern.*.amount' => 'required|numeric|min:0',
        ]);
        //todo
//        $validator->sometimes('justification', 'required', function ($input) {//todo more validation
//            return $input->amount > config('utils.amount_limit_validation'); // Amount "Depasse" 200 000
//        });
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

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
        foreach ($request['receivers']['intern'] as $internReceiver) {
            $transferOrder->internAccounts()
                ->attach($internReceiver['account'],
                    ['amount' => $internReceiver['amount']]
                );
        }

        foreach ($request['receivers']['extern'] as $externReceiver) {
            ExternAccountTransferOrder::create([
                'number' => $externReceiver['account'],
                'name' => $externReceiver['name'],
                'transferOrder_id' => $transferOrder->id,
                'amount' => $externReceiver['amount'],
//                'bank' => $externReceiver['bank'],//todo
            ]);
        }

        return response(["saved" => true], config('code.CREATED'));
    }


    private function client()
    {
        return resolve(Client::class);
    }

}
