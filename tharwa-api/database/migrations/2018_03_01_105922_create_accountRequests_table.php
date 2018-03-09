<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accountRequests', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('validated')->comment('la demande est elle validee par un admin ou non');
            $table->timestamps();
            $table->char('type_id',5);
            $table->string('client_id',55);
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
        Schema::dropIfExists('accountRequests');
    }
}
