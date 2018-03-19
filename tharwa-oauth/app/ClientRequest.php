<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class ClientRequest extends Model
{
    protected $table = 'clientRequests';

    protected $guarded = [];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var boolean
     */
    public $incrementing = false;


    public static function check($userName, $password)
    {

        $client = static::where('email', $userName)->first(['password','validated']);

        if (is_null($client)) return false;

        if( Hash::check($password, $client->password) )
            return $client;

    }

}
