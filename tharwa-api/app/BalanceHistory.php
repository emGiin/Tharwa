<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BalanceHistory extends Model
{
    protected $table = 'BALANCESHISTORY';

    protected $guarded = [];

    protected $primaryKey = 'id';

    protected $visible = ['amount', 'transaction_direction', 'created_at', 'receiver'];


    public function receiver()
    {
        if ($this->isintern == '1') {
            return Account::find($this->receiver)
                ->client()
                ->first()
                ->name();
        } else {
            return $this->receiver;
        }
    }

}
