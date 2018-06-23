<?php

namespace App\Http\Controllers;

use App\AccountRequest;
use App\AccountStatus;
use App\ClientRequest;
use App\ExternTransfer;
use App\InternTransfer;
use App\Manager;
use App\TransferOrder;
use Illuminate\Http\Request;
use Validator;

class BanquierController extends Controller
{
    public function __construct()
    {
//        $this->manager = resolve(Manager::class);
    }

    public function create(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:55|unique:managers,email',
            'firstName' => 'required|max:25',
            'lastName' => 'required|max:25',
            'password' => 'required|max:100',
            'address' => 'required|max:255',
            'phone' => 'required|max:100',
        ]);
        if ($validator->fails()) {
            return response($validator->errors(), config('code.BAD_REQUEST'));
        }

        //save to db
        Manager::create([
            'email' => \Request::input('email'),
            'firstName' => \Request::input('firstName'),
            'lastName' => \Request::input('lastName'),
            'password' => bcrypt(\Request::input('password')),
            'address' => \Request::input('address'),
            'phone' => \Request::input('phone'),
            'role' => 'Banquier',
        ]);

        return response(["saved" => true], config('code.CREATED'));
    }

    public function index()
    {
        $nbreInscriptions = ClientRequest::notValidated()->count();
        $nbreAutresComptes = AccountRequest::notValidated()->count();
        $nbreVirements = ExternTransfer::needValidation()->count() +
            InternTransfer::needValidation()->count();
        $nbreDeblocageComptes = AccountStatus::notValidated()->count();
        $nbreOrdresVirements = TransferOrder::notValidated()->count();

        $res = collect([
            'nbreInscriptions' => $nbreInscriptions,
            'nbreAutresComptes' => $nbreAutresComptes,
            'nbreVirements' => $nbreVirements,
            'nbreDeblocageComptes' => $nbreDeblocageComptes,
            'nbreOrdresVirements' => $nbreOrdresVirements
        ]);

        return response($res);
    }
}
