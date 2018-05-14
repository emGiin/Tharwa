<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('commission:monthly')
            ->monthlyOn(1, '00:00')
            ->timezone('Africa/Algiers');
//        $schedule->command('inspire')->dailyAt('08:00')->when(function () {
//            return \Carbon\Carbon::now()->endOfMonth()->isToday();
//        });

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

//        require base_path('routes/console.php');
    }
}
