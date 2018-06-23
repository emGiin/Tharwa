<?php

namespace App\Http\Controllers;

use App\Account;
use App\BalanceHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    const types = ['vir_epar' => 'his_accounts',
        'vir_devi' => 'his_accounts',
        'vir_cour' => 'his_accounts',
        'vir_client' => 'tharwa_clients',
        'transf' => 'other_banks',
        'commiss' => 'commissions',
        'reject' => 'rejected_transfers',
        'micro'=>'micro'
    ];

    public function index()
    {
        $operations = BalanceHistory::get(['transaction_type', 'created_at']);

        $groupedOperations = $operations->groupBy(function ($item) {
            return self::types[$item['transaction_type']];
        });

        $groupedOperations = $groupedOperations->map(function ($item) {

            $byYear = $item->groupBy(function ($item) {
                return Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)
                    ->format('Y');
            })->map(function ($item) {

                $count = $item->count();
                $byQuarter = $item->groupBy(function ($item) {
                    return Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)
                        ->quarter;
                })->map(function ($item) {

                    $count = $item->count();
                    $byMonth = $item->groupBy(function ($item) {
                        return Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)
                            ->format('m');
                    })->map(function ($item) {
                        return $item->count();
                    });

                    $byMonth['count'] = $count;
                    return $byMonth;
                });

                $byQuarter['count'] = $count;
                return $byQuarter;
            });

            return $byYear;
        });

//        dd($groupedOperations);
        return response($groupedOperations, config('code.OK'));

        //todo counting groped by dates

        // Nombre d’opérations par type et par mois
        // Nombre d’opérations par type et par trimestre
        // Nombre d’opérations par type et par an

        //four types : between  HisAcc, THWClients, OtherBanks, Micro


        // Commissions par jour
        // Commissions par mois
        // Commissions par trimestre
        // Commissions par an
        $history = Account::find('THW000000DZD')
            ->history()
            ->get(['amount', 'created_at']);

        /**  todo!!!!
         * check the ui ! cause now res are FALSE ?
         **/

        $commissionsGroupedYear = $history->groupBy(function ($item) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)
                ->format('Y');
        })->map(function ($item) {
            return $item->reduce(function ($carryN, $itemN) {
                return $carryN + $itemN['amount'];
            });
        });

        $commissionsGroupedQuarter = $history->groupBy(function ($item) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)
                ->quarter;
        })->map(function ($item) {
            return $item->reduce(function ($carryN, $itemN) {
                return $carryN + $itemN['amount'];
            });
        });

        $commissionsGroupedMonth = $history->groupBy(function ($item) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)
                ->format('m');
        })->map(function ($item) {
            return $item->reduce(function ($carryN, $itemN) {
                return $carryN + $itemN['amount'];
            });
        });

        $commissionsGroupedDay = $history->groupBy(function ($item) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $item->created_at)
                ->format('d');
        })->map(function ($item) {
            return $item->reduce(function ($carryN, $itemN) {
                return $carryN + $itemN['amount'];
            });
        });

        $commissions = collect([
            'year' => $commissionsGroupedYear,
            'quarter' => $commissionsGroupedQuarter,
            'month' => $commissionsGroupedMonth,
            'day' => $commissionsGroupedDay,

        ]);


        $res = collect([
            'operations' => $t,
            'commissions' => $commissions,
        ]);

        return response($res, config('code.OK'));

    }

    public function getListCommissions(){
        $commissions = BalanceHistory::commission()
//            ->with()
            ->orderBy('created_at','desc')
            ->get();

        $res['MONTHCOUR']=$res['MONTHEPART']
            =$res['MONTHDEV']=$res['TRANSFER']=array();
        foreach ($commissions as $commission){
            switch ($commission['amount']) {
                case 100:
                    $key='MONTHCOUR';
                break;
                case 50:
                    $key='MONTHEPART';
                    break;
                case 200:
                    $key='MONTHDEV';
                    break;
                default :
                    $key='TRANSFER';
            }

            array_push($res[$key],$commission);
        }

//todo type
        return response($res, config('code.OK'));
    }
}
