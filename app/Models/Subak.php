<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subak extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'subaks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'village_id',
        'layer_group_id',
        'name',
        'leader',
        'secretary',
        'treasurer',
        'number_of_members',
        'since',
        'status',
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
     * Get the village that owns the Subak.
     */
    public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }

    /**
     * Get the layer group that owns the Subak.
     */
    public function layerGroup()
    {
        return $this->belongsTo(LayerGrup::class, 'layer_group_id');
    }

    public function commodities()
    {
        return $this->belongsToMany(Commodity::class, 'subak_commodities');
    }
}
