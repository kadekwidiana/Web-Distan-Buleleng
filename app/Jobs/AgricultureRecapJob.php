<?php

namespace App\Jobs;

use App\Http\Controllers\Schedule\DistrictAgricultureRecapController;
use App\Http\Controllers\Schedule\VillageAgricultureRecapController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AgricultureRecapJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
    }

    public static function processRecapJob()
    {
        DistrictAgricultureRecapController::generateRecap();
        VillageAgricultureRecapController::generateRecap();
    }
}
