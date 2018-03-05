<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientRequests', function (Blueprint $table) {
            $table->char('email',55)->primary()->index();
            $table->char('firstName',25);
            $table->char('lastName',25);
            $table->string('password');//todo
            $table->string('address');
            $table->string('phone');
            $table->string('picture');
            $table->string('function');
            $table->enum('type', ['Client', 'Employeur']);
            $table->boolean('validated')->default(false);
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
        Schema::dropIfExists('clientRequests');
    }
}
