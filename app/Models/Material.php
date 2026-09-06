<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
#[Fillable(['nome', 'descricao', 'valor'])]
class Material extends Model
{
    // Explicitly define the database table name
    protected $table = 'material';

    // Specify your primary key if it isn't 'id'
    //protected $primaryKey = 'product_id'; 

    // Disable timestamps if your table doesn't have 'created_at' and 'updated_at'
    public $timestamps = false; 

    protected $fillable = [
        'nome',
        'descricao',
        'valor',
        // Add all other fields you send from your Inertia form here
    ];
}
