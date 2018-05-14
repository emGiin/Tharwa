<?php

namespace App\Console\Commands;

use App\Account;
use App\BalanceHistory;
use App\Bank;
use App\ExternTransfer;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TreatExternTransfers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transfer:extern';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'treat the external transfers (received or emitted)';

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
        //treat arrived xml
        $files = Storage::disk('xml_in')->files('received');

        $nb = BalanceHistory::count();//todo fix this !all sol tested! re-migrate DB
        $i = 1;

        foreach ($files as $index => $file) {
            $fileName = explode('.', substr($file,strlen('received/')))[0] ;

            $contentFile = Storage::disk('xml_in')->get($file);

            if (36 != strlen($fileName)) {
                $this->rejectFile($file);//file name not valid
                continue;
            }
            $this->info('1');


            $senderAccount = substr($fileName, 0, 12);
            $receiverAccount = substr($fileName, 12, 12);
            $creationDate = substr($fileName, 24);

            $creationDate = Carbon::createFromFormat('YmdHi', $creationDate);
            $transferDate = Carbon::now();


            if ($creationDate > $transferDate) {
                $this->rejectFile($file);//date not logic (future !!)
                continue;
            }
            $this->info('2');

            libxml_use_internal_errors(true);
            $xml = simplexml_load_string($contentFile);
            if ($xml === false) {
                $this->rejectFile($file);//Not valid XML
                continue;
            }
            $this->info('3');


            if ($receiverAccount != "".$xml->destinataire->compte ||
                $senderAccount != "".$xml->titulaire->compte ||
                substr($fileName, 24) != "".$xml->date) {
                $this->rejectFile($file);// file name infos with the xml
                continue;
            }
            $this->info('4');

            $receiverAccount = Account::find($receiverAccount);

            if (is_null($receiverAccount) ||
                $receiverAccount->type_id != 'COUR ') {
                $this->rejectFile($file);// account does not exist or is not a "courant" one
                continue;
            }
            $this->info('5');


            $senderBank = Bank::find("".$xml->titulaire->banque);
            if (is_null($senderBank)) {
                $this->rejectFile($file);// sender bank supported
                continue;
            }
            $this->info('6');


            /**start transaction**/
            DB::beginTransaction();

            try {

                $amount = "".$xml->montant;
                $virement_code = "".$xml->numero;

                //create the transfer
                $commission = config('commission.RECVEXTBANK') * $amount;

                $status = 'valide';

                ExternTransfer::create([
                    'code' => $virement_code,
                    'amount' => $amount,//in this case he include the commission
                    'reason' => "".$xml->motif,
                    'transferDate' => $transferDate,
                    'creationDate' => $creationDate,
                    'status' => $status,
                    'commission' => $commission,
                    'intern_account_id' => "".$xml->destinataire->compte,
                    'direction' => 'in',
                    'extern_account_name' => "".$xml->titulaire->nom,
                    'extern_account_number' => $senderAccount,
                    'extern_bank' => "".$xml->titulaire->banque,
                ]);
                $this->info('7');


                //we add the amount to the receiver account
                $receiverAccount->balance = $receiverAccount->balance + $amount - $commission;
                $receiverAccount->save();

                //receiver history
                BalanceHistory::create([
                    'id' => $nb + $i,
                    'amount' => $amount - $commission,
                    'commission' => $commission,
                    'transaction_type' => 'transf',
                    'transaction_direction' => 'in',
                    'isIntern' => false,
                    'target' => "".$xml->titulaire->nom,
                    'account_id' => $senderAccount,
                    'created_at' => $creationDate,
                    'updated_at' => $creationDate,
                    'transfer_code' => $virement_code,
                ]);
                $i++;
                $this->info('8');

                //Tharwa commission history
                BalanceHistory::create([
                    'id' => $nb + $i,
                    'amount' => $commission,
                    'transaction_type' => 'commiss',
                    'transaction_direction' => 'in',
                    'account_id' => 'THW000000DZD',
                    'target' => $receiverAccount->number,
                    'created_at' => $creationDate,
                    'updated_at' => $creationDate
                ]);
                $i++;
                //change the amount of the Tharwa account
                $tharwaAccount = Account::find('THW000000DZD');
                $tharwaAccount->balance = $tharwaAccount->balance + $commission;
                $tharwaAccount->save();

//            Mail::to($request->input('email'))
//                ->queue(new ClientRequestValidatedMail($acceptedClient->firstname.' '.$acceptedClient->lastname
//                    , $request->input('code')));

                // all good
                /**commit - no problems **/
                DB::commit();

                $this->info('An extern transfer had been treated');

            } catch (\Exception $e) {

                // something went wrong
                /**rollback every thing - problems **/
                DB::rollback();

                $this->error('Error in an extern transfer!');
            }


        }


        //send xml to the banks

    }

    function rejectFile($fileName)
    {
        $fileName = substr($fileName,strlen('received/'));
        Storage::disk('xml_in')->move('received/' . $fileName, 'rejected/' . $fileName);
    }
}
