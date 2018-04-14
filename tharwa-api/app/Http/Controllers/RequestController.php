<?php

namespace App\Http\Controllers;

use App\ClientRequest;
use App\Manager;
use Illuminate\Http\Request;

class RequestController extends Controller
{

    public function __construct()
    {
        $this->manager =  resolve(Manager::class);
    }

    public function index()
    {
        return ClientRequest::notValidated();
    }
}
