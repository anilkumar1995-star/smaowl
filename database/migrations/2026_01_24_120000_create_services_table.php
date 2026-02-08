<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->index();
            $table->string('name');
            $table->string('category')->nullable();
            $table->decimal('rate', 14, 4)->default(0);
            $table->integer('min')->default(1);
            $table->integer('max')->default(1000);
            $table->boolean('refill')->default(false);
            $table->boolean('cancel')->default(false);
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->unique(['external_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('services');
    }
};
