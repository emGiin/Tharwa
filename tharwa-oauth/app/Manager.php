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

//    /**
//     * The attributes that are mass assignable.
//     *
//     * @var array
//     */
//    protected $fillable = [
//        'name', 'email', 'password',
//    ];

//    /**
//     * The attributes that should be hidden for arrays.
//     *
//     * @var array
//     */
//    protected $hidden = [
//        'password', 'remember_token',
//    ];

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
