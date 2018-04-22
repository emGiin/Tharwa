<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccountRequest extends Model
{
    protected $table = 'accountRequests';

    protected $guarded = [];

    protected $primaryKey = 'id';

    protected $visible = ["id", "created_at", "type_id","client"];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public static function notValidated()
    {
        return static::where('validated', false)->orderBy('created_at');
    }
}
