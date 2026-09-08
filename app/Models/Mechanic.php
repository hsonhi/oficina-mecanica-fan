<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mechanic extends Model
{
    protected $table = "_mecanicos";

    protected $fillable = [
        "nome",
        "telefone",
    ];
}
