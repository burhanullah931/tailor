<div class="mt-3">
    @if(session()->has('message') || session()->has('success'))
    {{$slot}}
    <div class="alert alert-success alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Success!</strong> {{session()->get('message') ?? session()->get('success')}}.
    </div>
    {{session()->forget('message')}}

    @elseif(session()->has('error'))

    {{$slot}}
    <div class="alert alert-danger alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Error!</strong>  {{session()->get('error')}}.
      </div>
    @endif

    @if($errors->any())
    <ul>
    <div class="alert alert-danger alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        @foreach($errors->all() as $error)
            <strong>Error!</strong> {{$error}}. <br>
        @endforeach
    </div>
    </ul>
    @endif

    @if(session()->has('delete'))
    <div class="alert alert-danger alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Deleted!</strong> {{session()->get('delete')}}.
    </div>
    @endif
    @if(session()->has('update'))
    <div class="alert alert-success alert-dismissible">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Updated!</strong> {{session()->get('update')}}.
    </div>
    @endif
</div>