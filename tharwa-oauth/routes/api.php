<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('oauth')->group(function () {

    Route::post('pincode', 'OauthController@pincode');

    Route::post('token','OauthController@token');

});


Route::fallback(function(){
    return response()->json(['message' => 'Not Found!'], 404);
})->name('fallback');