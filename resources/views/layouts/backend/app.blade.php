
<!doctype html>
<html lang="en" class="color-sidebar sidebarcolor3 color-header headercolor1">


<!-- Mirrored from codervent.com/synadmin/demo/vertical/index3.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 25 Jun 2021 08:01:41 GMT -->
<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--favicon-->
	<link rel="icon" href="{{asset('public/backend/assets/images/favicon-32x32.png')}}" type="image/png" />
	<!--plugins-->
	<link href="{{asset('public/backend/assets/plugins/simplebar/css/simplebar.css')}}" rel="stylesheet" />
	<link href="{{asset('public/backend/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css')}}" rel="stylesheet" />
	<link href="{{asset('public/backend/assets/plugins/metismenu/css/metisMenu.min.css')}}" rel="stylesheet" />
	<!-- loader-->
	<link href="{{asset('public/backend/assets/css/pace.min.css')}}" rel="stylesheet" />
	<script src="{{asset('public/backend/assets/js/pace.min.js')}}"></script>
	<!-- Bootstrap CSS -->
	<link href="{{asset('public/backend/assets/css/bootstrap.min.css')}}" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&amp;display=swap" rel="stylesheet">
	<link href="{{asset('public/backend/assets/css/app.css')}}" rel="stylesheet">
	<link href="{{asset('public/backend/assets/css/icons.css')}}" rel="stylesheet">
	<!-- Theme Style CSS -->
	<link rel="stylesheet" href="{{asset('public/backend/assets/css/dark-theme.css')}}" />
	<link rel="stylesheet" href="{{asset('public/backend/assets/css/semi-dark.css')}}" />
	<link rel="stylesheet" href="{{asset('public/backend/assets/css/header-colors.css')}}" />
	<link href="{{asset('public/backend/assets/plugins/datatable/css/dataTables.bootstrap5.min.css')}}" rel="stylesheet" />

	<title>Synadmin – Bootstrap5 Admin Template</title>
</head>

<body>
	<!--wrapper-->
	<div class="wrapper">
		<!--sidebar wrapper -->
		@include('layouts.backend.sidebar')
		<!--end sidebar wrapper -->
		<!--start header -->
		@include('layouts.backend.header')
		<!--end header -->
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content">
				@yield('content')
			</div>
		</div>
		<!--end page wrapper -->
		<!--start overlay-->
		<div class="overlay toggle-icon"></div>
		<!--end overlay-->
		<!--Start Back To Top Button--> <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>
		<!--End Back To Top Button-->
		<footer class="page-footer">
			<p class="mb-0">Copyright © 2021. All right reserved.</p>
		</footer>
	</div>
	<!--end wrapper-->
	<!--start switcher-->
	
	<!--end switcher-->
	<!-- Bootstrap JS -->
	<script src="{{asset('public/backend/assets/js/bootstrap.bundle.min.js')}}"></script>
	<!--plugins-->
	<script src="{{asset('public/backend/assets/js/jquery.min.js')}}"></script>
	<script src="{{asset('public/backend/assets/plugins/simplebar/js/simplebar.min.js')}}"></script>
	<script src="{{asset('public/backend/assets/plugins/metismenu/js/metisMenu.min.js')}}"></script>
	<script src="{{asset('public/backend/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js')}}"></script>
	<script src="{{asset('public/backend/assets/plugins/apexcharts-bundle/js/apexcharts.min.js')}}"></script>
	<script src="{{asset('public/backend/assets/js/index3.js')}}"></script>
	<script src="{{asset('public/backend/assets/plugins/datatable/js/dataTables.bootstrap5.min.js')}}"></script>
	<script src="{{asset('public/backend/assets/plugins/datatable/js/jquery.dataTables.min.js')}}"></script>
	<script>
		new PerfectScrollbar('.best-selling-products');
		new PerfectScrollbar('.recent-reviews');
		new PerfectScrollbar('.support-list');
	</script>
	<!--app JS-->
	<script src="{{asset('public/backend/assets/js/app.js')}}"></script>
</body>


<!-- Mirrored from codervent.com/synadmin/demo/vertical/index3.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 25 Jun 2021 08:01:46 GMT -->
</html>
@yield('scripts')
<script>
	$(document).ready(function() {
		$('#example').DataTable();
		$('#example1').DataTable();
	  } );
</script>

<script>
    $(document).ready(function() {
        var table = $('#example2').DataTable( {
            lengthChange: false,
            buttons: [ 'copy', 'excel', 'pdf', 'print']
        } );

        table.buttons().container()
            .appendTo( '#example2_wrapper .col-md-6:eq(0)' );

    });
</script>