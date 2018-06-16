<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('type', ['bloq', 'debloq' ,'dem_debloq'])->nullable();
            $table->string('justification')->nullable();
            $table->boolean('treated')->default(false)->nullable();
            $table->char('type_id',5)->nullable();
            $table->char('account_id', 12)->primary()->index();
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
        Schema::dropIfExists('account_statuses');
    }
}
