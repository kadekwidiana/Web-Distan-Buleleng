<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutreachActivities extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'village_id',
        'ppl_nip',
        'title',
        'location',
        'address',
        'photo',
        'file',
        'notes',
        'activity_report',
        'others_involved',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'location' => 'json',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the built area associated with the outreach activity.
     */
    // public function builtArea()
    // {
    //     return $this->belongsTo(BuiltArea::class);
    // }

    public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }

    public function ppl()
    {
        return $this->belongsTo(Ppl::class);
    }

    public function gapoktanOutreachActivities()
    {
        return $this->belongsToMany(Gapoktan::class, 'gapoktan_outreach_activities')->withTimestamps();
    }

    public function poktanOutreachActivities()
    {
        return $this->belongsToMany(Poktan::class, 'poktan_outreach_activities')->withTimestamps();
    }

    public function subakOutreachActivities()
    {
        return $this->belongsToMany(Subak::class, 'subak_outreach_activities')->withTimestamps();
    }
}
