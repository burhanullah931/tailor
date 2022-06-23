@extends('layouts.backend.app')

@section('content')
<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
    <div class="breadcrumb-title pe-3">{{request()->route('domain')}}</div>
    <div class="ps-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
                <li class="breadcrumb-item"><a href=""><i class="bx bx-home-alt"></i></a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Measurments</li>
            </ol>
        </nav>
    </div>
    
</div>
<div class="mt-3 d-flex justify-content-between">
    <div>
        <h6 class="mt-2 text-uppercase">Measurments </h6>
    </div>
    <div>
        {{-- <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Add Type</button> --}}
    </div>
</div>
<x-alert></x-alert>
<hr style="margin-top: 4px">
<div class="card">
    <div class="card-body">
       <div class="row">
            <div class="col-6 mb-3 ">
                <label for="">Select Type</label>
                <select name="type_id" class="form-control" id="type_id">
                    <option value="" selected disabled>Select Type</option>
                    @foreach ($types as $type)
                        <option value="{{$type->id}}">{{$type->name}}</option>
                    @endforeach
                </select>
            </div> 
            <form action="{{route('admin.measurment.store')}}" method="POST">
                @csrf
                <input type="hidden" name="user_id" id="user_id" value="{{request()->id}}">
                <div class="mt-4 row" id="parts">
                    
                </div>
                <div class="col-12 text-end d-none" id="submit-btn">
                    <button class="btn btn-primary">Submit</button>
                </div>
            </form>
       </div>
    </div>
</div>

@endsection

@section('scripts')
    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $(document).ready(function(){
            $('#type_id').change(function (e) { 
                e.preventDefault();
                var id = $('#type_id').val();
                var user_id = $('#user_id').val();
                
                url = "{{route('admin.parts.by.id', [':type_id', ':user_id'])}}";
                url = url.replace(':type_id', id);
                url = url.replace(':user_id', user_id);
                $.ajax({
                    type: "GET",
                    url: url,
                    // data: {'type_id':id},
                    success: function (data) {
                        console.log(data)
                        $('#parts').empty();
                        $('#parts').append(data);
                        
                        $('#submit-btn').removeClass('d-none');
                    }
                });
                
            });
        })
    </script>
@endsection
