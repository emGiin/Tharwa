<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExternAccountTransferOrder extends Model
{

    protected $table = 'externAccount_transferOrder';

    protected $guarded = [];

    public $incrementing = false;

//    protected $primaryKey = 'id';

//    protected $visible =
//
//    public function internAccounts()
//    {
//        return $this->belongsToMany(Account::class,
//            'account_transferOrder',
//            'transferOrder_id',
//            'account_id');
//    }
//
//    public function history()
//    {
//        return $this->hasMany(BalanceHistory::class, 'account_id');
//    }
//
//
//    public function hasEnoughMoney($needed)
//    {
//        return $this->balance >= $needed;
//    }
//
//
//    public function scopeCourant($query)
//    {
//        return $query->where('type_id', 'COUR ');
//    }

}
