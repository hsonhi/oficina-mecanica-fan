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
        Schema::create('_servicos_material', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('servico_id')->index('servico_ordem_servico_id');
            $table->integer('material_id')->index('servico_ordem_material_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_servicos_material');
    }
};
