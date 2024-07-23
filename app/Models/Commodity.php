<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commodity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type_agriculture_id',
        'name',
        'icon',
        'description',
    ];

    /**
     * Get the type agriculture that owns the commodity.
     */
    public function typeAgriculture()
    {
        return $this->belongsTo(TypeAgriculture::class);
    }

    /**
     * Get the subaks that have the commodity.
     */
    public function subaks()
    {
        return $this->belongsToMany(Subak::class, 'subak_commodities');
    }

    /**
     * Get the land agricultures that have the commodity.
     */
    public function landAgricultures()
    {
        return $this->belongsToMany(LandAgriculture::class, 'land_agriculture_commodities');
    }

    /**
     * Get the land agricultures that have the commodity.
     */
    public function poktans()
    {
        return $this->belongsToMany(Poktan::class, 'poktan_commodities');
    }
}
