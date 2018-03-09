<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Client extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'clients';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var boolean
     */
    public $incrementing = false;

    public static function check($userName, $password)
    {

        $client = static::where('email', $userName)->first(['password']);

        if (is_null($client)) return false;

        return Hash::check($password, $client->password);

    }


    public static function checkAndGetInfo($userName, $password)
    {

        $client = static::where('email', $userName)->first(['password', 'phone', 'type']);

        if (is_null($client) || !Hash::check($password, $client->password))
            return false;

        return ['phone' => $client->phone,
            'scope' => $client->type];

    }
}
