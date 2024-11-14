<?php

/*
 * This file is part of the IndoRegion package.
 *
 * (c) Azis Hapidin <azishapidin.com | azishapidin@gmail.com>
 *
 */

namespace App\Models;

use AzisHapidin\IndoRegion\Traits\VillageTrait;
use Illuminate\Database\Eloquent\Model;
use App\Models\District;

/**
 * Village Model.
 */
class Village extends Model
{
    use VillageTrait;

    /**
     * Table name.
     *
     * @var string
     */
    protected $table = 'villages';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    protected $fillable = [
        'id',
        'district_id',
        'name',
        'wide',
        'center_coordinate',
        'area_json'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    // protected $hidden = [
    //     'district_id'
    // ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'center_coordinate' => 'json',
        'area_json' => 'json',
    ];

    /**
     * Village belongs to District.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function gapoktans()
    {
        return $this->hasMany(Gapoktan::class);
    }

    public function poktans()
    {
        return $this->hasMany(Poktan::class);
    }

    public function subaks()
    {
        return $this->hasMany(Subak::class);
    }

    public function landAgricultures()
    {
        return $this->hasMany(LandAgriculture::class);
    }

    public function outreachActivities()
    {
        return $this->hasMany(OutreachActivities::class);
    }

    public function ppls()
    {
        return $this->belongsToMany(Ppl::class, 'built_areas');
    }

    /**
     * Village has one agriculture recap.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function agricultureRecap()
    {
        return $this->hasOne(VillageAgricultureRecap::class);
    }
}
