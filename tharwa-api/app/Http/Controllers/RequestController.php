<?php

namespace App\Http\Controllers;

use App\Client;
use App\ClientRequest;
use App\Manager;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;



class RequestController extends Controller
{

    public function __construct()
    {
        $this->manager = resolve(Manager::class);
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

        if ($request->input('code') === 0){//rejected

            $rejectedRequest =ClientRequest::find($request->input('email'));
            $rejectedRequest->validated = true;
            $rejectedRequest->save();

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

                $acceptedClient->delete();

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
