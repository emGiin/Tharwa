<?php

namespace App\Console\Commands;

use App\Account;
use App\BalanceHistory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MonthlyCommission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'commission:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'take the monthly commissions from tharwa clients, those commission depend on the account type';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $mapTypeToCommissions = [
            'COUR ' => 'MONTHCOUR',
            'EPARN' => 'MONTHEPART',
            'DVEUR' => 'MONTHDEV',
            'DVUSD' => 'MONTHDEV',
        ];

        $conversionRates = $this->getConversionRates();

        /**start transaction**/
        DB::beginTransaction();

        try {

            $accounts = Account::get(['number', 'balance', 'type_id']);

            $accounts->shift();//omit tharwa account

            $now = \Carbon\Carbon::now();
            $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB

            $i = 1;
            foreach ($accounts as $account) {

                $commissionDZD = config('commission.' . $mapTypeToCommissions[$account->type_id]);
                $mounthlyCommission = $commissionDZD * $conversionRates[$account->type_id];

                //change balance
                $account->balance = $account->balance - $mounthlyCommission;
                $account->save();

                //account history
                BalanceHistory::create([
                    'id' => $nb + $i,
                    'amount' => $mounthlyCommission,
                    'transaction_type' => 'commiss',
                    'transaction_direction' => 'out',
                    'target' => 'THW000000DZD',
                    'account_id' => $account->number,
                    'created_at' => $now->format('Y-m-d H:i:s'),
                    'updated_at' => $now->format('Y-m-d H:i:s'),
                ]);
                $i++;

                //Tharwa commission history
                BalanceHistory::create([
                    'id' => $nb + $i,
                    'amount' => $commissionDZD,
                    'transaction_type' => 'commiss',
                    'transaction_direction' => 'in',
                    'account_id' => 'THW000000DZD',
                    'target' => $account->number,
                    'created_at' => $now->format('Y-m-d H:i:s'),
                    'updated_at' => $now->format('Y-m-d H:i:s')
                ]);
                $i++;

                //change the amount of the Tharwa account
                $tharwaAccount = Account::find('THW000000DZD');
                $tharwaAccount->balance = $tharwaAccount->balance + $commissionDZD;
                $tharwaAccount->save();
            }

            // all good
            /**commit - no problems **/
            DB::commit();

            $this->info('Monthly commissions taken Successfully! $$THARWA$$');

        } catch (\Exception $e) {

            // something went wrong
            /**rollback every thing - problems **/
            DB::rollback();

            $this->error('Something went wrong!');
        }

    }


    public function getConversionRates()
    {
        $currencies = ['DZD_USD',
            'DZD_EUR'];

        $api = new \GuzzleHttp\Client();

        $res = $api->get('http://free.currencyconverterapi.com/api/v5/convert?q=' . implode(",", $currencies) . '&compact=ultra')
            ->getBody();
        $res = json_decode($res);

        return [
            'COUR ' => 1,
            'EPARN' => 1,
            'DVUSD' => $res->DZD_USD,
            'DVEUR' => $res->DZD_EUR,
        ];
    }
}
