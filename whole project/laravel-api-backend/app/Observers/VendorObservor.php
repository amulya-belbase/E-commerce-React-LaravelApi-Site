<?php

namespace App\Observers;

use App\Models\Vendor;
use App\Notifications\WelcomeNotification;

class VendorObservor
{
    /**
     * Handle the Vendor "created" event.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return void
     */
    public function created(Vendor $vendor)
    {
        $vendor->notify(new WelcomeNotification());
    }

    /**
     * Handle the Vendor "updated" event.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return void
     */
    public function updated(Vendor $vendor)
    {
        //
    }

    /**
     * Handle the Vendor "deleted" event.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return void
     */
    public function deleted(Vendor $vendor)
    {
        //
    }

    /**
     * Handle the Vendor "restored" event.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return void
     */
    public function restored(Vendor $vendor)
    {
        //
    }

    /**
     * Handle the Vendor "force deleted" event.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return void
     */
    public function forceDeleted(Vendor $vendor)
    {
        //
    }
}
