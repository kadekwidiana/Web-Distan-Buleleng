<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poktan extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'poktans';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'village_id',
        'gapoktan_id',
        'layer_group_id',
        'name',
        'leader',
        'secretary',
        'treasurer',
        'number_of_members',
        'since',
        'status',
        'ability_class',
        'group_confirmation_status',
        'year_of_class_assignment',
        'location',
        'address',
        'icon',
        'photo',
        'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'location' => 'json',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the village that owns the Poktan.
     */
    public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }

    /**
     * Get the gapoktan that owns the Poktan.
     */
    public function gapoktan()
    {
        return $this->belongsTo(Gapoktan::class, 'gapoktan_id');
    }

    /**
     * Get the layer group that owns the Poktan.
     */
    public function layerGroup()
    {
        return $this->belongsTo(LayerGrup::class, 'layer_group_id');
    }

    public function commodities()
    {
        return $this->belongsToMany(Commodity::class, 'poktan_commodities')->withTimestamps();
    }
}
