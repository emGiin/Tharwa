<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BalanceHistory extends Model
{
    protected $table = 'BALANCESHISTORY';

    protected $guarded = [];

    protected $primaryKey = 'id';

    protected $visible = ['amount', 'transaction_direction','commission','transaction_type',
        'created_at', 'target', 'transfer_code'];


    public function target()
    {
        if ($this->isintern == '1') {
            return Account::find($this->target)
                ->client()
                ->first()
                ->name();
        } else {
            return $this->target;
        }
    }

    public function scopeCommission($query)
    {
        return $query->where('transaction_type', 'commiss');
    }
}
