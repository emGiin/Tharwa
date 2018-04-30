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

    static function base64_to_jpeg($base64_string, $output_file)
    {
        // split the string on commas
        // $data[ 0 ] == "data:image/png;base64"
        // $data[ 1 ] == <actual base64 string>
        $data = explode(',', $base64_string);

        Storage::put($output_file, base64_decode($data[1]));

        return $output_file;
    }

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

        $infos = collect(['infos'=>$client]);

        //get (amount & 10 last transact) for each account type
        //todo if accounts are blocked
        $accounts = $client->accounts()->get();
        foreach ($accounts as $account){
            $infos->put(
                trim($account->type_id),[
                 'amount' => $account->balance,
                 'history' => $account->history()->get(),
                ]);
        }

        return response($infos);
    }

    private function client()
    {
        return resolve(Client::class);
    }
}
