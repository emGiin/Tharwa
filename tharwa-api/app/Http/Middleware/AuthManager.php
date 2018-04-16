<?php

namespace App\Http\Middleware;

use App\Manager;
use App\Token;
use Closure;
use Illuminate\Support\Facades\App;

class AuthManager
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
        if (!$userInfo || ($userInfo["scope"] != "Banquier" &&
                $userInfo["scope"] != "Gestionnaire")
        ) {
            return response([
                "credentials" => false,
                "headers" => false
            ], config('code.UNAUTHORIZED'));
        }


        //create the user singleton
        App::instance(Manager::class, Manager::find($userInfo['id']));

        return $next($request);
    }
}
