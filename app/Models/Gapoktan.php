<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gapoktan extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'gapoktans';

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
        'location',
        'address',
        'icon',
        'photo',
        'confirmation_sk',
        'confirmation_sk_no',
        'business_unit',
        'farming_business',
        'business_process',
        'tools_and_machines',
        'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'location' => 'json',
        'business_unit' => 'json',
        'tools_and_machines' => 'json',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the village that owns the Gapoktan.
     */
    public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }

    /**
     * Get the layer group that owns the Gapoktan.
     */
    public function layerGroup()
    {
        return $this->belongsTo(LayerGrup::class, 'layer_group_id');
    }
}
