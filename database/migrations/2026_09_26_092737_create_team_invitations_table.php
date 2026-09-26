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
        Schema::create('team_invitations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code', 64)->unique();
            $table->unsignedBigInteger('team_id')->index('team_invitations_team_id_foreign');
            $table->string('email');
            $table->string('role');
            $table->unsignedBigInteger('invited_by')->index('team_invitations_invited_by_foreign');
            $table->timestamp('expires_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_invitations');
    }
};
