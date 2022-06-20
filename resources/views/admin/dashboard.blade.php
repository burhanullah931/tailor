@extends('layouts.backend.app')

@section('content')
    <div class="row row-cols-1 row-cols-lg-4">
        <div class="col">
            <div class="card radius-10 overflow-hidden bg-gradient-cosmic">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <p class="mb-0 text-white">Total Orders</p>
                            <h5 class="mb-0 text-white">867</h5>
                        </div>
                        <div class="ms-auto text-white"><i class='bx bx-cart font-30'></i>
                        </div>
                    </div>
                    <div class="progress bg-white-2 radius-10 mt-4" style="height:4.5px;">
                        <div class="progress-bar bg-white" role="progressbar" style="width: 46%"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card radius-10 overflow-hidden bg-gradient-burning">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <p class="mb-0 text-white">Total Income</p>
                            <h5 class="mb-0 text-white">$52,945</h5>
                        </div>
                        <div class="ms-auto text-white"><i class='bx bx-wallet font-30'></i>
                        </div>
                    </div>
                    <div class="progress bg-white-2 radius-10 mt-4" style="height:4.5px;">
                        <div class="progress-bar bg-white" role="progressbar" style="width: 72%"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card radius-10 overflow-hidden bg-gradient-Ohhappiness">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <p class="mb-0 text-white">Total Users</p>
                            <h5 class="mb-0 text-white">24.5K</h5>
                        </div>
                        <div class="ms-auto text-white"><i class='bx bx-bulb font-30'></i>
                        </div>
                    </div>
                    <div class="progress bg-white-2 radius-10 mt-4" style="height:4.5px;">
                        <div class="progress-bar bg-white" role="progressbar" style="width: 68%"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card radius-10 overflow-hidden bg-gradient-moonlit">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <p class="mb-0 text-white">Comments</p>
                            <h5 class="mb-0 text-white">869</h5>
                        </div>
                        <div class="ms-auto text-white"><i class='bx bx-chat font-30'></i>
                        </div>
                    </div>
                    <div class="progress  bg-white-2 radius-10 mt-4" style="height:4.5px;">
                        <div class="progress-bar bg-white" role="progressbar" style="width: 66%"></div>
                    </div>
                </div>
            </div>
        </div>
    </div><!--end row-->
    
    <div class="card radius-10">
        <div class="card-header border-bottom-0 bg-transparent">
            <div class="d-lg-flex align-items-center">
                <div>
                    <h6 class="font-weight-bold mb-2 mb-lg-0">Monthly Revenue</h6>
                </div>
                <div class="ms-lg-auto mb-2 mb-lg-0">
                    <div class="btn-group-round">
                        <div class="btn-group">
                            <button type="button" class="btn btn-white">Day</button>
                            <button type="button" class="btn btn-white">Week</button>
                            <button type="button" class="btn btn-white">Month</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-primary radius-10 ms-lg-3">Download CSV</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div id="chart1"></div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-lg-8">
            <div class="card radius-10">
                <div class="card-header border-bottom-0 bg-transparent">
                    <div class="d-lg-flex align-items-center">
                        <div>
                            <h6 class="font-weight-bold mb-2 mb-lg-0">Historical Analytics</h6>
                        </div>
                        <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="d-flex align-items-center ms-auto font-13 gap-2">
                        <span class="border px-1 rounded cursor-pointer"><i class="bx bxs-circle text-danger me-1"></i>Visitors</span>
                        <span class="border px-1 rounded cursor-pointer"><i class="bx bxs-circle text-success me-1"></i>Chats</span>
                        <span class="border px-1 rounded cursor-pointer"><i class="bx bxs-circle text-info me-1"></i>Page Views</span>
                    </div>
                    <div id="chart2"></div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4">
            <div class="card radius-10 bg-primary">
                <div class="card-body">
                    <h6 class="text-white">Active Visitors</h6>
                    <h4 class="font-weight-bold text-white">3467</h4>
                    <p class="font-13 text-white">Page view per minute</p>
                    <div id="chart3"></div>
                </div>
            </div>
            <div class="card radius-10">
                <div class="card-body">
                    <div class="revenue-by-channel">
                        <h6 class="mb-4 font-weight-bold">Revenue by Channel</h6>
                        <div class="progress-wrapper">
                            <div class="d-flex align-items-center">
                                <div class="text-secondary">Direct</div>
                                <div class="ms-auto pe-4">$1,24,685</div>
                                <div class="text-success">65.6%</div>
                            </div>
                            <div class="progress mt-2" style="height:3px;">
                                <div class="progress-bar" role="progressbar" style="width: 65%"></div>
                            </div>
                        </div>
                        <div class="progress-wrapper mt-3">
                            <div class="d-flex align-items-center">
                                <div class="text-secondary">Referral</div>
                                <div class="ms-auto pe-4">$1,22,863</div>
                                <div class="text-success">45.6%</div>
                            </div>
                            <div class="progress mt-2" style="height:3px;">
                                <div class="progress-bar" role="progressbar" style="width: 55%"></div>
                            </div>
                        </div>
                        <div class="progress-wrapper mt-3">
                            <div class="d-flex align-items-center">
                                <div class="text-secondary">Social</div>
                                <div class="ms-auto pe-4">$1,24,685</div>
                                <div class="text-danger">25.2%</div>
                            </div>
                            <div class="progress mt-2" style="height:3px;">
                                <div class="progress-bar" role="progressbar" style="width: 35%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--end row-->
    <div class="row">
        <div class="col-12 col-lg-6 d-flex">
            <div class="card radius-10 w-100">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <h6 class="font-weight-bold mb-0">Order Status</h6>
                        </div>
                        <div class="dropdown ms-auto">
                            <div class="cursor-pointer text-dark font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i class="bx bx-dots-horizontal-rounded"></i>
                            </div>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="javaScript:;">Action</a>
                                <a class="dropdown-item" href="javaScript:;">Another action</a>
                                <div class="dropdown-divider"></div>	
                                <a class="dropdown-item" href="javaScript:;">Something else here</a>
                            </div>
                        </div>
                    </div>
                    <div id="chart4"></div>
                    <div class="d-flex align-items-center justify-content-between text-center">
                        <div>
                            <h5 class="mb-1 font-weight-bold">289</h5>
                            <p class="mb-0 text-secondary">Booked</p>
                        </div>
                        <div class="mb-1">
                            <h5 class="mb-1 font-weight-bold">348</h5>
                            <p class="mb-0 text-secondary">In Progress</p>
                        </div>
                        <div>
                            <h5 class="mb-1 font-weight-bold">152</h5>
                            <p class="mb-0 text-secondary">Canceled</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-6 d-flex">
            <div class="card w-100 radius-10 shadow-none bg-transparent">
                <div class="card-body p-0">
                    <div class="card radius-10 bg-primary">
                        <div class="card-body">
                            <div id="chart5"></div>
                            <div class="d-flex align-items-center justify-content-between">
                                <div>
                                    <h4 class="mb-0 font-weight-bold text-white">$534.8</h4>
                                    <p class="mb-0 text-white">Average Weekly Sales</p>
                                </div>
                                <div><i class='bx bx-diamond font-24 text-white'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-cols-1 row-cols-sm-2">
                        <div class="col">
                            <div class="card radius-10 mb-sm-0">
                                <div class="card-body">
                                    <div id="chart6"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card radius-10 mb-0">
                                <div class="card-body">
                                    <div id="chart7"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--end row-->

   
    <!--end row-->

   
@endsection