<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InternTransfer extends Model
{
    protected $table = 'internTransfers';

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
        return $query->where('amount', '>', config('utils.amount_need_validation'))
            ->where('status', 'traitement');
    }
}
