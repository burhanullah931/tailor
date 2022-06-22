<div class="sidebar-wrapper" data-simplebar="true">
    <div class="sidebar-header">
        <div>
            <img src="{{asset('public/backend/assets/images/logo-icon.png')}}" class="logo-icon" alt="logo icon">
        </div>
        <div>
            <h4 class="logo-text">Synadmin</h4>
        </div>
        <div class="toggle-icon ms-auto"><i class='bx bx-first-page'></i>
        </div>
    </div>
    <!--navigation-->
    <ul class="metismenu" id="menu">
        <li>
            <a href="javascript:;">
                <div class="parent-icon"><i class='bx bx-home'></i>
                </div>
                <div class="menu-title">Dashboard</div>
            </a>
           
        </li>
        <li>
            <a href="{{route('admin.customers')}}">
                <div class="parent-icon"><i class='bx bx-user'></i>
                </div>
                <div class="menu-title">Customers</div>
            </a>
        </li> 
        
        <li class="menu-label">Settings</li>
        <li>
            <a href="{{route('admin.types')}}">
                <div class="parent-icon"><i class='bx bx-briefcase-alt-2'></i>
                </div>
                <div class="menu-title">Type</div>
            </a>
        </li> 
        <li>
            <a href="{{route('admin.parts')}}">
                <div class="parent-icon"><i class='bx bx-briefcase-alt-2'></i>
                </div>
                <div class="menu-title">Parts</div>
            </a>
        </li> 
       
      
         
    </ul>
    <!--end navigation-->
</div>