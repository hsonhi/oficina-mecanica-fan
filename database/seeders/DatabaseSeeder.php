<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Reis Manuel',
            'email' => 'rmanuel@oficinafan.ao',
            'phone' => '923526363',
            'patent' => 'Brigadeiro',
            'taxid' => '00045038LA036',
            'password' => '$2y$12$AQxtuRvotg7Pba/rWlBq3.2txvXudUAbWs8fQ8FcIrlvikrVCJs2a',
            'role' => 'administrador'
        ]);
    }
}
