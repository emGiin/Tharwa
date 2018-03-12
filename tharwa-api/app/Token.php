<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'oauth_access_tokens';

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

    public static function setPinCode($email, $pincode, $pin_code_expires_at,$scope)
    {

        $token_id = str_random(7) . uniqid('', true) . str_random(11);

        static::create([
            'id' => $token_id,
            'user_id' => $email,
            'pin_code' => $pincode,
            'pin_code_expires_at' => $pin_code_expires_at,
            'scopes' => $scope,
        ]);

        return $token_id;
    }

    public static function checkPinCode($token_id, $pincode)
    {
        $now = date('Y-m-d H:i:s');

        $row = static::where('id', $token_id)
            ->where('pin_code', $pincode)
            ->where('pin_code_expires_at', '>=', $now)
            ->first();

        if(empty($row))
            return false;

        $token = bcrypt($row->user_id). uniqid('', true) . str_random(11);

        $row->token = $token;
        $row->expires_at = $now;

        $row->save();

        return [
            'token_' => $token,
            'expires_at' => $now,
        ];

    }

}
