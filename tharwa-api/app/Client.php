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

    protected $primaryKey = 'email';

//    protected $visible = ["email","firstname","lastname","type","picture"]; todo check if not needed any more

    protected $hidden = ['password',"created_at","updated_at"];

    public static function check($userName,$password){

        $client = static::where('email', $userName)->first(['password']);

        if (is_null($client)) return false;

        return Hash::check($password, $client->password);

    }


    public static function checkAndGetInfo($userName,$password){

        $client = static::where('email', $userName)->first(['password','phone','type']);

        if (is_null($client) || !Hash::check($password, $client->password))
            return false;

        return ['phone' => $client->phone,
            'scope' => $client->type];

    }

    public function accounts()
    {
        return $this->hasMany(Account::class,'client_id');
    }

    public function name(){
        return $this->firstname.' '.$this->lastname;
    }
}
