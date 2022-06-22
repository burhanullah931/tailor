<?php

namespace App\Http\Controllers\Admin;

use App\Models\Part;
use App\Models\Type;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Measurment;

class MeasurmentController extends Controller
{
    public function index($id)
    {
        $types = Type::all();
        return view('admin.measurment.index', compact('types'));
    }
    public function store(Request $request)
    {
        dd($request);
        foreach ($request->measurment as $key => $measurment) {
            $check = Measurment::where(['user_id', $request->user_id, 'part_id' => $request->partId[$key]])->first();
            if (!$check) {
                $measurment = new Measurment();
                $measurment;
            } else {
                # code...
            }
            
        }
    }
    public function PartsById(Request $request)
    {
        return Part::where('type_id', $request->type_id)->get();  
    }
}
