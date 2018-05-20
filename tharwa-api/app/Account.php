<?php

namespace App;

use Carbon\Carbon;
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
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function history()
    {
        return $this->hasMany(BalanceHistory::class, 'account_id');
    }


    public function hasEnoughMoney($needed)
    {
        return $this->balance >= $needed;
    }


    public function scopeCourant($query)
    {
        return $query->where('type_id', 'COUR ');
    }

    public function scopeTypeSender($query, $method)
    {
        $mapAccSender = [
            'cour_epar' => 'COUR ',
            'epar_cour' => 'EPARN',
            'cour_devi_usd' => 'COUR ',
            'devi_cour_usd' => 'DVUSD',
            'cour_devi_eur' => 'COUR ',
            'devi_cour_eur' => 'DVEUR',
        ];
        return $query->where('type_id', $mapAccSender[$method]);
    }

    public function scopeTypeReceiver($query, $method)
    {
        $mapAccReceiver = [
            'cour_epar' => 'EPARN',
            'epar_cour' => 'COUR ',
            'cour_devi_usd' => 'DVUSD',
            'devi_cour_usd' => 'COUR ',
            'cour_devi_eur' => 'DVEUR',
            'devi_cour_eur' => 'COUR ',
        ];
        return $query->where('type_id', $mapAccReceiver[$method]);
    }

    public function internTransfersSender()
    {
        return $this->hasMany(InternTransfer::class, 'source_id');
    }

    public function internTransfersReceiver()
    {
        return $this->hasMany(InternTransfer::class, 'destination_id');
    }

    public function scopeValid($query)
    {
        return $query->where('isValid', true);
    }

    public function scopeBlocked($query)
    {
        return $query->where('isValid', false);
    }

    public function didMicroTodayToSameClient($clientAcc,$now)
    {
        $count = $this->history()
            ->where('transaction_type', 'micro')
            ->where('target', $clientAcc)
            ->whereDate('created_at', $now->format('Y-m-d'))
            ->count();
        return $count > 0;
    }

    public function microToday()
    {
        $now = Carbon::now();
        $micro = $this->history()
            ->where('transaction_type', 'micro')
            ->where('transaction_direction', 'in')
            ->whereDate('created_at', $now->format('Y-m-d'))
            ->get()
            ->first();

        return $micro;
    }
}
