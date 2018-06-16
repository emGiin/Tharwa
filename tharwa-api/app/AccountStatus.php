<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccountStatus extends Model
{
    protected $table = 'account_statuses';

    protected $guarded = [];

    public $incrementing = false;

//    protected $primaryKey = 'id';

//    protected $visible =

    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    public static function notValidated()
    {
        return static::where('treated', false)
            ->where('type', 'dem_debloq')
            ->orderBy('created_at');
    }
}
