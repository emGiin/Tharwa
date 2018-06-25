<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    protected $table = 'banks';

    protected $guarded = [];

    public $incrementing = false;

    protected $primaryKey = 'code';

}
