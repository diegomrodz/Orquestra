<?php

namespace Orquestra\Http\ViewComposers;

use Illuminate\Support\Facades\Blade;
use Illuminate\View\View;

class GeneralComposer
{
    public function __construct()
    {
    }
    
    public function compose(View $view)
    {
        Blade::setEscapedContentTags('<%', '%>');
        Blade::setContentTags('<%%', '%%>');
        
        $view->with('APP_URL', env('APP_URL'));
    }
}