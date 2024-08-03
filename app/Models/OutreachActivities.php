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
        'built_area_id',
        'title',
        'location',
        'address',
        'photo',
        'file',
        'notes',
        'activity_report',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'location' => 'json',
    ];

    /**
     * Get the built area associated with the outreach activity.
     */
    public function builtArea()
    {
        return $this->belongsTo(BuiltArea::class);
    }

    public function village()
    {
        return $this->belongsTo(Village::class, 'village_id');
    }
}
