<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'accounts';

    protected $guarded = [];

    public $incrementing = false;

    protected $primaryKey = 'number';

//    protected $visible =

    public function client()
    {
        return $this->belongsTo(Client::class,'client_id');
    }

    public function history()
    {
        return $this->hasMany(BalanceHistory::class,'account_id');
    }


    public function hasEnoughMoney($needed)
    {
        return $this->balance >= $needed;
    }


    public function scopeCourant($query)
    {
        return $query->where('type_id', 'COUR ');
    }

    public function internTransfersSender()
    {
        return $this->hasMany(InternTransfer::class,'source_id');
    }

    public function internTransfersReceiver()
    {
        return $this->hasMany(InternTransfer::class,'destination_id');
    }
}
