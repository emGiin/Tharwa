<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->string('email',55)->primary()->index();
            $table->string('firstName',25);
            $table->string('lastName',25);
            $table->string('password');//todo
            $table->string('address');
            $table->string('phone');
            $table->string('picture');
            $table->string('function');
            $table->enum('type', ['Client', 'Employeur']);
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
        Schema::dropIfExists('clients');
    }
}
