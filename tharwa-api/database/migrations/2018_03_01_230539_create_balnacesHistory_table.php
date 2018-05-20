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
            $table->double('amount', 20, 8);//changed v2 db
            $table->double('commission', 20, 8)->nullable();//added v2 db
            $table->enum('transaction_type', ['commiss', 'vir_epar','vir_devi','vir_cour','vir_client', 'transf','reject','micro']);
            $table->enum('transaction_direction', ['in', 'out']);
            $table->char('account_id', 12);
            $table->foreign('account_id')->references('number')->on('accounts');
            $table->boolean('isIntern')->nullable(); //added v2 db
            $table->string('target');//added v2 db [is the one who receive or send the money , nb acc or name-if extern-]
            $table->char('transfer_code', 36)->nullable();//added v2 db
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
