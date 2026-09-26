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
        Schema::create('_servicos', function (Blueprint $table) {
            $table->integer('id', true);
            $table->unsignedBigInteger('user_id')->default(0)->index('utilizador_id');
            $table->integer('aeronave_id')->index('aeronave_id');
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->string('descricao', 4000)->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_servicos');
    }
};
