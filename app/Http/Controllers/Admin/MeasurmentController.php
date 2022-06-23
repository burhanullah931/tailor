<?php

namespace App\Http\Controllers\Admin;

use App\Models\Part;
use App\Models\Type;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Measurment;
use PHPUnit\TextUI\XmlConfiguration\CodeCoverage\Report\Php;

class MeasurmentController extends Controller
{
    public function index($id)
    {
        $types = Type::all();
        return view('admin.measurment.index', compact('types'));
    }
    public function store(Request $request)
    {
        // dd($request);
        foreach ($request->partId as $key => $item) {
            Measurment::updateOrCreate([
                'part_id' => $item,
                'user_id' => $request->user_id,
                'measurment' => $request->measurment[$key]
            ]);
        }
        return back()->with('update', 'Measurment updated successfully');
        
    }
    public function PartsById($type_id, $user_id)
    {
        $parts =  Part::where('type_id', $type_id)->get();  
        $partIds = $parts->pluck('id')->toArray();
        $measurments = Measurment::where('user_id', $user_id)->whereIn('part_id', $partIds)->get();
      
        $html = [];
        foreach ($parts as $key => $part) {
            $measurmentValue = '';
            foreach ($measurments as $key => $measurment) {
                if($part->id == $measurment->part_id){
                    $measurmentValue = $measurment->measurment;
                }
            }
          
            $html1 = '
                    <div class="col-4 mb-3">
                    <label for="">'.$part->name.'</label>
                    <span class="d-flex p-2">
                        <input type="hidden" name="partId[]" value="'.$part->id.'">
                        <span> <img src="'.$part->photo.'" class="rounded" width="100" alt=""></span>
                        <span><input type="text" name="measurment[]" value="'.$measurmentValue.'" class="form-control m-3 w-90" placeholder="Measurment"></span>
                    </span>
                </div>
            ';
            array_push($html, $html1);
            // dump($measurmentValue);
        }

        return $html;
    }
}
