<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOauthAccessTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oauth_access_tokens', function (Blueprint $table) {
            $table->string('id', 100)->primary();
            $table->string('token',200)->index()->nullable();
            $table->string('user_id',55)->index();
            $table->char('pin_code',4)->index();
            $table->dateTime('pin_code_expires_at');
            $table->integer('client_id')->nullable();
            $table->string('name')->nullable();
            $table->string('scopes')->nullable();
            $table->boolean('revoked')->default(false);
            $table->timestamps();
            $table->dateTime('expires_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('oauth_access_tokens');
    }
}
