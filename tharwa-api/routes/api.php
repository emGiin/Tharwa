<?php

use Illuminate\Http\Request;
use App\Http\Middleware\AuthClient;
use App\Http\Middleware\AuthManager;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

//Route::fallback(function(){
//    return response()->json(['message' => 'Not Found!'], 404);
//})->name('fallback');

Route::post('/client', 'ClientController@create')->middleware(AuthClient::class);


Route::post('/clientRequests', 'RequestController@index')->middleware(AuthManager::class);

