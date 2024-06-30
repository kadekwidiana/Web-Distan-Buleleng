<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuiltArea extends Model
{
    use HasFactory;

    protected $fillable = [
        'village_id',
        'ppl_nip',
    ];

    /**
     * Get the village that owns the built area.
     */
    public function village()
    {
        return $this->belongsTo(Village::class);
    }

    /**
     * Get the PPL that owns the built area.
     */
    public function ppl()
    {
        return $this->belongsTo(Ppl::class, 'ppl_nip', 'nip');
    }
}
