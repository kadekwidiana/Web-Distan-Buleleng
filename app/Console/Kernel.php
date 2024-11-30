<?php

namespace App\Console;

use App\Jobs\AgricultureRecapJob;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        // $schedule->call(function () {
        //     AgricultureRecapJob::processRecapJob();
        // })->everyMinute();
        $schedule->call(function () {
            AgricultureRecapJob::processRecapJob();
        })->dailyAt('02:00')->timezone('Asia/Makassar');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
