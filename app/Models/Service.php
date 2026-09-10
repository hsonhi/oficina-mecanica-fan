<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class Service extends Model
{
    protected $table = "_servicos";

    protected $fillable = [
        "user_id",
        "aeronave_id",
        "data_inicio",
        "data_fim",
        "descricao",
    ];

    public function mechanics(): BelongsToMany
    {
        // Leave empty for default or add parameters:: tablename, relationship column names
        return $this->belongsToMany(Mechanic::class, '_servicos_mecanicos','servico_id', 'mecanicos_id');
    }

    public function materials(): BelongsToMany
    {
        return $this->belongsToMany(Material::class, '_servicos_material','servico_id', 'material_id');
    }

    public function aircrafts(): BelongsTo
    {
        return $this->belongsTo(Aircraft::class, 'aeronave_id');
    }

    public function mecs(): HasMany
    {
        // return $this->hasMany(RelatedModel::class, 'foreign_key_column', 'local_key_column');
        return $this->HasMany(ServiceMechanic::class,'servico_id', 'id');
    }

    public function mats(): HasMany
    {
        return $this->HasMany(ServiceMaterial::class,'servico_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }

    protected function dataInicio(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Carbon::createFromFormat('Y-m-d', $value)->format('Y-m-d'),
        );
    }
     protected function dataFim(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Carbon::createFromFormat('Y-m-d', $value)->format('Y-m-d'),
        );
    }
}
