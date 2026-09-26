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
        Schema::table('_servicos_mecanicos', function (Blueprint $table) {
            $table->foreign(['mecanicos_id'], 'servico_mecanico_mecanicos_id')->references(['id'])->on('_mecanicos')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['servico_id'], 'servico_mecanico_servico_id')->references(['id'])->on('_servicos')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('_servicos_mecanicos', function (Blueprint $table) {
            $table->dropForeign('servico_mecanico_mecanicos_id');
            $table->dropForeign('servico_mecanico_servico_id');
        });
    }
};
