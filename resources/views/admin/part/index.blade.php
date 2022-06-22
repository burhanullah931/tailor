@extends('layouts.backend.app')

@section('content')
<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div class="breadcrumb-title pe-3">{{request()->route('domain')}}</div>
    <div class="ps-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
                <li class="breadcrumb-item"><a href=""><i class="bx bx-home-alt"></i></a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Parts</li>
            </ol>
        </nav>
    </div>
    
</div>
<div class="mt-3 d-flex justify-content-between">
    <div>
        <h6 class="mt-2 text-uppercase">Parts </h6>
    </div>
    <div>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Add Part</button>
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
                        <th>Type</th>
                        <th>Photo</th>
                        <th>description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @foreach ($parts as $part)
                        <tr>
                            <td>{{$i++}}</td>
                            <td>{{$part->name}}</td>
                            <td>{{$part->type->name}}</td>
                            <td><img src="{{$part->photo}}" width="80" alt=""></td>
                            <td>{{$part->description}}</td>
                            <td>
                                <div class="d-flex order-actions">
                                    <a href="javascript:;" data-part="{{$part}}" class="ms-3 edit-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="bx bxs-edit"></i></a>
                                    <a href="javascript:;" data-id="{{$part->id}}" class="ms-3 delete-btn"><i class="bx bxs-trash"></i></a>
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
          <h4 class="modal-title">Add Part</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
  
        <!-- Modal body -->
        <div class="modal-body">
            <form method="POST" action="{{route('admin.part.store')}}" enctype="multipart/form-data">
                @csrf
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Select Type</label>
                    <select name="type_id" class="form-control" id="" required>
                        <option value="" selected disabled>Select Type</option>
                        @foreach ($types as $type)
                            <option value="{{$type->id}}">{{$type->name}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" name="name" placeholder="Enter Name" required value="{{old('name')}}" >
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Description</label>
                    <textarea name="description" class="form-control" id="" cols="30" rows="4"></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Photo</label>
                    <input type="file" name="photo" class="form-control" required>
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
            <form method="POST" action="{{route('admin.part.update')}}" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="part_id" id="part_id">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Select Type</label>
                    <select name="type_id" class="form-control" id="type_id" required>
                        <option value="" selected disabled>Select Type</option>
                        @foreach ($types as $type)
                            <option value="{{$type->id}}">{{$type->name}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" name="name" id="name" placeholder="Enter Name" required >
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Description</label>
                    <textarea name="description" class="form-control" id="description" cols="30" rows="4"></textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Photo</label>
                    <input type="file" name="photo" class="form-control">
                </div>
                <img src="" id="photo" width="100" alt="">
               
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
                var url = '{{ route("admin.part.destroy", ":id") }}';
                url = url.replace(':id', id);
                if (window.confirm("Are you want to delete.")) {
                    window.location = url;
                }
                return false;
            });

            $(document).on('click', '.edit-btn', function(){
                var part = $(this).data('part');
                // alert(JSON.stringify(user))
                $('#part_id').val(part.id);
                $('#name').val(part.name);
                $('#description').val(part.description);
                $('#type_id').val(part.type_id);
                $('#type_id').trigger('change');
                $('#photo').attr('src', part.photo);

            });
        })
    </script>
@endsection
