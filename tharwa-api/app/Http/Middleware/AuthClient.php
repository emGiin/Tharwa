<?php

namespace App\Http\Middleware;

use App\Client;
use App\Manager;
use App\Token;
use Closure;
use Illuminate\Support\Facades\App;

class AuthClient
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        //get token and pin
        $token = $request->header('Authorization');
        $pin = $request->header('Pin');
        $userInfo = null;

        //check their validity
        if (is_null($token) ||
            is_null($pin) ||
            !$userInfo = Token::checkAndGetScope($token,$pin)
        ){
            return response([
                "credentials" => false,
                "headers" => false
            ],config('code.UNAUTHORIZED'));
        }


        //create the user singleton
        App::instance(Client::class,Client::find($userInfo['id']));


        return $next($request);
    }
}
