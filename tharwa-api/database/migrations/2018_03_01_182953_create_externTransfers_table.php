<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExternTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('externTransfers', function (Blueprint $table) {
            $table->char('code', 36)->primary()->index();;
            $table->double('amount', 20, 8);//todo DOUBLE(size,d)
            $table->string('justification')->nullable();
            $table->string('reason')->nullable();
            $table->dateTime('transferDate')->nullable();//could be seen also as a validating date
            $table->dateTime('creationDate');
            $table->enum('status', ['traitement', 'valide' ,'rejete']);
            $table->double('commission', 20, 8);
            $table->double('conversionRate', 20, 8)->default(1);
            $table->char('intern_account_id', 12);
            $table->foreign('intern_account_id')->references('number')->on('accounts');
            $table->enum('direction', ['in', 'out']);
            $table->string('extern_account_name');
            $table->string('extern_account_number');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('externTransfers');
    }
}
