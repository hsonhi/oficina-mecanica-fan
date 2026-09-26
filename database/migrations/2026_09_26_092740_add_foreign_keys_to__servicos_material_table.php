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
        Schema::table('_servicos_material', function (Blueprint $table) {
            $table->foreign(['material_id'], 'servico_ordem_material_id')->references(['id'])->on('_material')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['servico_id'], 'servico_ordem_servico_id')->references(['id'])->on('_servicos')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('_servicos_material', function (Blueprint $table) {
            $table->dropForeign('servico_ordem_material_id');
            $table->dropForeign('servico_ordem_servico_id');
        });
    }
};
