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
}
