<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ppl extends Model
{
    use HasFactory;

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'nip';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nip',
        'account_id',
        'name',
        'employee_status',
        'front_title',
        'back_title',
        'place_of_birth',
        'date_of_birth',
        'gender',
        'religion',
        'areas_of_expertise',
        'last_education',
        'field_of_education',
        'major',
        'school_name',
        'work_location',
        'date_sk',
        'date_spmt',
        'position',
        'address',
        'provinsi',
        'regency',
        'post_code',
        'phone_number',
        'email',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'date_sk' => 'date',
        'date_spmt' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the account associated with the Ppl.
     */
    public function account()
    {
        return $this->belongsTo(User::class, 'account_id');
    }

    public function villages()
    {
        return $this->belongsToMany(Village::class, 'built_areas')->withTimestamps();
    }
}
