<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExternTransfer extends Model
{
    protected $table = 'externTransfers';

    protected $guarded = [];

    public $incrementing = false;

    protected $primaryKey = 'code';

    public $timestamps = false;

    public function senderAccount()
    {
        return $this->belongsTo(Account::class, 'source_id');
    }

    public function receiverAccount()
    {
        return $this->belongsTo(Account::class, 'destination_id');
    }

    public function scopeNeedValidation($query)
    {
        return $query->where('amount','>','200000')
            ->where('status','traitement');
    }

    public function isFromExtern(){
        return $this->direction === 'in';
    }
}
