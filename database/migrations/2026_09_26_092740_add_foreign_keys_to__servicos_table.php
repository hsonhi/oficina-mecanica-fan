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
        Schema::table('_servicos', function (Blueprint $table) {
            $table->foreign(['aeronave_id'], 'servico_aeronave_id')->references(['id'])->on('_aeronaves')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['user_id'], 'servico_utilizador_id')->references(['id'])->on('users')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('_servicos', function (Blueprint $table) {
            $table->dropForeign('servico_aeronave_id');
            $table->dropForeign('servico_utilizador_id');
        });
    }
};
