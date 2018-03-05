<?php

namespace App\Http\Controllers;

use App\ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class ClientController extends Controller
{

    public function create(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:55',
            'firstName' => 'required|max:25',
            'lastName' => 'required|max:25',
            'password' => 'required|max:100',
            'address' => 'required|max:255',
            'phone' => 'required|max:100',
//            'picture' => 'required|mimes:jpeg,bmp,png',//image
            'function' => 'required|max:100',
            'type' => 'required|digits:1',//todo number or in ['Client', 'Employeur']
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }


        /**start transaction**/
        DB::transaction(function () {

            //save file in disk
            $path = \Request::file('picture')->store('pictures/client');

            //save to db
            ClientRequest::create([
                'email' => \Request::input('email'),
                'firstName' => \Request::input('firstName'),
                'lastName' => \Request::input('lastName'),
                'password' => bcrypt(\Request::input('password')),
                'address' => \Request::input('address'),
                'picture' => $path,
                'function' => \Request::input('function'),
                'phone' => \Request::input('phone'),
                'type' => 'Client', // todo get type related to the num
            ]);

        }, 5);
        /**commit if no problems else rollback**/


        return response(["saved" => true], config('code.OK'));
    }

}
