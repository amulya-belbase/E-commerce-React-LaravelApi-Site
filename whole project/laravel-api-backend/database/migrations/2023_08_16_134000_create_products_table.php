<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');  // same parameters as vendor's
            $table->foreign('user_id')->references('id')->on('vendors');    // reference user_id on vendors table
            $table->string('product');
            $table->string('pdimg')->nullable();
            $table->string('tags');
            $table->string('manufacturer');
            $table->string('price');
            $table->string('quantity');
            $table->longText('description');
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
        Schema::dropIfExists('products');
    }
}
