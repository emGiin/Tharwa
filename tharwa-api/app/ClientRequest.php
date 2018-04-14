<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientRequest extends Model
{
    protected $table = 'clientRequests';

    protected $guarded = [];

    protected $visible = ["email","firstname","lastname","address",
        "phone","picture","function","type","created_at"];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var boolean
     */
    public $incrementing = false;


    public static function notValidated()
    {
        return static::where('validated', false)->orderBy('created_at')->get();
    }

}
