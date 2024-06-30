<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeAgriculture extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'type_agricultures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'layer_group_id',
        'name',
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
     * Get the layer group that owns the type agriculture.
     */
    public function layerGroup()
    {
        return $this->belongsTo(LayerGrup::class, 'layer_group_id');
    }

    public function commodities()
    {
        return $this->hasMany(Commodity::class, 'type_agriculture_id');
    }
}
