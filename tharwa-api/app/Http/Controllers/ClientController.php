<?php

namespace App\Http\Controllers;

use App\Client;
use App\ClientRequest;
use App\Mail\NewClientRequestMail;
use App\Manager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Validator;

class ClientController extends Controller
{

    public function create(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:55|unique:clientRequests,email|unique:clients,email',
            'firstName' => 'required|max:25',
            'lastName' => 'required|max:25',
            'password' => 'required|max:100',
            'address' => 'required|max:255',
            'phone' => 'required|max:100',
            'picture' => 'required',//image base64
            'function' => 'required|max:100',
            'type' => 'required|in:1,2',//todo number or in ['Client', 'Employeur']
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        /**start transaction**/
        DB::beginTransaction();

        try {

            //save image from 64base
            $file_name = strtoupper(md5(uniqid(rand(), true))) . ".jpeg";
            $path = 'pictures/client/' . $file_name;//todo config

            //save file in disk
            $image = self::base64_to_jpeg(\Request::input('picture'), $path);

            //save to db
            ClientRequest::create([
                'email' => \Request::input('email'),
                'firstName' => \Request::input('firstName'),
                'lastName' => \Request::input('lastName'),
                'password' => bcrypt(\Request::input('password')),
                'address' => \Request::input('address'),
                'picture' => $image,
                'function' => \Request::input('function'),
                'phone' => \Request::input('phone'),
                'type' => (\Request::input('type') === 1) ? 'Client' : 'Employeur',
            ]);

            $banqier = Manager::where('role', 'Banquier')->first();

            Mail::to($banqier->email)
                ->queue(new NewClientRequestMail(\Request::input('firstName') . ' ' . \Request::input('lastName')));

            // all good
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

    public function index()
    {
        //get : email, name, img
        $client = $this->client();

        $client->picture =
            url(config('filesystems.uploaded_file')) . '/'
            . $client->picture;

        
        $infos = collect(['infos' => $client]);


        //get (amount & 10 last transact) for each account type
        $accounts = $client->accounts()->valid()->get();

        $client['accountNumber'] = $accounts->firstWhere('type_id', 'COUR ')->number;

        foreach ($accounts as $account) {
            $infos->put(
                trim($account->type_id), [
                'amount' => $account->balance,
                'history' => $account->history()
                    ->orderBy('created_at', 'desc')
                    ->limit(10)
                    ->get()
                    ->each(function ($item) {
                        $item->target = $item->target();
                    }),
            ]);
        }

        //the Account are requested //todo if the case of the account req was rejected
        $accountRequests = $client->accountRequests()->get(["created_at", "type_id"]);
        foreach ($accountRequests as $accountRequest) {
            $infos->put(trim($accountRequest->type_id), [
                    "status" => "requested",
                    "at" => "".$accountRequest["created_at"],
                ]
            );
        }

        //the blocked accounts
        $blockedAccounts = $client->accounts()->blocked()->get(["updated_at", "type_id"]);
        foreach ($blockedAccounts as $blockedAccount) {
            $infos->put(trim($blockedAccount->type_id), [
                    "status" => "blocked",
                    "at" => "".$blockedAccount["updated_at"],
                ]
            );
        }

        $infos->put('amount_limit_validation',config('utils.amount_limit_validation'));

        return response($infos);
    }

    private function client()
    {
        return resolve(Client::class);
    }
}
