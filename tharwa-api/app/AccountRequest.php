<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccountRequest extends Model
{
    protected $table = 'accountRequests';

    protected $guarded = [];

//    public $incrementing = false;

    protected $primaryKey = 'id';

//    protected $visible =

    public function client()
    {
        return $this->belongsTo(Client::class,'client_id');
    }
}
