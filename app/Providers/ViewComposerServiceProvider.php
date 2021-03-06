<?php

namespace Orquestra\Providers;

use Illuminate\Support\ServiceProvider;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer(
            ['web.*', 'user.*', 'admin.*', 'auth.*'], 'Orquestra\Http\ViewComposers\GeneralComposer'
        );
 
        view()->composer(
            ['web.*'], 'Orquestra\Http\ViewComposers\Web\GeneralComposer'
        );
 
        view()->composer(
            ['user.*'], 'Orquestra\Http\ViewComposers\User\GeneralComposer'
        );
 
        view()->composer(
            ['admin.*'], 'Orquestra\Http\ViewComposers\Admin\GeneralComposer'
        );
        
        view()->composer(
            ['auth.*'], 'Orquestra\Http\ViewComposers\Auth\GeneralComposer'
        );
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
