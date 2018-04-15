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
        return $this->belongsTo(Client::class);
    }
}
