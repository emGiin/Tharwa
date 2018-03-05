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
            $table->double('balance', 20, 8)->default(0);//todo DOUBLE(size,d)
            $table->boolean('isValid')->default(false);
            $table->timestamps();
            $table->char('currency_id',3);
            $table->foreign('currency_id')->references('code')->on('currencies');
            $table->char('type_id',5);
            $table->char('client_id',55);
            $table->foreign('client_id')->references('email')->on('clients');
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
