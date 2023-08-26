<?php

namespace App\Providers;

use App\Models\Vendor;
use App\Observers\VendorObservor;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Vendor::observe(VendorObservor::class);
    }
}
