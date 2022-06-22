<?php

namespace App\Http\Controllers\Admin;

use App\Models\Part;
use App\Models\Type;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PartController extends Controller
{
    public function index()
    {
        $types = Type::all();
        $parts = Part::latest()->get();
        return view('admin.part.index', compact('types', 'parts'));
    }
    public function store(Request $request)
    {
        $part = new Part();
        $part->type_id = $request->type_id;
        $part->name = $request->name;
        $part->description = $request->description;
        if($request->photo){
            $imageName = time().'.'.$request->photo->extension();  
            $request->photo->move(public_path('/images'), $imageName);
            $part->photo = asset("public/images")."/".$imageName;
        }
        $part->save();
        return back()->with('message', 'Part created successfully');
       
    }
    public function update(Request $request)
    {
        $part = Part::find($request->part_id);
        $photo = $part->photo;
        if($request->photo){
            $imageName = time().'.'.$request->photo->extension();  
            $request->photo->move(public_path('/images'), $imageName);
            $photo = asset("public/images")."/".$imageName;
        }
        $part->update([
            'type_id' => $request->type_id,
            'name' => $request->name,
            'photo' => $photo,
            'description' => $request->description
        ]);
        return back()->with('update', 'Part updated successfully');
    }
    public function destroy($id)
    {
        Part::find($id)->delete();
        return back()->with('delete', 'Part deleted successfully');
    }
}
