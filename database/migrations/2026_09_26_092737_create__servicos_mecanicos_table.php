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
        Schema::create('_servicos_mecanicos', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('servico_id')->index('servico_mecanico_servico_id');
            $table->integer('mecanicos_id')->index('servico_mecanico_mecanicos_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_servicos_mecanicos');
    }
};
