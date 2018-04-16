<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInternTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('internTransfers', function (Blueprint $table) {
            $table->char('code', 36)->primary()->index();
            $table->double('amount', 20, 8);//todo DOUBLE(size,d)
            $table->string('justification')->nullable();
            $table->string('reason')->nullable();
            $table->dateTime('transferDate')->nullable();;
            $table->dateTime('creationDate');
            $table->enum('status', ['traitement', 'valide' ,'rejete']);
            $table->enum('transfers_type', ['commiss', 'cour_epar','epar_cour','cour_devi','devi_cour','vir_client']);//todo this is caused by tharwa account thr00000dzd  //['commiss', 'cour_epar','epar_cour','cour_devi','devi_cour','vir_client']
            $table->double('commission', 20, 8);
            $table->double('conversionRate', 20, 8)->default(1);
            $table->char('source_id', 12);
            $table->foreign('source_id')->references('number')->on('accounts');
            $table->char('destination_id', 12);
            $table->foreign('destination_id')->references('number')->on('accounts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('internTransfers');
    }
}
