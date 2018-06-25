<?php

namespace App\Http\Controllers;

use App\Bank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BankController extends Controller
{
    public function index()
    {
        $banks = Bank::where("code","<>","THW")->get(["code","name"]);

        Log::info("demander la list des banques");

        return response($banks);
    }
}
