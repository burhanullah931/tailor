<header class="top_panel_wrap top_panel_style_8 scheme_original">

    <div class="top_panel_wrap_inner top_panel_inner_style_8 top_panel_position_over">


        <div class="top_panel_middle">
            <div class="content_wrap">
                <div class="contact_logo">
                    @yield('header')
                </div>
                <div class="menu_pushy_wrap">
                    <a href="#" class="menu_pushy_button"><span><span class="icon-menu">MENU</span></span></a>
                </div>
            </div>
        </div>

    </div>

</header>

<nav class="menu_pushy_nav_area pushy pushy-left scheme_original">


    <div class="menu_pushy_wrap">
        <a href="#" class="close-pushy">
            <span class="close-pushy-icon"></span>
            <div class="menu_pushy_button"><span><span class="icon-menu">MENU</span></span></div>
        </a>
    </div>

    <div class="pushy_inner">

        <div class="logo">
            <a href="index.html"><img
                    src="{{asset('public/frontend/wp-content/uploads/2019/10/Classic-Tailor-Murphy-Texas.png')}}"
                    class="logo_side" width="221" height="138"><br>
                <div class="logo_slogan">Tailoring and Alterations</div>
            </a>
        </div>
        <ul id="menu_pushy" class="menu_pushy_nav">
            <li id="menu-item-452"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-4 current_page_item menu-item-452">
                <a href="{{route('homepage')}}" aria-current="page"><span>HOME</span></a></li>
            <li id="menu-item-451" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-451"><a
                    href="{{route('about')}}"><span>ABOUT</span></a></li>
            <li id="menu-item-497"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-497">
                <a href="services-offered.html"><span>SERVICES</span></a>
                <ul class="sub-menu">
                    <li id="menu-item-443"
                        class="menu-item menu-item-type-post_type menu-item-object-services menu-item-443">
                        <a href="services/mens-apparel.html"><span>MEN</span></a></li>
                    <li id="menu-item-444"
                        class="menu-item menu-item-type-post_type menu-item-object-services menu-item-444">
                        <a href="services/womens-apparel.html"><span>WOMEN</span></a></li>
                    <li id="menu-item-442"
                        class="menu-item menu-item-type-post_type menu-item-object-services menu-item-442">
                        <a href="services/kid-alterations.html"><span>KIDS</span></a></li>
                    <li id="menu-item-441"
                        class="menu-item menu-item-type-post_type menu-item-object-services menu-item-441">
                        <a href="services/jeans-and-casual-wear"><span>JEANS</span></a></li>
                </ul>
            </li>
            <li id="menu-item-660" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-660"><a
                    href="prices.html"><span>PRICES</span></a></li>
            <li id="menu-item-453" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-453"><a
                    href="contacts.html"><span>CONTACT (972)633-2424</span></a>
            </li>
            <li id="menu-item-453" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-453"><a
                href="{{route('login')}}"><span>LOGIN</span></a>
        </li>
        </ul>
    </div>
</nav>
