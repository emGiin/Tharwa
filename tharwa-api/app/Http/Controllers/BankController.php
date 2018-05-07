<?php

namespace App\Http\Controllers;

use App\Bank;
use Illuminate\Http\Request;

class BankController extends Controller
{
    public function index()
    {
        $banks = Bank::where("code","<>","THW")->get(["code","name"]);
        return response($banks);
    }
}
