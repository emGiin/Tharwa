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

    /**
     * mobile client
     **/
Route::post('/client', 'ClientController@create');


Route::post('/virment/intern', 'VirmentController@createIntern')->middleware(AuthClient::class);


    /**
     * web managers
     **/
Route::get('/clientRequests', 'RequestController@index')->middleware(AuthManager::class);

Route::post('/clientRequests', 'RequestController@edit')->middleware(AuthManager::class);


Route::post('/banquier', 'BanquierController@create')->middleware(AuthManager::class);


Route::get('/virment/validations', 'VirmentController@validationList')->middleware(AuthManager::class);

