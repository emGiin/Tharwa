<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Manager extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'managers';

    protected $primaryKey = 'email';

    protected $guarded = [];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var boolean
     */
    public $incrementing = false;

    //todo refactor
    public static function check($userName, $password)
    {

        $client = static::where('email', $userName)->first(['password']);

        if (is_null($client)) return false;

        return Hash::check($password, $client->password);

    }

    public static function checkAndGetInfo($userName, $password)
    {

        $client = static::where('email', $userName)->first(['password', 'phone', 'role']);

        if (is_null($client) || !Hash::check($password, $client->password))
            return false;

        return ['phone' => $client->phone,
            'scope' => $client->role];

    }
}
