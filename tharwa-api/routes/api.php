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

Route::get('/client', 'ClientController@index')->middleware(AuthClient::class);

Route::post('/virement/myaccount', 'VirmentController@createBetweenMyAccounts')->middleware(AuthClient::class);
Route::post('/virement/intern', 'VirmentController@createIntern')->middleware(AuthClient::class);
Route::post('/virement/extern', 'VirmentController@createExtern')->middleware(AuthClient::class);

Route::post('/account', 'AccountController@create')->middleware(AuthClient::class);

Route::get('/bank', 'BankController@index')->middleware(AuthClient::class);

    /**
     * web managers
     **/
Route::get('/clientRequests', 'RequestController@index')->middleware(AuthManager::class);
Route::post('/clientRequests', 'RequestController@edit')->middleware(AuthManager::class);

Route::post('/banquier', 'BanquierController@create');//->middleware(AuthManager::class);

Route::get('/virement/validations', 'VirmentController@validationList')->middleware(AuthManager::class);
Route::post('/virement/validations', 'VirmentController@validateVirement')->middleware(AuthManager::class);

Route::get('/account/validations', 'AccountController@validationList')->middleware(AuthManager::class);
Route::post('/account/validations', 'AccountController@validateAccount')->middleware(AuthManager::class);

Route::get('/dashboard', 'DashboardController@index')->middleware(AuthManager::class);
