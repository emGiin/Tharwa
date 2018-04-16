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
}
