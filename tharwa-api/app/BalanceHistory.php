<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BalanceHistory extends Model
{
    protected $table = 'BALANCESHISTORY';

    protected $guarded = [];

    protected $primaryKey = 'id';

    protected $visible = ['amount','transaction_direction','created_at'];

}
