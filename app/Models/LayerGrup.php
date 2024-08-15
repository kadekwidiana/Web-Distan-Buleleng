<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayerGrup extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'layer_grups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'status',
        'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the type agricultures for the layer group.
     */
    public function typeAgricultures()
    {
        return $this->hasMany(TypeAgriculture::class, 'layer_group_id');
    }

    /**
     * Get the type land agricultures for the layer group.
     */
    public function typeLandAgricultures()
    {
        return $this->hasMany(TypeLandAgriculture::class, 'layer_group_id');
    }

    public function dataSpatials()
    {
        return $this->hasMany(DataSpatial::class, 'layer_group_id');
    }

    public function gapoktans()
    {
        return $this->hasMany(Gapoktan::class, 'layer_group_id');
    }

    public function poktans()
    {
        return $this->hasMany(Poktan::class, 'layer_group_id');
    }

    public function subaks()
    {
        return $this->hasMany(Subak::class, 'layer_group_id');
    }

    public function landAgricultures()
    {
        return $this->hasMany(LandAgriculture::class, 'layer_group_id');
    }
}
