@extends('layouts.frontend.app')

@section('content')

<section class="top_panel_image" style="background-image: url({{asset('public/frontend/wp-content/uploads/2019/10/bg2.jpg')}})">
    <div class="top_panel_image_hover"></div>
    <div class="top_panel_image_header">
        <div class="breadcrumbs">
            <a class="breadcrumbs_item home" href="index.html">Home</a><span class="breadcrumbs_delimiter"></span><span
                class="breadcrumbs_item current">About</span> </div>
        <h1 class="top_panel_image_title entry-title">About</h1>
    </div>
</section>

<!-- Site Overlay -->
<div class="site-overlay"></div>
<div class="header_mobile">
    <div class="content_wrap">
        <div class="menu_button icon-menu"></div>
        <div class="logo">
            <a href="index.html"><img src="{{asset('public/frontend/wp-content/uploads/2019/10/Classic-Tailor-Murphy-Texas.png')}}" class="logo_main"
                    width="221" height="138"><br>
                <div class="logo_slogan">Tailoring and Alterations</div>
            </a>
        </div>
    </div>
    <div class="side_wrap">
        <div class="close icon-cancel"></div>
        <div class="panel_top">
            <nav class="menu_main_nav_area">
                <ul id="menu_mobile" class="menu_main_nav">
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-452"><a
                            href="index.html"><span>HOME</span></a></li>
                    <li
                        class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-189 current_page_item menu-item-451">
                        <a href="about.html" aria-current="page"><span>ABOUT</span></a></li>
                    <li
                        class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-497">
                        <a href="services-offered.html"><span>SERVICES</span></a>
                        <ul class="sub-menu">
                            <li class="menu-item menu-item-type-post_type menu-item-object-services menu-item-443"><a
                                    href="services/mens-apparel.html"><span>MEN</span></a></li>
                            <li class="menu-item menu-item-type-post_type menu-item-object-services menu-item-444"><a
                                    href="services/womens-apparel.html"><span>WOMEN</span></a></li>
                            <li class="menu-item menu-item-type-post_type menu-item-object-services menu-item-442"><a
                                    href="services/kid-alterations.html"><span>KIDS</span></a></li>
                            <li class="menu-item menu-item-type-post_type menu-item-object-services menu-item-441"><a
                                    href="services/jeans-and-casual-wear"><span>JEANS</span></a></li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-660"><a
                            href="prices.html"><span>PRICES</span></a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-453"><a
                            href="contacts.html"><span>CONTACT (972)633-2424</span></a></li>
                </ul>
            </nav>
        </div>


        <div class="panel_bottom">
        </div>
    </div>
    <div class="mask"></div>
</div>
<div class="page_content_wrap page_paddings_no">


    <div class="content_wrap">
        <div class="content">
            <article
                class="itemscope post_item post_item_single post_featured_center post_format_standard post-189 page type-page status-publish hentry"
                itemscope itemtype="http://schema.org/Article">
                <section class="post_content" itemprop="articleBody">
                    <div class="vc_row wpb_row vc_row-fluid vc_custom_1470325261453">
                        <div class="wpb_column vc_column_container vc_col-sm-6">
                            <div class="vc_column-inner">
                                <div class="wpb_wrapper">
                                    <div
                                        class="wpb_single_image wpb_content_element vc_align_center  wpb_animate_when_almost_visible wpb_fadeInDown fadeInDown">

                                        <figure class="wpb_wrapper vc_figure">
                                            <div class="vc_single_image-wrapper   vc_box_border_grey"><img width="221"
                                                    height="138"
                                                    src="{{asset('public/frontend/wp-content/uploads/2019/10/Classic-Tailor-Murphy-Texas.png')}}"
                                                    class="vc_single_image-img attachment-full" alt="" loading="lazy" />
                                            </div>
                                        </figure>
                                    </div>
                                    <div class="vc_empty_space" style="height: 32px"><span
                                            class="vc_empty_space_inner"></span></div>
                                    <div
                                        class="wpb_single_image wpb_content_element vc_align_center  wpb_animate_when_almost_visible wpb_fadeInUp fadeInUp">

                                        <figure class="wpb_wrapper vc_figure">
                                            <div class="vc_single_image-wrapper vc_box_rounded  vc_box_border_grey"><img
                                                    class="vc_single_image-img "
                                                    src="{{asset('public/frontend/wp-content/uploads/2019/10/Alak.jpg')}}" width="450" height="416"
                                                    alt="Alak" title="Alak" /></div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wpb_column vc_column_container vc_col-sm-6">
                            <div class="vc_column-inner vc_custom_1571412075050">
                                <div class="wpb_wrapper">
                                    <div class="wpb_text_column wpb_content_element ">
                                        <div class="wpb_wrapper">
                                            <p>At Classic Tailor in Murphy Texas we pride ourselves in being the
                                                hometown tailor. Boasting 35 years of experience, the tailoring craft
                                                was passed on to me from my father who owned a tailor shop in Dallas for
                                                over 50 years! In true fashion of being family owned an operated, we
                                                offer personalized service and ALL alterations are done onsite.
                                                Distinctive clothing alterations and tailoring for men, women and
                                                children apparel is our specialty. <a
                                                    href="wp-content/uploads/2019/10/35-Years-experience.png"><img
                                                        loading="lazy" class="size-thumbnail wp-image-531 alignleft"
                                                        src="{{asset('public/frontend/wp-content/uploads/2019/10/35-Years-experience-150x150.png')}}"
                                                        alt="" width="150" height="150"
                                                        srcset="https://classictailorshop.com/wp-content/uploads/2019/10/35-Years-experience-150x150.png 150w, https://classictailorshop.com/wp-content/uploads/2019/10/35-Years-experience.png 200w"
                                                        sizes="(max-width: 150px) 100vw, 150px" /></a></p>
                                            <p>I myself, and our staff are trained to do quick, top notch professional
                                                work. We are friendly and courteous to all customers. We are proud of
                                                our staff and their professionalism. We want to make sure we are ALWAYS
                                                giving you the quality service you deserve!</p>
                                            <p>No alteration job is too small or too hard. We have a large, well
                                                equipped, alteration and repair department. Our staff is trained and
                                                experienced. Our shop has fitting room facilities so you can feel at
                                                ease when trying on any garment you wish to have altered.</p>
                                            <p>Feel free to just drop off your clothes and we will take care of the
                                                rest!</p>
                                            <p>Sincerely,</p>
                                            <p>Alak Abusaad<br />
                                                Owner</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vc_row wpb_row vc_row-fluid vc_custom_1470325261453">
                        <div class="wpb_column vc_column_container vc_col-sm-12">
                            <div class="vc_column-inner">
                                <div class="wpb_wrapper">
                                    <div class="vc_empty_space" style="height: 18px"><span
                                            class="vc_empty_space_inner"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section> <!-- </section> class="post_content" itemprop="articleBody"> -->
            </article>
            <!-- </article> class="itemscope post_item post_item_single post_featured_center post_format_standard post-189 page type-page status-publish hentry" itemscope itemtype="http://schema.org/Article"> -->
            <section class="related_wrap related_wrap_empty"></section>

        </div> <!-- </div> class="content"> -->
    </div> <!-- </div> class="content_wrap"> -->
</div> <!-- </.page_content_wrap> -->

<div id="sc_googlemap_1181789849" class="sc_googlemap" style="width:100%;height:400px;" data-zoom="16"
    data-style="default">
    <div id="sc_googlemap_1181789849_1" class="sc_googlemap_marker" data-title="Classic Tailor"
        data-description="Classic Tailor" data-address="223 E Farm to Market Rd 544, Murphy, TX 75094"
        data-latlng="33.0131805,-96.6075539" data-point="wp-content/uploads/2016/08/marker.png"></div>
</div>
@endsection
