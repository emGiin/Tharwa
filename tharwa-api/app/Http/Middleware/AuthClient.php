<?php

namespace App\Http\Middleware;

use App\Client;
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
        $userInfo = false;

        //header validation
        if (!is_null($token) || strlen($pin) == 4)
            $userInfo = Token::checkAndGetScope(substr($token, 7), $pin);

        //check their validity
        if (!$userInfo || ($userInfo["scope"] != "Client" &&
                    $userInfo["scope"] != "Employeur")
        ) {
            return response([
                "credentials" => false,
                "headers" => false
            ], config('code.UNAUTHORIZED'));
        }


        //create the user singleton
        App::instance(Client::class, Client::find($userInfo['id']));


        return $next($request);
    }
}
