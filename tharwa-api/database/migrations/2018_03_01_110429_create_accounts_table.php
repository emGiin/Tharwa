<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->char('number', 12)->primary()->index();
            $table->double('balance', 20, 8)->default(0);
            $table->boolean('isValid')->default(true);
            $table->timestamps();
            $table->char('currency_id',3);
            $table->foreign('currency_id')->references('code')->on('currencies');
            $table->char('type_id',5);
            $table->string('client_id',55)->nullable();
//            $table->foreign('client_id')->references('email')->on('clients');//todo cause of tharwa acc
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
