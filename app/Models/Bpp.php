<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bpp extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'bpps';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'district_id',
        'layer_group_id',
        'name',
        'location',
        'address',
        'photo',
        'phone_number',
        'email',
        'leader',
        'secretary',
        'treasurer',
        'number_of_members',
        'since',
        'status',
        'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'location' => 'json',
        // 'business_unit' => 'json',
        // 'tools_and_machines' => 'json',
        // 'photo' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the village that owns the Gapoktan.
     */
    public function district()
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    /** 
     * Get the layer group that owns the Gapoktan.
     */
    public function layerGroup()
    {
        return $this->belongsTo(LayerGrup::class, 'layer_group_id');
    }
}
