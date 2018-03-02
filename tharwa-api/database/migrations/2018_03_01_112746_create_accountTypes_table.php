<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accountTypes', function (Blueprint $table) {
            $table->char('code',5)->primary()->index();
            $table->char('name',25);
            $table->timestamps();
        });

        Schema::table('accountRequests', function (Blueprint $table) {
            $table->foreign('type_id')->references('code')->on('accountTypes');
        });

        Schema::table('accounts', function (Blueprint $table) {
            $table->foreign('type_id')->references('code')->on('accountTypes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accountTypes');
    }
}
