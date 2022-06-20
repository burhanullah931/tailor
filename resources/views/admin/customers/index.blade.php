@extends('layouts.backend.app')

@section('content')
<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div class="breadcrumb-title pe-3">{{request()->route('domain')}}</div>
    <div class="ps-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
                <li class="breadcrumb-item"><a href=""><i class="bx bx-home-alt"></i></a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Customers</li>
            </ol>
        </nav>
    </div>
    
</div>
<div class="mt-3 d-flex justify-content-between">
    <div>
        <h6 class="mt-2 text-uppercase">Customers </h6>
    </div>
    <div>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Add Customer</button>
    </div>
</div>
<x-alert></x-alert>
<hr style="margin-top: 4px">
<div class="card">
    <div class="card-body">
        <div class="table-responsive">
            <table id="example1" class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @foreach ($users as $user)
                        <tr>
                            <td>{{$i++}}</td>
                            <td>{{$user->name}}</td>
                            <td>{{$user->email}}</td>
                            <td>{{$user->phone}}</td>
                            <td>{{$user->address}}</td>
                            <td>
                                <div class="d-flex order-actions">
                                    <a href="javascript:;" data-user="{{$user}}" class="ms-3 edit-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="bx bxs-edit"></i></a>
                                    <a href="javascript:;" data-id="{{$user->id}}" class="ms-3 delete-btn"><i class="bx bxs-trash"></i></a>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
<!-- add  Modal -->
<div class="modal" id="createModal">
    <div class="modal-dialog">
      <div class="modal-content">
  
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Add Customer</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
  
        <!-- Modal body -->
        <div class="modal-body">
            <form method="POST" action="{{route('admin.customer.store')}}">
                @csrf
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" name="name" placeholder="Enter Name" required value="{{old('name')}}" >
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" name="email" placeholder="abc@tailor.com" required value="{{old('email')}}" >
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Phone</label>
                    <input type="tel" class="form-control" name="phone" required placeholder="0342 5665241" value="{{old('phone')}}" >
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Address</label>
                    <textarea name="address" id="" cols="" rows="4" class="form-control" placeholder="Dawat coloni timergara" required></textarea>
                </div>
                <div class="w-100 text-end ">
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>

<div class="modal" id="editModal">
    <div class="modal-dialog">
      <div class="modal-content">
  
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Update Customer</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
  
        <!-- Modal body -->
        <div class="modal-body">
            <form method="POST" action="{{route('admin.customer.update')}}">
                @csrf
                <input type="hidden" name="user_id" id="user_id">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" name="name" id="name" placeholder="Enter Name" required >
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="abc@tailor.com" required>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Phone</label>
                    <input type="tel" class="form-control" name="phone" required id="phone" placeholder="0342 5665241" >
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Address</label>
                    <textarea name="address" cols="" rows="4" class="form-control" id="address" placeholder="Dawat coloni timergara" required></textarea>
                </div>
                <div class="w-100 text-end ">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
      </div>
    </div>
</div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function(){
            $(document).on('click', '.delete-btn', function(){
                var id = $(this).data('id');
                var url = '{{ route("admin.customer.destroy", ":id") }}';
                url = url.replace(':id', id);
                if (window.confirm("Are you want to delete.")) {
                    window.location = url;
                }
                return false;
            });

            $(document).on('click', '.edit-btn', function(){
                var user = $(this).data('user');
                // alert(JSON.stringify(user))
                $('#user_id').val(user.id);
                $('#name').val(user.name);
                $('#email').val(user.email);
                $('#phone').val(user.phone);
                $('#address').val(user.address);
            });
        })
    </script>
@endsection
