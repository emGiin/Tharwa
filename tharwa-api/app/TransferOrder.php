<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransferOrder extends Model
{

    protected $table = 'transferOrders';

    protected $guarded = [];

    public $incrementing = false;

    protected $primaryKey = 'id';

//    protected $visible = ["id","justification" ,"reason" ,"status","employer_account_id","created_at"];

    public function internAccounts()
    {
        return $this->belongsToMany(Account::class,
            'account_transferOrder',
            'transferOrder_id',
            'account_id')
            ->withPivot('amount');
    }

    public function externAccounts()
    {
        return $this->hasMany(ExternAccountTransferOrder::class, 'transferOrder_id');
    }
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
