<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransferOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transferOrders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('justification')->nullable();
            $table->string('reason')->nullable();
            $table->enum('status', ['traitement', 'valide' ,'rejete']);
            $table->char('employer_account_id',12);
            $table->foreign('employer_account_id')->references('number')->on('accounts');
            $table->timestamps();
        });

        Schema::create('account_transferOrder', function (Blueprint $table) {
            $table->unsignedInteger('transferOrder_id');
            $table->foreign('transferOrder_id')->references('id')->on('transferOrders');
            $table->char('account_id', 12);
            $table->foreign('account_id')->references('number')->on('accounts');
            $table->double('amount', 20, 8);//todo DOUBLE(size,d)
            $table->index(['transferOrder_id','account_id']);
        });

        Schema::create('externAccount_transferOrder', function (Blueprint $table) {
            $table->char('number', 12)->primary()->index();
            $table->string('name');
            $table->unsignedInteger('transferOrder_id');
            $table->foreign('transferOrder_id')->references('id')->on('transferOrders');
            $table->double('amount', 20, 8);//todo DOUBLE(size,d)
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
        Schema::dropIfExists('transferOrders');
        Schema::dropIfExists('account_transferOrder');
        Schema::dropIfExists('externAccount_transferOrder');
    }
}
