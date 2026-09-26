<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('_aeronaves', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('chassi', 64)->unique('chassi');
            $table->integer('ano');
            $table->string('marca');
            $table->string('modelo');
            $table->string('cor', 64);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_aeronaves');
    }
};
