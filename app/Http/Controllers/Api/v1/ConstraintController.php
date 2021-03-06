<?php

namespace Orquestra\Http\Controllers\Api\v1;

use Illuminate\Http\Request;

use Orquestra\Constraint;

use Orquestra\Http\Requests;
use Orquestra\Http\Controllers\Controller;

class ConstraintController extends Controller
{
    public function byDevice($id) 
    {
        return Constraint::where('device_id', $id)
                         ->where('active', true)
                         ->get();
    }
    
    public function create(Request $request) 
    {
        return Constraint::create($request->all());
    }
    
    public function find($id) 
    {
        return Constraint::find($id);
    }
}
