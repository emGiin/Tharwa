<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExchangeRateController extends Controller
{

    public function index()
    {
        //Maximum of 2 is supported for the free version
        $currencies1 = ['DZD_USD',
            'USD_DZD'];
        $currencies2 = ['DZD_EUR',
            'EUR_DZD'];

        $api = new \GuzzleHttp\Client();
        $res1 = $api->get('http://free.currencyconverterapi.com/api/v5/convert?q='.implode(",", $currencies1).'&compact=ultra')
            ->getBody();
        $res2 = $api->get('http://free.currencyconverterapi.com/api/v5/convert?q='.implode(",", $currencies2).'&compact=ultra')
            ->getBody();

        $collection = collect(json_decode($res1))->merge(json_decode($res2));

        return response($collection);

    }
}
