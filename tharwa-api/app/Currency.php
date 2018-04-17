<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $table = 'currencies';

    protected $guarded = [];

    public $incrementing = false;

    protected $primaryKey = 'code';

//    protected $visible =
}
