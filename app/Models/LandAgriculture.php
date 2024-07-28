<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandAgriculture extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'land_agricultures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'village_id',
        'poktan_id',
        'subak_id',
        'type_land_agriculture_id',
        'owner_id',
        'layer_group_id',
        'location',
        'address',
        'area_json',
        'land_area',
        'status',
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
        'area_json' => 'json',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the Poktan that owns the land agriculture.
     */
    public function poktan()
    {
        return $this->belongsTo(Poktan::class, 'poktan_id');
    }

    /**
     * Get the Subak that owns the land agriculture.
     */
    public function subak()
    {
        return $this->belongsTo(Subak::class, 'subak_id');
    }

    /**
     * Get the TypeLandAgriculture that owns the land agriculture.
     */
    public function typeLandAgriculture()
    {
        return $this->belongsTo(TypeLandAgriculture::class, 'type_land_agriculture_id');
    }

    /**
     * Get the LayerGroup that owns the land agriculture.
     */
    public function layerGroup()
    {
        return $this->belongsTo(LayerGrup::class, 'layer_group_id');
    }

    /**
     * Get the commodities that have the land agricultur.
     */
    public function commodities()
    {
        return $this->belongsToMany(Commodity::class, 'land_agriculture_commodities');
    }

    public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
