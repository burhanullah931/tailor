<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Mail\CustomerNotify;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class CustomerController extends Controller
{
    public function index()
    {
        $users = User::whereHas("roles", function($q){ $q->where("name", "User"); })->latest()->get();
        return view('admin.customers.index', compact('users'));
    }
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => 'required|max:250',
            'address' => 'required',
        ];
    
        $customMessages = [
            'required' => 'The :attribute field is required',
            'unique' => 'The :attribute is already exist',
        ];
    
        $request->validate($rules, $customMessages);

        $customer = new User();
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->password = bcrypt('tailor@123');
        $customer->phone = $request->phone;
        $customer->address = $request->address;
        $customer->save();

        $customer->assignRole('User');

        try {
            Mail::to($customer->email)->send(new CustomerNotify($customer));
        } catch (\Throwable $th) {
            //throw $th;
        }
        return back()->with('message', 'Customer created successfully');
    }
    public function update(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$request->user_id,
            'phone' => 'required|max:250',
            'address' => 'required',
        ];
    
        $customMessages = [
            'required' => 'The :attribute field is required',
            'unique' => 'The :attribute is already exist',
        ];

        $request->validate($rules, $customMessages);

        $user = User::find($request->user_id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address
        ]);
        return back()->with('update', 'Customer updated successfully');

    }
    public function destroy($id)
    {
        User::find($id)->delete();
        return back()->with('delete', 'Customer deleted successfully');
    }
}
