<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mechanic extends Model
{
    // Explicitly define the database table name
    protected $table = "_mecanicos";

    // Specify your primary key if it isn't 'id'
    //protected $primaryKey = "ID";

    // Disable timestamps if your table doesn't have 'created_at' and 'updated_at'
    //public $timestamps = false;

    protected $fillable = [
        "nome",
        "telefone",
        // Add all other fields you send from your Inertia form here
    ];
}
