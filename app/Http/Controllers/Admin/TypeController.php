<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function index()
    {
        $types = Type::latest()->get();
        return view('admin.type.index', compact('types'));
    }
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:types',
            
        ];
    
        $customMessages = [
            'required' => 'The :attribute field is required',
            'unique' => 'The :attribute is already exist',
        ];
    
        $request->validate($rules, $customMessages);

        $type = new Type();
        $type->name = $request->name;
        $type->save();
        return back()->with('message', 'Type created successfully');
    }
    public function update(Request $request)
    {
        $rules = [
            'name' => 'required|unique:types,name,'.$request->type_id,
        ];
    
        $customMessages = [
            'required' => 'The :attribute field is required',
            'unique' => 'The :attribute is already exist',
        ];

        $request->validate($rules, $customMessages);

        $type = Type::find($request->type_id);
        $type->update([
            'name' => $request->name
        ]);
        return back()->with('update', 'Type updated successfully');
    }
    public function destroy($id)
    {
        Type::find($id)->delete();
        return back()->with('delete', 'Type deleted successfully');
    }
}
