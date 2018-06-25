<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBalnacesHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   //todo add if necesserry ! the status like : transfer rejected !!
        Schema::create('balancesHistory', function (Blueprint $table) {
            $table->increments('id');
//            $table->double('balance', 20, 8);//todo DOUBLE(size,d)
            $table->double('amount', 20, 8);//todo amount or balance
            $table->enum('transaction_type', ['commiss', 'vir_epar','vir_devi','vir_cour','vir_client', 'transf','reject']);
            $table->enum('transaction_direction', ['in', 'out']);//todo
            $table->char('account_id', 12);
            $table->foreign('account_id')->references('number')->on('accounts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('balancesHistory');
    }
}
