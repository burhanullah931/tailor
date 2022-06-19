/* global jQuery:false */
/* global MR_MURPHY_STORAGE:false */

jQuery(document).ready(function() {
    "use strict";
    MR_MURPHY_STORAGE['theme_init_counter'] = 0;
    mr_murphy_init_actions();
});

jQuery(window).on('beforeunload', function() {
    "use strict";
    // Show preloader
    if (jQuery.browser && !jQuery.browser.safari) jQuery('#page_preloader').css({display: 'block', opacity: 0}).animate({opacity:0.8}, 300);
});


// Theme init actions
function mr_murphy_init_actions() {
    "use strict";

    if (MR_MURPHY_STORAGE['vc_edit_mode'] && jQuery('.vc_empty-placeholder').length==0 && MR_MURPHY_STORAGE['theme_init_counter']++ < 30) {
        setTimeout(mr_murphy_init_actions, 200);
        return;
    }


    // Checkbox with "I agree..."
    if (jQuery('input[type="checkbox"][name="i_agree_privacy_policy"]:not(.inited),input[type="checkbox"][name="gdpr_terms"]:not(.inited),input[type="checkbox"][name="wpgdprc"]:not(.inited)').length > 0) {
        jQuery('input[type="checkbox"][name="i_agree_privacy_policy"]:not(.inited),input[type="checkbox"][name="gdpr_terms"]:not(.inited),input[type="checkbox"][name="wpgdprc"]:not(.inited)')
            .addClass('inited')
            .on('change', function(e) {
                if (jQuery(this).get(0).checked)
                    jQuery(this).parents('form').find('button,input[type="submit"]').removeAttr('disabled');
                else
                    jQuery(this).parents('form').find('button,input[type="submit"]').attr('disabled', 'disabled');
            }).trigger('change');
    }


    jQuery('a, .page-id-20 a.sc_button').filter(function() {
        return this.hostname && this.hostname !== location.hostname;
    }).attr('target','_blank');




    jQuery('.vc_editor').find('.vc_trx_column_item').each(function (key, value) {
        var classList = jQuery(value).children().first()[0].className.split(/\s+/),
            colSizeClassPattern = /column-\d+_\d+/;
        classList.forEach(function(entry) {
            if (colSizeClassPattern.test(entry) != null) {
                jQuery(value).first().addClass(entry);
            }
        });
    });

    // Hide preloader
    jQuery('#page_preloader').animate({opacity:0}, 500, function() { jQuery(this).css({display: 'none'}); });

    // Check for Retina display
    if (mr_murphy_is_retina()) {
        mr_murphy_set_cookie('mr_murphy_retina', 1, 365);
    }

    mr_murphy_ready_actions();

    // Add resize handlers after VC row stretch handlers on('resize.vcRowBehaviour', ...)
    setTimeout(function() {
        jQuery(window).on('resize.mr_murphy', function() {
            mr_murphy_resize_actions();
            mr_murphy_scroll_actions()
        }).trigger('resize.mr_murphy');
    }, 10);

    // Add resize on VC action vc-full-width-row
    jQuery(document).on('vc-full-width-row', function() {
        mr_murphy_resize_actions();
        mr_murphy_scroll_actions()
    });

    // Scroll handlers
    jQuery(window).on('scroll.mr_murphy', function() {
        "use strict";
        mr_murphy_scroll_actions();
    });
}



// Theme first load actions
//==============================================
function mr_murphy_ready_actions() {
    "use strict";

    // Call theme specific action (if exists)
    //----------------------------------------------
    if (window.mr_murphy_theme_ready_actions) mr_murphy_theme_ready_actions();


    // Widgets decoration
    //----------------------------------------------

    // Decorate nested lists in widgets and side panels
    jQuery('.widget ul > li').each(function() {
        if (jQuery(this).find('ul').length > 0) {
            jQuery(this).addClass('has_children');
        }
    });


    // Archive widget decoration
    jQuery('.widget_archive a').each(function() {
        var val = jQuery(this).html().split(' ');
        if (val.length > 1) {
            val[val.length-1] = '<span>' + val[val.length-1] + '</span>';
            jQuery(this).html(val.join(' '))
        }
    });


    // Navigate on category change
    jQuery('.widget_subcategories').on('change', 'select', function() {
        var dropdown = jQuery(this).get(0);
        if ( dropdown.options[dropdown.selectedIndex].value > 0 ) {
            location.href = MR_MURPHY_STORAGE['site_url'] + "/?cat="+dropdown.options[dropdown.selectedIndex].value;
        }
    });


    // Calendar handlers - change months
    jQuery('.widget_calendar').on('click', '.month_prev a, .month_next a', function(e) {
        "use strict";
        var calendar = jQuery(this).parents('.wp-calendar');
        var m = jQuery(this).data('month');
        var y = jQuery(this).data('year');
        var l = jQuery(this).data('letter');
        var pt = jQuery(this).data('type');
        jQuery.post(MR_MURPHY_STORAGE['ajax_url'], {
            action: 'calendar_change_month',
            nonce: MR_MURPHY_STORAGE['ajax_nonce'],
            letter: l,
            month: m,
            year: y,
            post_type: pt
        }).done(function(response) {
            var rez = {};
            try {
                rez = JSON.parse(response);
            } catch (e) {
                rez = { error: MR_MURPHY_STORAGE['ajax_error'] };
                console.log(response);
            }
            if (rez.error === '') {
                calendar.parent().fadeOut(200, function() {
                    jQuery(this).find('.wp-calendar').remove();
                    jQuery(this).append(rez.data).fadeIn(200);
                });
            }
        });
        e.preventDefault();
        return false;
    });


    // Media setup
    //----------------------------------------------

    // Video background init
    jQuery('.video_bg').each(function() {
        var youtube = jQuery(this).data('youtube-code');
        if (youtube) {
            jQuery(this).tubular({videoId: youtube});
        }
    });


    // Main slider
    //----------------------------------------------
    jQuery('.slider_over_button,.slider_over_close').on('click', function(e) {
        jQuery(this).parent().toggleClass('opened');
        e.preventDefault();
        return false;
    });



    // Menu
    //----------------------------------------------

    // Clone side menu for responsive
    if (jQuery('ul#menu_side').length > 0) {
        jQuery('ul#menu_side').clone().removeAttr('id').removeClass('menu_side_nav').addClass('menu_side_responsive').insertAfter('ul#menu_side');
        mr_murphy_show_current_menu_item(jQuery('.menu_side_responsive'), jQuery('.sidebar_outer_menu_responsive_button'));
    }
    if (jQuery('.header_mobile').length > 0) {
        jQuery('.header_mobile .menu_main_nav_area ul#menu_main').removeAttr('id');
        jQuery('.header_mobile .menu_button').on('click', function(){
            jQuery('.header_mobile .side_wrap').toggleClass('open');
            jQuery('.header_mobile .mask').toggleClass('show');
            jQuery('html').toggleClass('menu_mobile_open');
            // Fix for Safari
            if (mr_murphy_browser_is_ios() && jQuery('body').hasClass('menu_mobile')) {
                jQuery('body').toggleClass('ios_fixed');
            }
        });
        jQuery('.header_mobile .mask, .header_mobile .side_wrap .close').on('click', function(){
            jQuery('.header_mobile .side_wrap').removeClass('open');
            jQuery('.header_mobile .mask').removeClass('show');
            jQuery('html').removeClass('menu_mobile_open');
            // Fix for Safari
            if (mr_murphy_browser_is_ios() && jQuery('body').hasClass('menu_mobile')) {
                jQuery('body').removeClass('ios_fixed');
            }
        });
    }

    // Push menu button
    jQuery('.menu_pushy_button').on('click', function(e){
        "use strict";
        jQuery('body').addClass('pushy-active').css('overflow', 'hidden');
        jQuery('.site-overlay').fadeIn('fast');
        e.preventDefault();
        return false;
    });
    jQuery('.pushy .close-pushy,.pushy .close-pushy *,.site-overlay').on('click', function(e){
        jQuery('body').removeClass('pushy-active').css('overflow', 'visible');
        jQuery('.site-overlay').fadeOut('fast');
        e.preventDefault();
        return false;
    });

    // Side menu widgets button
    jQuery('.sidebar_outer_widgets_button').on('click', function(e){
        "use strict";
        jQuery('.sidebar_outer_widgets').slideToggle();
        e.preventDefault();
        return false;
    });

    // Add arrows in responsive menu
    jQuery('.header_mobile .menu_main_nav .menu-item-has-children > a, .menu_side_responsive .menu-item-has-children > a, .menu_pushy_nav_area .menu-item-has-children > a, body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories ul.product-categories .has_children > a').append('<span class="open_child_menu"></span>');

    // Submenu click handler for the responsive menu
    jQuery('.header_mobile .menu_main_nav, .menu_side_responsive, .menu_pushy_nav_area, body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories').on('click', 'li a,li a .open_child_menu, ul.product-categories.plain li a .open_child_menu', function(e) {
        "use strict";
        var is_menu_main = jQuery(this).parents('.menu_main_nav').length > 0;
        var $a = jQuery(this).hasClass('open_child_menu') ? jQuery(this).parent() : jQuery(this);
        if ((!is_menu_main || jQuery('body').hasClass('menu_mobile')) && ($a.parent().hasClass('menu-item-has-children') || $a.parent().hasClass('has_children'))) {
            if ($a.siblings('ul:visible').length > 0)
                $a.siblings('ul').slideUp().parent().removeClass('opened');
            else {
                jQuery(this).parents('li').siblings('li').find('ul:visible').slideUp().parent().removeClass('opened');
                $a.siblings('ul').slideDown().parent().addClass('opened');
            }
        }
        // Ignore link for parent menu items
        if (jQuery(this).hasClass('open_child_menu') || $a.attr('href')=='#') {
            e.preventDefault();
            return false;
        }
    });

    // Init superfish menus
    mr_murphy_init_sfmenu('.menu_main_nav_area ul#menu_main, ul#menu_user, ul#menu_side, body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories ul.product-categories');

    // Slide effect for main menu
    if (MR_MURPHY_STORAGE['menu_hover']=='slide_line' || MR_MURPHY_STORAGE['menu_hover']=='slide_box') {
        setTimeout(function() {
            "use strict";
            jQuery('#menu_main').spasticNav({
                style: MR_MURPHY_STORAGE['menu_hover']=='slide_line' ? 'line' : 'box',
                color: MR_MURPHY_STORAGE['accent1_hover'],
                colorOverride: false
            });
        }, 500);
    }

    // Show table of contents for the current page
    if (MR_MURPHY_STORAGE['toc_menu'] != 'hide' && MR_MURPHY_STORAGE['toc_menu'] != 'no') {
        mr_murphy_build_page_toc();
    }

    // One page mode for menu links (scroll to anchor)
    jQuery('#toc, ul#menu_main li, ul#menu_user li, ul#menu_side li, ul#menu_footer li, ul#menu_pushy li').on('click', 'a', function(e) {
        "use strict";
        var href = jQuery(this).attr('href');
        if (href===undefined) return;
        var pos = href.indexOf('#');
        if (pos < 0 || href.length == 1) return;
        if (jQuery(href.substr(pos)).length > 0) {
            var loc = window.location.href;
            var pos2 = loc.indexOf('#');
            if (pos2 > 0) loc = loc.substring(0, pos2);
            var now = pos==0;
            if (!now) now = loc == href.substring(0, pos);
            if (now) {
                mr_murphy_document_animate_to(href.substr(pos));
                mr_murphy_document_set_location(pos==0 ? loc + href : href);
                e.preventDefault();
                return false;
            }
        }
    });


    // Store height of the top and side panels
    MR_MURPHY_STORAGE['top_panel_height'] = 0;	//Math.max(0, jQuery('.top_panel_wrap').height());
    MR_MURPHY_STORAGE['side_panel_height'] = 0;


    // Pagination
    //----------------------------------------------

    // Page navigation (style slider)
    jQuery('.pager_cur').on('click', function(e) {
        "use strict";
        jQuery('.pager_slider').slideDown(300, function() {
            mr_murphy_sc_init(jQuery('.pager_slider').eq(0));
        });
        e.preventDefault();
        return false;
    });


    // View More button
    jQuery('#viewmore_link').on('click', function(e) {
        "use strict";
        if (!MR_MURPHY_STORAGE['viewmore_busy'] && !jQuery(this).hasClass('viewmore_empty')) {
            jQuery(this).parent().addClass('loading');
            MR_MURPHY_STORAGE['viewmore_busy'] = true;
            jQuery.post(MR_MURPHY_STORAGE['ajax_url'], {
                action: 'view_more_posts',
                nonce: MR_MURPHY_STORAGE['ajax_nonce'],
                page: MR_MURPHY_STORAGE['viewmore_page']+1,
                data: MR_MURPHY_STORAGE['viewmore_data'],
                vars: MR_MURPHY_STORAGE['viewmore_vars']
            }).done(function(response) {
                "use strict";
                var rez = {};
                try {
                    rez = JSON.parse(response);
                } catch (e) {
                    rez = { error: MR_MURPHY_STORAGE['ajax_error'] };
                    console.log(response);
                }
                jQuery('#viewmore_link').parent().removeClass('loading');
                MR_MURPHY_STORAGE['viewmore_busy'] = false;
                if (rez.error === '') {
                    var posts_container = jQuery('.content').eq(0);
                    if (posts_container.find('.isotope_wrap').length > 0) posts_container = posts_container.find('.isotope_wrap').eq(0);
                    if (posts_container.hasClass('isotope_wrap')) {
                        posts_container.data('last-width', 0).append(rez.data);
                        MR_MURPHY_STORAGE['isotope_init_counter'] = 0;
                        mr_murphy_init_appended_isotope(posts_container, rez.filters);
                    } else
                        jQuery('#viewmore').before(rez.data);

                    MR_MURPHY_STORAGE['viewmore_page']++;
                    if (rez.no_more_data==1) {
                        jQuery('#viewmore_link').addClass('viewmore_empty').parent().hide();
                    }

                    mr_murphy_init_post_formats();
                    mr_murphy_sc_init(posts_container);
                    mr_murphy_scroll_actions();
                }
            });
        }
        e.preventDefault();
        return false;
    });


    // WooCommerce
    //----------------------------------------------

    // Change display mode
    jQuery('.woocommerce,.woocommerce-page').on('click', '.mode_buttons a', function(e) {
        "use strict";
        var mode = jQuery(this).hasClass('woocommerce_thumbs') ? 'thumbs' : 'list';
        mr_murphy_set_cookie('mr_murphy_shop_mode', mode, {expires: 365, path: '/'});
        jQuery(this).siblings('input').val(mode).parents('form').get(0).submit();
        e.preventDefault();
        return false;
    });
    // Added to cart
    jQuery('body').bind('added_to_cart', function() {
        "use strict";
        // Update amount on the cart button
        var total = jQuery('.widget_shopping_cart').eq(0).find('.total .amount').text();
        if (total != undefined) {
            jQuery('.top_panel_cart_button .cart_summa').text(total);
        }
        // Update count items on the cart button
        var cnt = 0;
        jQuery('.widget_shopping_cart_content').eq(0).find('.cart_list li').each(function() {
            var q = jQuery(this).find('.quantity').html().split(' ', 2);
            if (!isNaN(q[0]))
                cnt += Number(q[0]);
        });
        var items = jQuery('.top_panel_cart_button .cart_items').eq(0).text().split(' ', 2);
        items[0] = cnt;
        jQuery('.top_panel_cart_button .cart_items').text(items[0]+' '+items[1]);
        // Update data-attr on button
        jQuery('.top_panel_cart_button').data({
            'items': cnt ? cnt : 0,
            'summa': total ? total : 0
        });
    });
    // Show cart
    jQuery('.top_panel_middle .top_panel_cart_button, .header_mobile .top_panel_cart_button').on('click', function(e) {
        "use strict";
        jQuery(this).siblings('.sidebar_cart').slideToggle();
        e.preventDefault();
        return false;
    });
    // Add buttons to quantity
    jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="q_inc"></span><span class="q_dec"></span>');
    jQuery('.woocommerce div.quantity').on('click', '>span', function(e) {
        "use strict";
        var f = jQuery(this).siblings('input');
        if (jQuery(this).hasClass('q_inc')) {
            f.val(Math.max(0, parseInt(f.val()))+1);
        } else {
            f.val(Math.max(1, Math.max(0, parseInt(f.val()))-1));
        }
        jQuery('.actions .button').removeAttr('disabled');/*+*/
        e.preventDefault();
        return false;
    });
    // Add stretch behaviour to WooC tabs area
    jQuery('.single-product .woocommerce-tabs')
        .addClass('trx-stretch-width scheme_light')
        .after('<div class="trx-stretch-width-original"></div>');
    mr_murphy_stretch_width();


    // Popup login and register windows
    //----------------------------------------------
    jQuery('.popup_link,.popup_login_link,.popup_register_link').addClass('inited').on('click', function(e){
        var popup = jQuery(jQuery(this).attr('href'));
        if (popup.length === 1) {
            mr_murphy_hide_popup(jQuery(popup.hasClass('popup_login') ? '.popup_registration' : '.popup_login' ));
            mr_murphy_show_popup(popup);
        }
        e.preventDefault();
        return false;
    });
    jQuery('.popup_wrap').on('click', '.popup_close', function(e){
        var popup = jQuery(this).parent();
        if (popup.length === 1) {
            mr_murphy_hide_popup(popup);
        }
        e.preventDefault();
        return false;
    });



    // Bookmarks
    //----------------------------------------------

    // Add bookmark
    jQuery('.bookmarks_add').on('click', function(e) {
        "use strict";
        var title = window.document.title.split('|')[0];
        var url = window.location.href;
        var list = jQuery.cookie('mr_murphy_bookmarks');
        var exists = false;
        if (list) {
            try {
                list = JSON.parse(list);
            } catch (e) {}
            if (list.length) {
                for (var i=0; i<list.length; i++) {
                    if (list[i].url == url) {
                        exists = true;
                        break;
                    }
                }
            }
        } else
            list = new Array();
        if (!exists) {
            var message_popup = mr_murphy_message_dialog('<label for="bookmark_title">'+MR_MURPHY_STORAGE['strings']['bookmark_title']+'</label><br><input type="text" id="bookmark_title" name="bookmark_title" value="'+title+'">', MR_MURPHY_STORAGE['strings']['bookmark_add'], null,
                function(btn, popup) {
                    "use strict";
                    if (btn != 1) return;
                    title = message_popup.find('#bookmark_title').val();
                    list.push({title: title, url: url});
                    jQuery('.bookmarks_list').append('<li><a href="'+url+'" class="bookmarks_item">'+title+'<span class="bookmarks_delete icon-cancel" title="'+MR_MURPHY_STORAGE['strings']['bookmark_del']+'"></span></a></li>');
                    jQuery.cookie('mr_murphy_bookmarks', JSON.stringify(list), {expires: 365, path: '/'});
                    setTimeout(function () {mr_murphy_message_success(MR_MURPHY_STORAGE['strings']['bookmark_added'], MR_MURPHY_STORAGE['strings']['bookmark_add']);}, MR_MURPHY_STORAGE['message_timeout']/4);
                });
        } else
            mr_murphy_message_warning(MR_MURPHY_STORAGE['strings']['bookmark_exists'], MR_MURPHY_STORAGE['strings']['bookmark_add']);
        e.preventDefault();
        return false;
    });

    // Delete bookmark
    jQuery('.bookmarks_list').on('click', '.bookmarks_delete', function(e) {
        "use strict";
        var idx = jQuery(this).parent().index();
        var list = jQuery.cookie('mr_murphy_bookmarks');
        if (list) {
            try {
                list = JSON.parse(list);
            } catch (e) {}
            if (list.length) {
                list.splice(idx, 1);
                jQuery.cookie('mr_murphy_bookmarks', JSON.stringify(list), {expires: 365, path: '/'});
            }
        }
        jQuery(this).parent().remove();
        e.preventDefault();
        return false;
    });


    // Other settings
    //------------------------------------

    // Scroll to top button
    jQuery('.scroll_to_top').on('click', function(e) {
        "use strict";
        jQuery('html,body').animate({
            scrollTop: 0
        }, 'slow');
        e.preventDefault();
        return false;
    });

    // AJAX views counter
    if (MR_MURPHY_STORAGE['ajax_views_counter'] !== undefined) {
        setTimeout(function(){
            jQuery.post(MR_MURPHY_STORAGE['ajax_url'], {
                action: 'post_counter',
                nonce: MR_MURPHY_STORAGE['ajax_nonce'],
                post_id: MR_MURPHY_STORAGE['ajax_views_counter']['post_id'],
                views: MR_MURPHY_STORAGE['ajax_views_counter']['post_views']
            });
        }, 10);
    }

    // Show system message
    mr_murphy_show_system_message();

    // Init post format specific scripts
    mr_murphy_init_post_formats();

    // Call sc init action (if exists)
    if (window.mr_murphy_sc_init_actions) mr_murphy_sc_init_actions();

    // Init hidden elements (if exists)
    if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(jQuery('body').eq(0));

} //end ready




// Scroll actions
//==============================================

// Do actions when page scrolled
function mr_murphy_scroll_actions() {
    "use strict";

    // Call theme specific action (if exists)
    //----------------------------------------------
    if (window.mr_murphy_theme_scroll_actions) mr_murphy_theme_scroll_actions();

    var scroll_offset = jQuery(window).scrollTop();
    var scroll_to_top_button = jQuery('.scroll_to_top');
    var adminbar_height = Math.max(0, jQuery('#wpadminbar').height());

    if (MR_MURPHY_STORAGE['top_panel_height'] < 1) {
        MR_MURPHY_STORAGE['top_panel_height'] = Math.max(0, jQuery('.top_panel_wrap').height());
    }

    // Scroll to top button show/hide
    if (scroll_offset > MR_MURPHY_STORAGE['top_panel_height'])
        scroll_to_top_button.addClass('show');
    else
        scroll_to_top_button.removeClass('show');

    // Fix/unfix top panel
    if (!jQuery('html').hasClass('header_style_8')) {
        if (!jQuery('body').hasClass('menu_mobile') && MR_MURPHY_STORAGE['menu_fixed']) {
            var slider_height = 0;
            if (jQuery('.top_panel_below .slider_wrap').length > 0) {
                slider_height = jQuery('.top_panel_below .slider_wrap').height();
                if (slider_height < 10) {
                    slider_height = jQuery('.slider_wrap').hasClass('.slider_fullscreen') ? jQuery(window).height() : MR_MURPHY_STORAGE['slider_height'];
                }
            }
            if (scroll_offset <= slider_height + MR_MURPHY_STORAGE['top_panel_height']) {
                if (jQuery('body').hasClass('top_panel_fixed')) {
                    jQuery('body').removeClass('top_panel_fixed');
                }
            } else if (scroll_offset > slider_height + MR_MURPHY_STORAGE['top_panel_height']) {
                if (!jQuery('body').hasClass('top_panel_fixed') && jQuery(document).height() > jQuery(window).height() * 1.5) {
                    jQuery('.top_panel_fixed_wrap').height(MR_MURPHY_STORAGE['top_panel_height']);
                    jQuery('.top_panel_wrap').css('marginTop', '-150px').animate({'marginTop': 0}, 500);
                    jQuery('body').addClass('top_panel_fixed');
                }
            }
        }
    }

    // Fix/unfix side panel
    if (jQuery('.sidebar_outer').length > 0) {
        if (MR_MURPHY_STORAGE['side_panel_height'] == 0)
            MR_MURPHY_STORAGE['side_panel_height'] = jQuery('.sidebar_outer_logo_wrap').outerHeight() + jQuery('.sidebar_outer_menu').outerHeight() + jQuery('.sidebar_outer_widgets').outerHeight();
        if (scroll_offset + jQuery(window).height() > MR_MURPHY_STORAGE['side_panel_height'] + 100) {
            if (jQuery('.sidebar_outer').css('position')!=='fixed') {
                jQuery('.sidebar_outer').css({
                    'position': 'fixed',
                    'top': Math.min(0, jQuery(window).height() - MR_MURPHY_STORAGE['side_panel_height'] - 100) + 'px',
                });
            }
        } else {
            if (jQuery('.sidebar_outer').css('position')=='fixed') {
                jQuery('.sidebar_outer').css({
                    'position': 'absolute',
                    'top': 0
                });
            }
        }
    }

    // TOC current items
    jQuery('#toc .toc_item').each(function() {
        "use strict";
        var id = jQuery(this).find('a').attr('href');
        var pos = id.indexOf('#');
        if (pos < 0 || id.length == 1) return;
        var loc = window.location.href;
        var pos2 = loc.indexOf('#');
        if (pos2 > 0) loc = loc.substring(0, pos2);
        var now = pos==0;
        if (!now) now = loc == href.substring(0, pos);
        if (!now) return;
        var off = jQuery(id).offset().top;
        var id_next  = jQuery(this).next().find('a').attr('href');
        var off_next = id_next ? jQuery(id_next).offset().top : 1000000;
        if (off < scroll_offset + jQuery(window).height()*0.8 && scroll_offset + MR_MURPHY_STORAGE['top_panel_height'] < off_next)
            jQuery(this).addClass('current');
        else
            jQuery(this).removeClass('current');
    });

    // Infinite pagination
    mr_murphy_infinite_scroll()

    // Parallax scroll
    mr_murphy_parallax_scroll();

    // Call sc scroll actions (if exists)
    if (window.mr_murphy_sc_scroll_actions) mr_murphy_sc_scroll_actions();
}


// Infinite Scroll
function mr_murphy_infinite_scroll() {
    "use strict";
    if (MR_MURPHY_STORAGE['viewmore_busy']) return;
    var infinite = jQuery('#viewmore.pagination_infinite');
    if (infinite.length > 0) {
        var viewmore = infinite.find('#viewmore_link:not(.viewmore_empty)');
        if (viewmore.length > 0) {
            if (jQuery(window).scrollTop() + jQuery(window).height() + 100 >= infinite.offset().top) {
                viewmore.eq(0).trigger('click');
            }
        }
    }
}

// Parallax scroll
function mr_murphy_parallax_scroll(){
    jQuery('.sc_parallax').each(function(){
        var windowHeight = jQuery(window).height();
        var scrollTops = jQuery(window).scrollTop();
        var offsetPrx = Math.max(jQuery(this).offset().top, windowHeight);
        if ( offsetPrx <= scrollTops + windowHeight ) {
            var speed  = Number(jQuery(this).data('parallax-speed'));
            var xpos   = jQuery(this).data('parallax-x-pos');
            var ypos   = Math.round((offsetPrx - scrollTops - windowHeight) * speed + (speed < 0 ? windowHeight*speed : 0));
            jQuery(this).find('.sc_parallax_content').css('backgroundPosition', xpos+' '+ypos+'px');
            // Uncomment next line if you want parallax video (else - video position is static)
            jQuery(this).find('div.sc_video_bg').css('top', ypos+'px');
        }
    });
}





// Resize actions
//==============================================

// Do actions when page scrolled
function mr_murphy_resize_actions() {
    "use strict";

    // Call theme specific action (if exists)
    //----------------------------------------------
    if (window.mr_murphy_theme_resize_actions) mr_murphy_theme_resize_actions();

    // Reset stored value
    if (!jQuery('body').hasClass('top_panel_fixed')) MR_MURPHY_STORAGE['top_panel_height'] = 0;

    mr_murphy_responsive_menu();
    mr_murphy_vc_row_fullwidth_to_boxed();
    mr_murphy_video_dimensions();
    mr_murphy_resize_video_background();
    mr_murphy_resize_fullscreen_slider();
    mr_murphy_resize_alter_portfolio();
    mr_murphy_stretch_width();

    // Call sc resize actions (if exists)
    if (window.mr_murphy_sc_resize_actions) mr_murphy_sc_resize_actions();
}

// Stretch area to full window width
function mr_murphy_stretch_width() {
    jQuery('.trx-stretch-width').each(function() {
        var $el = jQuery(this);
        var $el_full = $el.next('.trx-stretch-width-original');
        var el_margin_left = parseInt( $el.css( 'margin-left' ), 10 );
        var el_margin_right = parseInt( $el.css( 'margin-right' ), 10 );
        var offset = 0 - $el_full.offset().left - el_margin_left;
        var width = jQuery( window ).width();
        if (!$el.hasClass('inited')) {
            $el.addClass('inited invisible');
            $el.css({
                'position': 'relative',
                'box-sizing': 'border-box'
            });
        }
        $el.css({
            'left': offset,
            'width': jQuery( window ).width()
        });
        if ( !$el.hasClass('trx-stretch-content') ) {
            var padding = Math.max(0, -1*offset);
            var paddingRight = Math.max(0, width - padding - $el_full.width() + el_margin_left + el_margin_right);
            $el.css( { 'padding-left': padding + 'px', 'padding-right': paddingRight + 'px' } );
        }
        $el.removeClass('invisible');
    });
}

// Width vc_row when content boxed
function mr_murphy_vc_row_fullwidth_to_boxed(){
    "use strict";
    if (jQuery('body').hasClass('body_style_boxed')) {
        var width_body = jQuery('body').width();
        var width_content = jQuery('.page_wrap').width();
        var width_content_wrap = jQuery('.page_content_wrap  .content_wrap').width();
        var indent = ( width_content - width_content_wrap ) / 2;
        if ( width_body > width_content ){
            jQuery('.vc_row[data-vc-full-width="true"]').each( function() {
                "use strict";
                var mrg = parseInt(jQuery(this).css('marginLeft'));
                jQuery(this).css({
                    'width': width_content,
                    'left': -indent-mrg,
                    'padding-left': indent+mrg,
                    'padding-right': indent+mrg
                });
                if (jQuery(this).attr('data-vc-stretch-content')) {
                    jQuery(this).css({
                        'padding-left': 0,
                        'padding-right': 0
                    });
                }
            });
        }
    }
}

// Width vc_row when header style 8 /*+*/
function mr_murphy_vc_row_header_8(){
    "use strict";
    var width_content = jQuery('.page_wrap').width();
    var width_content_wrap = jQuery('.page_content_wrap  .content_wrap').width();
    var indent = ( width_content - width_content_wrap ) / 2;

    jQuery('.vc_row[data-vc-full-width="true"]').each( function() {
        "use strict";
        var mrg = parseInt(jQuery(this).css('marginLeft'));
        jQuery(this).css({
            'width': width_content,
            'left': -indent-mrg,
            'padding-left': indent+mrg,
            'padding-right': indent+mrg
        });
        if (jQuery(this).attr('data-vc-stretch-content')) {
            jQuery(this).css({
                'padding-left': 0,
                'padding-right': 0
            });
        }
    });
}

// Check window size and do responsive menu
function mr_murphy_responsive_menu() {
    "use strict";
    if (mr_murphy_is_responsive_need(MR_MURPHY_STORAGE['menu_mobile'])) {
        if (jQuery('html').hasClass('header_style_8')){
            jQuery('html').removeClass('header_style');/*+*/
            if (jQuery('body').hasClass('body_style_wide')) mr_murphy_vc_row_header_8();
            // For style Boxed used function mr_murphy_vc_row_fullwidth_to_boxed();
        }

        if (!jQuery('body').hasClass('menu_mobile')) {
            jQuery('body').removeClass('top_panel_fixed').addClass('menu_mobile');
            jQuery('header.top_panel_wrap ').hide();
            jQuery('.header_mobile').show();

            jQuery('header #popup_login').attr('id', 'popup_login_1');
            jQuery('header #popup_registration').attr('id', 'popup_registration_1');
            jQuery('.header_mobile #popup_login_1').attr('id', 'popup_login');
            jQuery('.header_mobile #popup_registration_1').attr('id', 'popup_registration');
        }
    } else {
        if (jQuery('html').hasClass('header_style_8')){
            jQuery('html').addClass('header_style');/*+*/
            if (jQuery('body').hasClass('body_style_wide')) mr_murphy_vc_row_header_8();
            // For style Boxed used function mr_murphy_vc_row_fullwidth_to_boxed();
        }

        if (jQuery('body').hasClass('menu_mobile')) {
            jQuery('body').removeClass('menu_mobile');
            jQuery('header.top_panel_wrap ').show();
            jQuery('.header_mobile').hide();

            jQuery('header #popup_login_1').attr('id', 'popup_login');
            jQuery('header #popup_registration_1').attr('id', 'popup_registration');
            jQuery('.header_mobile #popup_login').attr('id', 'popup_login_1');
            jQuery('.header_mobile #popup_registration').attr('id', 'popup_registration_1');
        }
    }

    if (jQuery(window).width() < 640) {
        var pass = jQuery('.header_mobile .popup_wrap.popup_registration .registration_form > .form_right');
        if(pass.length > 0){
            jQuery('.header_mobile .popup_wrap.popup_registration .form_left .popup_form_field.email_field').after(pass);
        }
    }
    else{
        var pass = jQuery('.header_mobile .popup_wrap.popup_registration .form_left > .form_right');
        if(pass.length > 0){
            jQuery('.header_mobile .popup_wrap.popup_registration .registration_form').append(pass);
        }
    }

    if (!jQuery('.top_panel_wrap').hasClass('menu_show')) jQuery('.top_panel_wrap').addClass('menu_show');
    // Show widgets block on the sidebar outer (if sidebar not responsive and widgets are hidden)
    if (jQuery('.sidebar_outer').length > 0 && jQuery('.sidebar_outer').css('position')=='absolute' && jQuery('.sidebar_outer_widgets:visible').length==0)
        jQuery('.sidebar_outer_widgets').show();
    // Switch popup menu / hierarchical list on product categories list placed in sidebar
    var cat_menu = jQuery('body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories ul.product-categories');
    var sb = cat_menu.parents('.widget_area');
    if (sb.length > 0 && cat_menu.length > 0) {
        if (sb.width() == sb.parents('.content_wrap').width()) {
            if (cat_menu.hasClass('inited')) {
                cat_menu.removeClass('inited').addClass('plain').superfish('destroy');
                cat_menu.find('ul.animated').removeClass('animated').addClass('no_animated');
            }
        } else {
            if (!cat_menu.hasClass('inited')) {
                cat_menu.removeClass('plain').addClass('inited');
                cat_menu.find('ul.no_animated').removeClass('no_animated').addClass('animated');
                mr_murphy_init_sfmenu('body:not(.woocommerce) .widget_area:not(.footer_wrap) .widget_product_categories ul.product-categories');
            }
        }
    }
}


// Check if responsive menu need
function mr_murphy_is_responsive_need(max_width) {
    "use strict";
    var rez = false;
    if (max_width > 0) {
        var w = window.innerWidth;
        if (w == undefined) {
            w = jQuery(window).width()+(jQuery(window).height() < jQuery(document).height() || jQuery(window).scrollTop() > 0 ? 16 : 0);
        }
        rez = max_width > w;
    }
    return rez;
}


// Fit video frames to document width
function mr_murphy_video_dimensions() {
    jQuery('.sc_video_frame').each(function() {
        "use strict";
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        var frame  = jQuery(this).eq(0);
        var player = frame.parent();
        var ratio = (frame.data('ratio') ? frame.data('ratio').split(':') : (frame.find('[data-ratio]').length>0 ? frame.find('[data-ratio]').data('ratio').split(':') : [16,9]));
        ratio = ratio.length!=2 || ratio[0]==0 || ratio[1]==0 ? 16/9 : ratio[0]/ratio[1];
        var w_attr = frame.data('width');
        var h_attr = frame.data('height');
        if (!w_attr || !h_attr) return;
        var percent = (''+w_attr).substr(-1)=='%';
        w_attr = parseInt(w_attr);
        h_attr = parseInt(h_attr);
        var w_real = Math.min(percent || frame.parents('.columns_wrap').length>0 ? 10000 : w_attr, frame.parents('div,article').width()), //player.width();
            h_real = Math.round(percent ? w_real/ratio : w_real/w_attr*h_attr);
        if (parseInt(frame.attr('data-last-width'))==w_real) return;
        if (percent) {
            frame.height(h_real);
        } else {
            frame.css({'width': w_real+'px', 'height': h_real+'px'});
        }
        frame.attr('data-last-width', w_real);
    });
    jQuery('video.sc_video,video.wp-video-shortcode').each(function() {
        "use strict";
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        var video = jQuery(this).eq(0);
        var ratio = (video.data('ratio')!=undefined ? video.data('ratio').split(':') : [16,9]);
        ratio = ratio.length!=2 || ratio[0]==0 || ratio[1]==0 ? 16/9 : ratio[0]/ratio[1];
        var mejs_cont = video.parents('.mejs-video');
        var frame = video.parents('.sc_video_frame');
        var w_attr = frame.length>0 ? frame.data('width') : video.data('width');
        var h_attr = frame.length>0 ? frame.data('height') : video.data('height');
        if (!w_attr || !h_attr) {
            w_attr = video.attr('width');
            h_attr = video.attr('height');
            if (!w_attr || !h_attr) return;
            video.data({'width': w_attr, 'height': h_attr});
        }
        var percent = (''+w_attr).substr(-1)=='%';
        w_attr = parseInt(w_attr);
        h_attr = parseInt(h_attr);
        var w_real = Math.round(mejs_cont.length > 0 ? Math.min(percent ? 10000 : w_attr, mejs_cont.parents('div,article').width()) : video.width()),
            h_real = Math.round(percent ? w_real/ratio : w_real/w_attr*h_attr);
        if (parseInt(video.attr('data-last-width'))==w_real) return;
        if (mejs_cont.length > 0 && mejs) {
            mr_murphy_set_mejs_player_dimensions(video, w_real, h_real);
        }
        if (percent) {
            video.height(h_real);
        } else {
            video.attr({'width': w_real, 'height': h_real}).css({'width': w_real+'px', 'height': h_real+'px'});
        }
        video.attr('data-last-width', w_real);
    });
    jQuery('video.sc_video_bg').each(function() {
        "use strict";
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        var video = jQuery(this).eq(0);
        var ratio = (video.data('ratio')!=undefined ? video.data('ratio').split(':') : [16,9]);
        ratio = ratio.length!=2 || ratio[0]==0 || ratio[1]==0 ? 16/9 : ratio[0]/ratio[1];
        var mejs_cont = video.parents('.mejs-video');
        var container = mejs_cont.length>0 ? mejs_cont.parent() : video.parent();
        var w = container.width();
        var h = container.height();
        var w1 = Math.ceil(h*ratio);
        var h1 = Math.ceil(w/ratio);
        if (video.parents('.sc_parallax').length > 0) {
            var windowHeight = jQuery(window).height();
            var speed = Number(video.parents('.sc_parallax').data('parallax-speed'));
            var h_add = Math.ceil(Math.abs((windowHeight-h)*speed));
            if (h1 < h + h_add) {
                h1 = h + h_add;
                w1 = Math.ceil(h1 * ratio);
            }
        }
        if (h1 < h) {
            h1 = h;
            w1 = Math.ceil(h1 * ratio);
        }
        if (w1 < w) {
            w1 = w;
            h1 = Math.ceil(w1 / ratio);
        }
        var l = Math.round((w1-w)/2);
        var t = Math.round((h1-h)/2);
        if (parseInt(video.attr('data-last-width'))==w1) return;
        if (mejs_cont.length > 0) {
            mr_murphy_set_mejs_player_dimensions(video, w1, h1);
            mejs_cont.css({
                //'left': -l+'px',
                'top': -t+'px'
            });
        } else
            video.css({
                //'left': -l+'px',
                'top': -t+'px'
            });
        video.attr({'width': w1, 'height': h1, 'data-last-width':w1}).css({'width':w1+'px', 'height':h1+'px'});
        if (video.css('opacity')==0) video.animate({'opacity': 1}, 3000);
    });
    jQuery('iframe').each(function() {
        "use strict";
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        var iframe = jQuery(this).eq(0);
        var ratio = (iframe.data('ratio')!=undefined ? iframe.data('ratio').split(':') : (iframe.find('[data-ratio]').length>0 ? iframe.find('[data-ratio]').data('ratio').split(':') : [16,9]));
        ratio = ratio.length!=2 || ratio[0]==0 || ratio[1]==0 ? 16/9 : ratio[0]/ratio[1];
        var w_attr = iframe.attr('width');
        var h_attr = iframe.attr('height');
        var frame = iframe.parents('.sc_video_frame');
        if (frame.length > 0) {
            w_attr = frame.data('width');
            h_attr = frame.data('height');
        }
        if (!w_attr || !h_attr) {
            return;
        }
        var percent = (''+w_attr).substr(-1)=='%';
        w_attr = parseInt(w_attr);
        h_attr = parseInt(h_attr);
        var w_real = frame.length > 0 ? frame.width() : iframe.width(),
            h_real = Math.round(percent ? w_real/ratio : w_real/w_attr*h_attr);
        if (parseInt(iframe.attr('data-last-width'))==w_real) return;
        iframe.css({'width': w_real+'px', 'height': h_real+'px'});
    });
}

// Resize fullscreen video background
function mr_murphy_resize_video_background() {
    "use strict";
    var bg = jQuery('.video_bg');
    if (bg.length < 1)
        return;
    if (MR_MURPHY_STORAGE['media_elements_enabled'] && bg.find('.mejs-video').length == 0)  {
        setTimeout(mr_murphy_resize_video_background, 100);
        return;
    }
    var video = bg.find('video');
    var ratio = (video.data('ratio')!=undefined ? video.data('ratio').split(':') : [16,9]);
    ratio = ratio.length!=2 || ratio[0]==0 || ratio[1]==0 ? 16/9 : ratio[0]/ratio[1];
    var w = bg.width();
    var h = bg.height();
    var w1 = Math.ceil(h*ratio);
    var h1 = Math.ceil(w/ratio);
    if (h1 < h) {
        h1 = h;
        w1 = Math.ceil(h1 * ratio);
    }
    if (w1 < w) {
        w1 = w;
        h1 = Math.ceil(w1 / ratio);
    }
    var l = Math.round((w1-w)/2);
    var t = Math.round((h1-h)/2);
    if (bg.find('.mejs-container').length > 0) {
        mr_murphy_set_mejs_player_dimensions(bg.find('video'), w1, h1);
        bg.find('.mejs-container').css({'left': -l+'px', 'top': -t+'px'});
    } else
        bg.find('video').css({'left': -l+'px', 'top': -t+'px'});
    bg.find('video').attr({'width': w1, 'height': h1}).css({'width':w1+'px', 'height':h1+'px'});
}

// Set Media Elements player dimensions
function mr_murphy_set_mejs_player_dimensions(video, w, h) {
    "use strict";
    if (mejs) {
        for (var pl in mejs.players) {
            if (mejs.players[pl].media.src == video.attr('src')) {
                if (mejs.players[pl].media.setVideoSize) {
                    mejs.players[pl].media.setVideoSize(w, h);
                }
                mejs.players[pl].setPlayerSize(w, h);
                mejs.players[pl].setControlsSize();
            }
        }
    }
}

// Resize Fullscreen Slider
function mr_murphy_resize_fullscreen_slider() {
    "use strict";
    var slider_wrap = jQuery('.slider_wrap.slider_fullscreen');
    if (slider_wrap.length < 1)
        return;
    var slider = slider_wrap.find('.sc_slider_swiper');
    if (slider.length < 1)
        return;
    var h = jQuery(window).height() - jQuery('#wpadminbar').height() - (jQuery('body').hasClass('top_panel_above') && !jQuery('body').hasClass('.top_panel_fixed') ? jQuery('.top_panel_wrap').height() : 0);
    slider.height(h);
}

// Resize Alter portfolio elements
function mr_murphy_resize_alter_portfolio() {
    "use strict";
    var wrap = jQuery('.isotope_wrap.inited');
    if (wrap.length==0) return;
    wrap.each(function() {
        "use strict";
        var alter = jQuery(this).find('.post_item_alter');
        if (alter.length==0) return;
        var single = alter.find('.post_featured img[data-alter-items-w="1"]').eq(0);
        if (single.length != 1) return;
        var w_real = single.width();
        var h_real = single.height();
        var space = Number(single.data('alter-item-space'));
        var relayout = false;
        alter.find('.post_featured img').each(function() {
            "use strict";
            var items_w = Number(jQuery(this).data('alter-items-w'));
            var items_h = Number(jQuery(this).data('alter-items-h'));
            if (items_h > 1) {
                jQuery(this).height(Math.round(items_h*h_real+(items_h-1)*(space+1)));
                relayout = true;
            } else if (items_w > 1) {
                jQuery(this).height(h_real);
                relayout = true;
            }
        });
        if (relayout) {
            jQuery(this).isotope('layout');
        }
    });
}





// Navigation
//==============================================

// Init Superfish menu
function mr_murphy_init_sfmenu(selector) {
    jQuery(selector).show().each(function() {
        if (mr_murphy_is_responsive_need() && (jQuery(this).attr('id')=='menu_main' || jQuery(this).attr('id')=='menu_side')) return;
        jQuery(this).addClass('inited').superfish({
            delay: 500,
            animation: {
                opacity: 'show'
            },
            animationOut: {
                opacity: 'hide'
            },
            speed: 		MR_MURPHY_STORAGE['css_animation'] ? 500 : 200,
            speedOut:	MR_MURPHY_STORAGE['css_animation'] ? 500 : 200,
            autoArrows: false,
            dropShadows: false,
            onBeforeShow: function(ul) {
                if (jQuery(this).parents("ul").length > 1){
                    var w = jQuery(window).width();
                    var par_offset = jQuery(this).parents("ul").offset().left;
                    var par_width  = jQuery(this).parents("ul").outerWidth();
                    var ul_width   = jQuery(this).outerWidth();
                    if (par_offset+par_width+ul_width > w-20 && par_offset-ul_width > 0)
                        jQuery(this).addClass('submenu_left');
                    else
                        jQuery(this).removeClass('submenu_left');
                }
                if (MR_MURPHY_STORAGE['css_animation']) {
                    jQuery(this).removeClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_out']);
                    jQuery(this).addClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_in']);
                }
            },
            onBeforeHide: function(ul) {
                if (MR_MURPHY_STORAGE['css_animation']) {
                    jQuery(this).removeClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_in']);
                    jQuery(this).addClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_out']);
                }
            }
        });
    });
}


// Build page TOC from the tag's id
function mr_murphy_build_page_toc() {
    "use strict";
    var toc = '', toc_count = 0;
    jQuery('[id^="toc_"],.sc_anchor').each(function(idx) {
        "use strict";
        var obj = jQuery(this);
        var id = obj.attr('id');
        var url = obj.data('url');
        var icon = obj.data('icon');
        if (!icon) icon = 'icon-circle-dot';
        var title = obj.attr('title');
        var description = obj.data('description');
        var separator = obj.data('separator');
        toc_count++;
        toc += '<div class="toc_item'+(separator=='yes' ? ' toc_separator' : '')+'">'
            +(description ? '<div class="toc_description">'+description+'</div>' : '')
            +'<a href="'+(url ? url : '#'+id)+'" class="toc_icon'+(title ? ' with_title' : '')+' '+icon+'">'+(title ? '<span class="toc_title">'+title+'</span>' : '')+'</a>'
            +'</div>';
    });
    if (toc_count > (MR_MURPHY_STORAGE['toc_menu_home'] ? 1 : 0) + (MR_MURPHY_STORAGE['toc_menu_top'] ? 1 : 0)) {
        if (jQuery('#toc').length > 0)
            jQuery('#toc .toc_inner').html(toc);
        else
            jQuery('body').append('<div id="toc" class="toc_'+MR_MURPHY_STORAGE['toc_menu']+'"><div class="toc_inner">'+toc+'</div></div>');
    }
}


// Show current page title on the responsive menu button
function mr_murphy_show_current_menu_item(menu, button) {
    "use strict";
    menu.find('a').each(function () {
        var menu_link = jQuery(this);
        if (menu_link.text() == "") {
            return;
        }
        if (menu_link.attr('href') == window.location.href)
            button.text(menu_link.text());
    });
}



// Isotope
//=====================================================

// First init isotope containers
function mr_murphy_init_isotope() {
    "use strict";

    var all_images_complete = true;

    // Check if all images in isotope wrapper are loaded
    jQuery('.isotope_wrap:not(.inited)').each(function () {
        "use strict";
        all_images_complete = all_images_complete && mr_murphy_check_images_complete(jQuery(this));
    });
    // Wait for images loading
    if (!all_images_complete && MR_MURPHY_STORAGE['isotope_init_counter']++ < 30) {
        setTimeout(mr_murphy_init_isotope, 200);
        return;
    }

    // Isotope filters handler
    jQuery('.isotope_filters:not(.inited)').addClass('inited').on('click', 'a', function(e) {
        "use strict";
        jQuery(this).parents('.isotope_filters').find('a').removeClass('active');
        jQuery(this).addClass('active');

        var selector = jQuery(this).data('filter');
        jQuery(this).parents('.isotope_filters').siblings('.isotope_wrap').eq(0).isotope({
            filter: selector
        });

        if (selector == '*')
            jQuery('#viewmore_link').fadeIn();
        else
            jQuery('#viewmore_link').fadeOut();

        e.preventDefault();
        return false;
    });

    // Init isotope script
    jQuery('.isotope_wrap:not(.inited)').each(function() {
        "use strict";

        var isotope_container = jQuery(this);

        // Init shortcodes
        // mr_murphy_sc_init(isotope_container);
        mr_murphy_sc_init_theme(isotope_container);

        // If in scroll container - no init isotope
        if (isotope_container.parents('.sc_scroll').length > 0) {
            isotope_container.addClass('inited').find('.isotope_item').animate({opacity: 1}, 200, function () { jQuery(this).addClass('isotope_item_show'); });
            return;
        }

        // Init isotope with timeout
        setTimeout(function() {
            isotope_container.addClass('inited').isotope({
                itemSelector: '.isotope_item',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            // Show elements
            isotope_container.find('.isotope_item').animate({opacity: 1}, 200, function () {
                jQuery(this).addClass('isotope_item_show');
            });

            // Resize Alter portfolio elements
            mr_murphy_resize_alter_portfolio();

        }, 500);

    });
}

function mr_murphy_init_appended_isotope(posts_container, filters) {
    "use strict";

    if (posts_container.parents('.sc_scroll_horizontal').length > 0) return;

    if (!mr_murphy_check_images_complete(posts_container) && MR_MURPHY_STORAGE['isotope_init_counter']++ < 30) {
        setTimeout(function() { mr_murphy_init_appended_isotope(posts_container, filters); }, 200);
        return;
    }
    // Add filters
    var flt = posts_container.siblings('.isotope_filter');
    for (var i in filters) {
        if (flt.find('a[data-filter=".flt_'+i+'"]').length == 0) {
            flt.append('<a href="#" class="isotope_filters_button" data-filter=".flt_'+i+'">'+filters[i]+'</a>');
        }
    }
    // Init shortcodes in added elements
    mr_murphy_sc_init(posts_container);
    // Get added elements
    var elems = posts_container.find('.isotope_item:not(.isotope_item_show)');
    // Notify isotope about added elements with timeout
    setTimeout(function() {
        posts_container.isotope('appended', elems);
        // Show appended elements
        elems.animate({opacity: 1}, 200, function () { jQuery(this).addClass('isotope_item_show'); });
    }, 500);
}



// Post formats init
//=====================================================

function mr_murphy_init_post_formats() {
    "use strict";

    // Call theme specific action (if exists)
    if (window.mr_murphy_theme_init_post_formats) mr_murphy_theme_init_post_formats();

    // MediaElement init
    mr_murphy_init_media_elements(jQuery('body'));

    // Isotope first init
    if (jQuery('.isotope_wrap:not(.inited)').length > 0) {
        MR_MURPHY_STORAGE['isotope_init_counter'] = 0;
        mr_murphy_init_isotope();
    }

    // Hover Effect 'Dir'
    if (jQuery('.isotope_wrap .isotope_item_content.square.effect_dir:not(.inited)').length > 0) {
        jQuery('.isotope_wrap .isotope_item_content.square.effect_dir:not(.inited)').each(function() {
            jQuery(this).addClass('inited').hoverdir();
        });
    }

    // Popup init
    if (MR_MURPHY_STORAGE['popup_engine'] == 'pretty') {
        jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr('rel', 'prettyPhoto[slideshow]');
        var images = jQuery("a[rel*='prettyPhoto']:not(.inited):not(.esgbox):not([data-rel*='pretty']):not([rel*='magnific']):not([data-rel*='magnific'])").addClass('inited');
        try {
            images.prettyPhoto({
                social_tools: '',
                theme: 'facebook',
                deeplinking: false
            });
        } catch (e) {};
    } else if (MR_MURPHY_STORAGE['popup_engine']=='magnific') {
        jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr('rel', 'magnific');
        var images = jQuery("a[rel*='magnific']:not(.inited):not(.esgbox):not(.prettyphoto):not([rel*='pretty']):not([data-rel*='pretty'])").addClass('inited');
        try {
            images.magnificPopup({
                type: 'image',
                mainClass: 'mfp-img-mobile',
                closeOnContentClick: true,
                closeBtnInside: true,
                fixedContentPos: true,
                midClick: true,
                //removalDelay: 500,
                preloader: true,
                tLoading: MR_MURPHY_STORAGE['strings']['magnific_loading'],
                gallery:{
                    enabled: true
                },
                image: {
                    tError: MR_MURPHY_STORAGE['strings']['magnific_error'],
                    verticalFit: true
                }
            });
        } catch (e) {};
    }


    // Add hover icon to products thumbnails
    jQuery(".post_item_product .product .images a.woocommerce-main-image:not(.hover_icon)").addClass('hover_icon hover_icon_view');


    // Likes counter
    if (jQuery('.post_counters_likes:not(.inited)').length > 0) {
        jQuery('.post_counters_likes:not(.inited)')
            .addClass('inited')
            .on('click', function(e) {
                var button = jQuery(this);
                var inc = button.hasClass('enabled') ? 1 : -1;
                var post_id = button.data('postid');
                var likes = Number(button.data('likes'))+inc;
                var cookie_likes = mr_murphy_get_cookie('mr_murphy_likes');
                if (cookie_likes === undefined || cookie_likes===null) cookie_likes = '';
                jQuery.post(MR_MURPHY_STORAGE['ajax_url'], {
                    action: 'post_counter',
                    nonce: MR_MURPHY_STORAGE['ajax_nonce'],
                    post_id: post_id,
                    likes: likes
                }).done(function(response) {
                    var rez = {};
                    try {
                        rez = JSON.parse(response);
                    } catch (e) {
                        rez = { error: MR_MURPHY_STORAGE['ajax_error'] };
                        console.log(response);
                    }
                    if (rez.error === '') {
                        if (inc == 1) {
                            var title = button.data('title-dislike');
                            button.removeClass('enabled').addClass('disabled');
                            cookie_likes += (cookie_likes.substr(-1)!=',' ? ',' : '') + post_id + ',';
                        } else {
                            var title = button.data('title-like');
                            button.removeClass('disabled').addClass('enabled');
                            cookie_likes = cookie_likes.replace(','+post_id+',', ',');
                        }
                        button.data('likes', likes).attr('title', title).find('.post_counters_number').html(likes);
                        mr_murphy_set_cookie('mr_murphy_likes', cookie_likes, 365);
                    } else {
                        mr_murphy_message_warning(MR_MURPHY_STORAGE['strings']['error_like']);
                    }
                });
                e.preventDefault();
                return false;
            });
    }

    // Social share links
    if (jQuery('.sc_socials_share:not(.inited)').length > 0) {
        jQuery('.sc_socials_share:not(.inited)').each(function() {
            "use strict";
            jQuery(this).addClass('inited').on('click', '.social_item_popup > a.social_icons', function(e) {
                "use strict";
                var url = jQuery(this).data('link');
                window.open(url, '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0');
                e.preventDefault();
                return false;
            });
        });
    }

    // Add video on thumb click
    if (jQuery('.sc_video_play_button:not(.inited)').length > 0) {
        jQuery('.sc_video_play_button:not(.inited)').each(function() {
            "use strict";
            jQuery(this)
                .addClass('inited')
                .animate({opacity: 1}, 1000)
                .on('click', function (e) {
                    "use strict";
                    if (!jQuery(this).hasClass('sc_video_play_button')) return;
                    var video = jQuery(this).removeClass('sc_video_play_button hover_icon hover_icon_play').data('video');
                    if (video!=='') {
                        jQuery(this).empty().html(video);
                        mr_murphy_video_dimensions();
                        var video_tag = jQuery(this).find('video');
                        var w = video_tag.width();
                        var h = video_tag.height();
                        mr_murphy_init_media_elements(jQuery(this));
                        // Restore WxH attributes, because Chrome broke it!
                        jQuery(this).find('video').css({'width':w, 'height': h}).attr({'width':w, 'height': h});
                    }
                    e.preventDefault();
                    return false;
                });
        });
    }
}


function mr_murphy_init_media_elements(cont) {
    if (MR_MURPHY_STORAGE['media_elements_enabled'] && cont.find('audio,video').length > 0) {
        if (window.mejs) {
            if (window.mejs.MepDefaults) window.mejs.MepDefaults.enableAutosize = true;
            if (window.mejs.MediaElementDefaults) window.mejs.MediaElementDefaults.enableAutosize = true;
            cont.find('audio:not(.wp-audio-shortcode),video:not(.wp-video-shortcode)').each(function() {
                if (jQuery(this).parents('.mejs-mediaelement').length == 0 && !jQuery(this).parent().hasClass('wp-playlist')) {
                    var media_tag = jQuery(this);
                    var settings = {
                        enableAutosize: true,
                        videoWidth: -1,		// if set, overrides <video width>
                        videoHeight: -1,	// if set, overrides <video height>
                        audioWidth: '100%',	// width of audio player
                        audioHeight: 30,	// height of audio player
                        success: function(mejs) {
                            var autoplay, loop;
                            if ( 'flash' === mejs.pluginType ) {
                                autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
                                loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;
                                autoplay && mejs.addEventListener( 'canplay', function () {
                                    mejs.play();
                                }, false );
                                loop && mejs.addEventListener( 'ended', function () {
                                    mejs.play();
                                }, false );
                            }
                            media_tag.parents('.sc_audio,.sc_video').addClass('inited sc_show');
                        }
                    };
                    jQuery(this).mediaelementplayer(settings);
                }
            });
        } else
            setTimeout(function() { mr_murphy_init_media_elements(cont); }, 400);
    }
}






// Popups and system messages
//==============================================

// Show system message (bubble from previous page)
function mr_murphy_show_system_message() {
    if (MR_MURPHY_STORAGE['system_message'] && MR_MURPHY_STORAGE['system_message']['message']) {
        if (MR_MURPHY_STORAGE['system_message']['status'] == 'success')
            mr_murphy_message_success(MR_MURPHY_STORAGE['system_message']['message'], MR_MURPHY_STORAGE['system_message']['header']);
        else if (MR_MURPHY_STORAGE['system_message']['status'] == 'info')
            mr_murphy_message_info(MR_MURPHY_STORAGE['system_message']['message'], MR_MURPHY_STORAGE['system_message']['header']);
        else if (MR_MURPHY_STORAGE['system_message']['status'] == 'error' || MR_MURPHY_STORAGE['system_message']['status'] == 'warning')
            mr_murphy_message_warning(MR_MURPHY_STORAGE['system_message']['message'], MR_MURPHY_STORAGE['system_message']['header']);
    }
}

// Toggle popups
function mr_murphy_toggle_popup(popup) {
    if (popup.css('display')!='none')
        mr_murphy_hide_popup(popup);
    else
        mr_murphy_show_popup(popup);
}

// Show popups
function mr_murphy_show_popup(popup) {
    if (popup.css('display')=='none') {
        if (false && MR_MURPHY_STORAGE['css_animation'])
            popup.show().removeClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_out']).addClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_in']);
        else
            popup.slideDown();
    }
}

// Hide popups
function mr_murphy_hide_popup(popup) {
    if (popup.css('display')!='none') {
        if (false && MR_MURPHY_STORAGE['css_animation'])
            popup.removeClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_in']).addClass('animated fast '+MR_MURPHY_STORAGE['menu_animation_out']).delay(500).hide();
        else
            popup.fadeOut();
    }
}





// Table cart Woo
jQuery(document).ready(function () {
    "use strict";
    jQuery('.shop_table thead .product-remove').remove();
    jQuery('.shop_table thead .product-thumbnail').remove();
    jQuery('.shop_table thead .product-name').attr('colspan', 3);
});

// Woo new Hover on products
jQuery(document).ready(function () {
    "use strict";
    jQuery('ul.products li.product').each(function() {

        jQuery(this).find('.post_thumb').append('<div class="hover_icons">');
        var $new_image = jQuery(this).find('img');
        var $new_button_cart = jQuery(this).find('.add_to_cart_button').empty().addClass("icon-basket hover_icon");
        var $new_button_hover = jQuery(this).find('.hover_icon');
        $new_image.appendTo( jQuery(this).find('.post_thumb') );
        $new_button_hover.appendTo( jQuery(this).find('.hover_icons') );
        $new_button_cart.appendTo( jQuery(this).find('.hover_icons') );
    });
});



// Shortcodes init
function mr_murphy_sc_init_theme(container) {

    // Call theme specific action (if exists)
    if (window.mr_murphy_theme_sc_init) mr_murphy_theme_sc_init(container);

    // Accordion
    if (container.find('.sc_accordion:not(.inited)').length > 0) {
        container.find(".sc_accordion:not(.inited)").each(function () {
            "use strict";
            var init = jQuery(this).data('active');
            if (isNaN(init)) init = 0;
            else init = Math.max(0, init);
            jQuery(this)
                .addClass('inited')
                .accordion({
                    active: init,
                    heightStyle: "content",
                    header: "> .sc_accordion_item > .sc_accordion_title",
                    create: function (event, ui) {
                        "use strict";
                        mr_murphy_sc_init(ui.panel);
                        if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(ui.panel);
                        ui.header.each(function () {
                            "use strict";
                            jQuery(this).parent().addClass('sc_active');
                        });
                    },
                    activate: function (event, ui) {
                        "use strict";
                        mr_murphy_sc_init(ui.newPanel);
                        if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(ui.newPanel);
                        ui.newHeader.each(function () {
                            "use strict";
                            jQuery(this).parent().addClass('sc_active');
                        });
                        ui.oldHeader.each(function () {
                            "use strict";
                            jQuery(this).parent().removeClass('sc_active');
                        });
                    }
                });
        });
    }

    // Blogger: style Polaroid
    if (container.find('.sc_blogger.layout_polaroid .photostack:not(.inited)').length > 0) {
        container.find(".sc_blogger.layout_polaroid .photostack:not(.inited)").each(function () {
            "use strict";
            var obj = jQuery(this);
            var id = obj.attr('id');
            if (id == undefined) {
                id = 'photostack_'+Math.random();
                id = id.replace('.', '');
                obj.attr('id', id);
            }
            setTimeout(function() {
                "use strict";
                obj.addClass('inited').parent().height("auto");
                new Photostack( obj.get(0), {
                    callback: function( item ) {
                    }
                } );
            }, 10);
        });
    }

    // Blogger: Scroll horizontal
    if (container.find('.sc_blogger .sc_scroll_horizontal .sc_scroll_wrapper:not(.inited)').length > 0) {
        container.find(".sc_blogger .sc_scroll_horizontal .sc_scroll_wrapper:not(.inited)").each(function () {
            "use strict";
            var obj = jQuery(this);
            var width = 0;
            obj.find('.isotope_item').each(function(){
                "use strict";
                width += jQuery(this).outerWidth();
            });
            obj.addClass('inited').width(width);
        });
    }

    // Form
    if (container.find('.sc_form:not(.inited) form').length > 0) {
        container.find(".sc_form:not(.inited) form").each(function() {
            "use strict";
            jQuery(this).addClass('inited');
            jQuery(this).submit(function(e) {
                "use strict";
                mr_murphy_sc_form_validate(jQuery(this));
                e.preventDefault();
                return false;
            });
            if (jQuery(this).find('.js__datepicker').length > 0) {
                jQuery(this).find('.js__datepicker').pickadate({
                    // Work-around for some mobile browsers clipping off the picker.
                    onOpen: function() {
                        "use strict";
                        jQuery('pre').css('overflow', 'hidden');
                    },
                    onClose: function() {
                        "use strict";
                        jQuery('pre').css('overflow', '');
                    },
                    monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
                    showMonthsShort: true,
                    format: 'dd.mm.yyyy',
                    formatSubmit: 'yyyy-mm-dd',
                    min: true
                });
            }
            if (jQuery(this).find('.js__timepicker').length > 0) {
                jQuery(this).find('.js__timepicker').pickatime();
            }
        });
    }

    //Countdown
    if (container.find('.sc_countdown:not(.inited)').length > 0) {
        container.find('.sc_countdown:not(.inited)')
            .each(function () {
                "use strict";
                jQuery(this).addClass('inited');
                var id = jQuery(this).attr('id');
                var curDate = new Date();
                var curDateTimeStr = curDate.getFullYear()+'-'+(curDate.getMonth()<9 ? '0' : '')+(curDate.getMonth()+1)+'-'+(curDate.getDate()<10 ? '0' : '')+curDate.getDate()
                    +' '+(curDate.getHours()<10 ? '0' : '')+curDate.getHours()+':'+(curDate.getMinutes()<10 ? '0' : '')+curDate.getMinutes()+':'+(curDate.getSeconds()<10 ? '0' : '')+curDate.getSeconds();
                var interval = 1;	//jQuery(this).data('interval');
                var endDateStr = jQuery(this).data('date');
                var endDateParts = endDateStr.split('-');
                var endTimeStr = jQuery(this).data('time');
                var endTimeParts = endTimeStr.split(':');
                if (endTimeParts.length < 3) endTimeParts[2] = '00';
                var endDateTimeStr = endDateStr+' '+endTimeStr;
                if (curDateTimeStr < endDateTimeStr) {
                    jQuery(this).find('.sc_countdown_placeholder').countdown({
                        until: new Date(endDateParts[0], endDateParts[1]-1, endDateParts[2], endTimeParts[0], endTimeParts[1], endTimeParts[2]),
                        tickInterval: interval,
                        onTick: mr_murphy_countdown
                    });
                } else {
                    jQuery(this).find('.sc_countdown_placeholder').countdown({
                        since: new Date(endDateParts[0], endDateParts[1]-1, endDateParts[2], endTimeParts[0], endTimeParts[1], endTimeParts[2]),
                        tickInterval: interval,
                        onTick: mr_murphy_countdown
                    });
                }
            });
    }

    // Googlemap init
    if (container.find('.sc_googlemap:not(.inited)').length > 0) {
        container.find('.sc_googlemap:not(.inited)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                var map = jQuery(this).addClass('inited');
                var map_id		= map.attr('id');
                var map_zoom	= map.data('zoom');
                var map_style	= map.data('style');
                var map_markers = [];
                map.find('.sc_googlemap_marker').each(function() {
                    "use strict";
                    var marker = jQuery(this);
                    map_markers.push({
                        point:			marker.data('point'),
                        address:		marker.data('address'),
                        latlng:			marker.data('latlng'),
                        description:	marker.data('description'),
                        title:			marker.data('title')
                    });
                });
                mr_murphy_googlemap_init( jQuery('#'+map_id).get(0), {style: map_style, zoom: map_zoom, markers: map_markers});
            });
    }

    // Infoboxes
    if (container.find('.sc_infobox.sc_infobox_closeable:not(.inited)').length > 0) {
        container.find('.sc_infobox.sc_infobox_closeable:not(.inited)')
            .addClass('inited')
            .on('click', function (e) {
                "use strict";
                jQuery(this).slideUp();
                e.preventDefault();
                return false;
            });
    }

    // Intro
    if (container.find('.sc_intro[data-href]:not(.inited)').length > 0) {
        container.find('.sc_intro[data-href]:not(.inited)')
            .addClass('inited')
            .on('click', function (e) {
                "use strict";
                var link = jQuery(this).data('href');
                window.location.href = link;
                e.preventDefault();
                return false;
            });
    }

    // Matches
    if (container.find('.sc_matches:not(.inited)').length > 0) {
        container.find('.sc_matches:not(.inited)')
            .each(function () {
                "use strict";
                jQuery(this).find('.sc_matches_next .sc_matches_list .sc_match').on('click', function () {
                    "use strict";
                    jQuery(this).parents('.sc_matches').find('.sc_matches_current .sc_match').hide();
                    var item = jQuery(this).data('item');
                    jQuery(item).fadeIn();
                });
            });
    }

    // Matches & Players: Sort players by points
    if (container.find('.sc_players_table:not(.inited)').length > 0) {
        container.find('.sc_players_table:not(.inited)')
            .addClass('inited')
            .on('click', '.sort', function (e) {
                "use strict";
                var table = jQuery(this).parents('.sc_players_table');
                var id = jQuery(table).attr('id')
                var sort = jQuery(table).data('sort') == 'asc' ? 'desc' : 'asc';
                jQuery.post(MR_MURPHY_STORAGE['ajax_url'], {
                    action: 'sort_by_points',
                    nonce: MR_MURPHY_STORAGE['ajax_nonce'],
                    sort: sort,
                    table: MR_MURPHY_STORAGE['ajax_' + id]
                }).done(function(response) {
                    var rez = {};
                    try {
                        rez = JSON.parse(response);
                    } catch (e) {
                        rez = { error: MR_MURPHY_STORAGE['ajax_error'] };
                        console.log(response);
                    }
                    if (rez.error === '') {
                        table
                            .data('sort', sort)
                            .find('.sc_table')
                            .after(rez.data)
                            .remove();
                        mr_murphy_select_players_category(jQuery(table).find('.sc_players_table_category select'));
                    }
                });
                e.preventDefault();
                return false;
            });
    }

    // Matches & Players: Select category in the points table
    if (container.find('.sc_players_table_category:not(.inited)').length > 0) {
        container.find('.sc_players_table_category:not(.inited)')
            .addClass('inited')
            .on('change', function () {
                "use strict";
                mr_murphy_select_players_category(jQuery(this));
            });
    }

    // Popup links
    if (container.find('.sc_popup_link:not(.inited)').length > 0) {
        container.find('.sc_popup_link:not(.inited)').each(function() {
            var popup_id = jQuery(this).attr('href');
            jQuery(this)
                .addClass('inited')
                .magnificPopup({
                    type: 'inline',
                    removalDelay: 500,
                    midClick: true,
                    callbacks: {
                        beforeOpen: function () {
                            this.st.mainClass = 'mfp-zoom-in';
                        },
                        open: function() {
                            "use strict";
                            mr_murphy_sc_init(jQuery(popup_id));
                            mr_murphy_resize_actions();
                            if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(jQuery(popup_id));
                        },
                        close: function() {}
                    }
                });
        });
    }

    // Recent news widget and sc
    if (container.find('.sc_recent_news_header_category_item_more:not(.inited)').length > 0) {
        container.find('.sc_recent_news_header_category_item_more:not(.inited)').each(function() {
            "use strict";
            jQuery(this)
                .addClass('inited')
                .on('click', function(e) {
                    "use strict";
                    jQuery(this).toggleClass('opened').find('.sc_recent_news_header_more_categories').slideToggle();
                    e.preventDefault();
                    return false;
                });
        });
    }

    // Search form
    if (container.find('.search_wrap:not(.inited)').length > 0) {
        container.find('.search_wrap:not(.inited)').each(function() {
            "use strict";
            jQuery(this)
                .addClass('inited')
                .on('click', '.search_submit', function(e) {
                    "use strict";
                    var search_wrap = jQuery(this).parents('.search_wrap');
                    if (!search_wrap.hasClass('search_state_fixed')) {
                        if (search_wrap.hasClass('search_state_opened')) {
                            if (search_wrap.find('.search_field').val() != '')
                                search_wrap.find('form').get(0).submit();
                            else
                                search_wrap.removeClass('search_state_opened').addClass('search_state_closed').find('.search_results').fadeOut();
                        } else
                            search_wrap.removeClass('search_state_closed').addClass('search_state_opened').find('.search_field').get(0).focus();
                    } else {
                        if (search_wrap.find('.search_field').val() != '')
                            search_wrap.find('form').get(0).submit();
                        else {
                            search_wrap.find('.search_field').val('');
                            search_wrap.find('.search_results').fadeOut();
                        }
                    }
                    e.preventDefault();
                    return false;
                })
                .on('click', '.search_close', function(e) {
                    "use strict";
                    jQuery(this).parents('.search_wrap').removeClass('search_state_opened').addClass('search_state_closed').find('.search_results').fadeOut();
                    e.preventDefault();
                    return false;
                })
                .on('click', '.search_results_close', function(e) {
                    "use strict";
                    jQuery(this).parent().fadeOut();
                    e.preventDefault();
                    return false;
                })
                .on('click', '.search_more', function(e) {
                    "use strict";
                    if (jQuery(this).parents('.search_wrap').find('.search_field').val() != '')
                        jQuery(this).parents('.search_wrap').find('form').get(0).submit();
                    e.preventDefault();
                    return false;
                })
                .on('blur', '.search_field', function(e) {
                    if (jQuery(this).val() == '' && !jQuery(this).parents('.search_wrap').hasClass('search_state_fixed'))
                        jQuery(this).parents('.search_wrap').removeClass('search_state_opened').addClass('search_state_closed').find('.search_results').fadeOut();
                });

            if (jQuery(this).hasClass('search_ajax')) {
                var ajax_timer = null;
                jQuery(this).find('.search_field').keyup(function(e) {
                    "use strict";
                    var search_field = jQuery(this);
                    var s = search_field.val();
                    if (ajax_timer) {
                        clearTimeout(ajax_timer);
                        ajax_timer = null;
                    }
                    if (s.length >= MR_MURPHY_STORAGE['ajax_search_min_length']) {
                        ajax_timer = setTimeout(function() {
                            "use strict";
                            jQuery.post(MR_MURPHY_STORAGE['ajax_url'], {
                                action: 'ajax_search',
                                nonce: MR_MURPHY_STORAGE['ajax_nonce'],
                                text: s
                            }).done(function(response) {
                                "use strict";
                                clearTimeout(ajax_timer);
                                ajax_timer = null;
                                var rez = {};
                                try {
                                    rez = JSON.parse(response);
                                } catch (e) {
                                    rez = { error: MR_MURPHY_STORAGE['ajax_error'] };
                                    console.log(response);
                                }
                                if (rez.error === '') {
                                    search_field.parents('.search_ajax').find('.search_results_content').empty().append(rez.data);
                                    search_field.parents('.search_ajax').find('.search_results').fadeIn();
                                } else {
                                    mr_murphy_message_warning(MR_MURPHY_STORAGE['strings']['search_error']);
                                }
                            });
                        }, MR_MURPHY_STORAGE['ajax_search_delay']);
                    }
                });
            }
        });
    }


    // Section Pan init
    if (container.find('.sc_pan:not(.inited_pan)').length > 0) {
        container.find('.sc_pan:not(.inited_pan)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                var pan = jQuery(this).addClass('inited_pan');
                var cont = pan.parent();
                cont.mousemove(function(e) {
                    "use strict";
                    var anim = {};
                    var tm = 0;
                    var pw = pan.width(), ph = pan.height();
                    var cw = cont.width(), ch = cont.height();
                    var coff = cont.offset();
                    if (pan.hasClass('sc_pan_vertical'))
                        pan.css('top', -Math.floor((e.pageY - coff.top) / ch * (ph-ch)));
                    if (pan.hasClass('sc_pan_horizontal'))
                        pan.css('left', -Math.floor((e.pageX - coff.left) / cw * (pw-cw)));
                });
                cont.mouseout(function(e) {
                    "use strict";
                    pan.css({'left': 0, 'top': 0});
                });
            });
    }

    // Scroll
    if (container.find('.sc_scroll:not(.inited)').length > 0) {
        container.find('.sc_scroll:not(.inited)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                MR_MURPHY_STORAGE['scroll_init_counter'] = 0;
                mr_murphy_sc_init_scroll_area(jQuery(this));
            });
    }


    // Swiper Slider
    if (container.find('.sc_slider_swiper:not(.inited)').length > 0) {
        container.find('.sc_slider_swiper:not(.inited)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                //if (jQuery(this).parents('.isotope_wrap:not(.inited)').length > 0) return;
                jQuery(this).addClass('inited');
                mr_murphy_sc_slider_autoheight(jQuery(this));
                if (jQuery(this).parents('.sc_slider_pagination_area').length > 0) {
                    jQuery(this).parents('.sc_slider_pagination_area').find('.sc_slider_pagination .post_item').eq(0).addClass('active');
                }
                var id = jQuery(this).attr('id');
                if (id == undefined) {
                    id = 'swiper_'+Math.random();
                    id = id.replace('.', '');
                    jQuery(this).attr('id', id);
                }
                jQuery(this).addClass(id);
                jQuery(this).find('.slides .swiper-slide').css('position', 'relative');
                var width = jQuery(this).width();
                if (width == 0) width = jQuery(this).parent().width();
                var spv = jQuery(this).data('slides-per-view');
                if (spv == undefined) spv = 1;
                var min_width = jQuery(this).data('slides-min-width');
                if (min_width == undefined) min_width = 50;
                if (width / spv < min_width) spv = Math.max(1, Math.floor(width / min_width));
                var space = jQuery(this).data('slides-space');
                if (space == undefined) space = 0;
                if (MR_MURPHY_STORAGE['swipers'] === undefined) MR_MURPHY_STORAGE['swipers'] = {};
                MR_MURPHY_STORAGE['swipers'][id] = new Swiper('.'+id, {
                    calculateHeight: !jQuery(this).hasClass('sc_slider_height_fixed'),
                    resizeReInit: true,
                    autoResize: true,
                    loop: true,
                    grabCursor: true,
                    nextButton: jQuery(this).hasClass('sc_slider_controls') ? '#'+id+' .sc_slider_next' : false,
                    prevButton: jQuery(this).hasClass('sc_slider_controls') ? '#'+id+' .sc_slider_prev' : false,
                    pagination: jQuery(this).hasClass('sc_slider_pagination') ? '#'+id+' .sc_slider_pagination_wrap' : false,
                    paginationClickable: true,
                    autoplay: jQuery(this).hasClass('sc_slider_noautoplay') ? false : (isNaN(jQuery(this).data('interval')) ? 7000 : jQuery(this).data('interval')),
                    autoplayDisableOnInteraction: false,
                    initialSlide: 0,
                    slidesPerView: spv,
                    loopedSlides: spv,
                    spaceBetween: space,
                    speed: 600,
                    // Autoheight on start
                    onFirstInit: function (slider){
                        "use strict";
                        var cont = jQuery(slider.container);
                        if (!cont.hasClass('sc_slider_height_auto')) return;
                        var li = cont.find('.swiper-slide').eq(1);
                        var h = li.data('height_auto');
                        if (h > 0) {
                            var pt = parseInt(li.css('paddingTop')), pb = parseInt(li.css('paddingBottom'));
                            li.height(h);
                            cont.height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                            cont.find('.swiper-wrapper').height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                        }
                    },
                    // Autoheight on slide change
                    onSlideChangeStart: function (slider){
                        "use strict";
                        var cont = jQuery(slider.container);
                        if (!cont.hasClass('sc_slider_height_auto')) return;
                        var idx = slider.activeIndex;
                        var li = cont.find('.swiper-slide').eq(idx);
                        var h = li.data('height_auto');
                        if (h > 0) {
                            var pt = parseInt(li.css('paddingTop')), pb = parseInt(li.css('paddingBottom'));
                            li.height(h);
                            cont.height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                            cont.find('.swiper-wrapper').height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                        }
                    },
                    // Change current item in 'full' or 'over' pagination wrap
                    onSlideChangeEnd: function (slider, dir) {
                        "use strict";
                        var cont = jQuery(slider.container);
                        if (cont.parents('.sc_slider_pagination_area').length > 0) {
                            var li = cont.parents('.sc_slider_pagination_area').find('.sc_slider_pagination .post_item');
                            var idx = slider.activeIndex > li.length ? 0 : slider.activeIndex-1;
                            mr_murphy_sc_change_active_pagination_in_slider(cont, idx);
                        }
                    }
                });

                jQuery(this).data('settings', {mode: 'horizontal'});		// VC hook

                var curSlide = jQuery(this).find('.slides').data('current-slide');
                if (curSlide > 0)
                    MR_MURPHY_STORAGE['swipers'][id].slideTo(curSlide-1);

                mr_murphy_sc_prepare_slider_navi(jQuery(this));

            });

        // Check slides per view
        mr_murphy_sc_sliders_resize();
    }

    //Skills init
    if (container.find('.sc_skills_item:not(.inited)').length > 0) {
        mr_murphy_sc_init_skills(container);
        jQuery(window).scroll(function () { mr_murphy_sc_init_skills(container); });
    }
    //Skills type='arc' init
    if (container.find('.sc_skills_arc:not(.inited)').length > 0) {
        mr_murphy_sc_init_skills_arc(container);
        jQuery(window).scroll(function () { mr_murphy_sc_init_skills_arc(container); });
    }

    // Tabs
    if (container.find('.sc_tabs:not(.inited):not(.no_jquery_ui),.tabs_area:not(.inited)').length > 0) {
        container.find('.sc_tabs:not(.inited):not(.no_jquery_ui),.tabs_area:not(.inited)').each(function () {
            "use strict";
            var init = jQuery(this).data('active');
            if (isNaN(init)) init = 0;
            else init = Math.max(0, init);
            jQuery(this)
                .addClass('inited')
                .tabs({
                    active: init,
                    show: {
                        effect: 'fadeIn',
                        duration: 300
                    },
                    hide: {
                        effect: 'fadeOut',
                        duration: 300
                    },
                    create: function (event, ui) {
                        "use strict";
                        mr_murphy_sc_init(ui.panel);
                        if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(ui.panel);
                    },
                    activate: function (event, ui) {
                        "use strict";
                        mr_murphy_sc_init(ui.newPanel);
                        if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(ui.newPanel);
                    }
                });
        });
    }
    if (container.find('.sc_tabs.no_jquery_ui:not(.inited)').length > 0) {
        container.find('.sc_tabs.no_jquery_ui:not(.inited)').each(function () {
            "use strict";
            jQuery(this)
                .addClass('inited')
                .on('click', '.sc_tabs_titles li a', function(e) {
                    "use strict";
                    if (!jQuery(this).parent().hasClass('sc_tabs_active')) {
                        var id_act = jQuery(this).parent().siblings('.sc_tabs_active').find('a').attr('href');
                        var id = jQuery(this).attr('href');
                        jQuery(this).parent().addClass('sc_tabs_active').siblings().removeClass('sc_tabs_active');
                        jQuery(id_act).fadeOut(function() {
                            "use strict";
                            jQuery(id).fadeIn(function() {
                                "use strict";
                                mr_murphy_sc_init(jQuery(this));
                                if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(jQuery(this));
                            });
                        });
                    }
                    e.preventDefault();
                    return false;
                });
            jQuery(this).find('.sc_tabs_titles li').eq(0).addClass('sc_tabs_active');
            jQuery(this).find('.sc_tabs_content').eq(0).fadeIn(function() {
                "use strict";
                mr_murphy_sc_init(jQuery(this));
                if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(jQuery(this));
            });
        });
    }

    // Toggles
    if (container.find('.sc_toggles .sc_toggles_title:not(.inited)').length > 0) {
        container.find('.sc_toggles .sc_toggles_title:not(.inited)')
            .addClass('inited')
            .on('click', function () {
                "use strict";
                jQuery(this).toggleClass('ui-state-active').parent().toggleClass('sc_active');
                jQuery(this).parent().find('.sc_toggles_content').slideToggle(300, function () {
                    "use strict";
                    mr_murphy_sc_init(jQuery(this).parent().find('.sc_toggles_content'));
                    if (window.mr_murphy_init_hidden_elements) mr_murphy_init_hidden_elements(jQuery(this).parent().find('.sc_toggles_content'));
                });
            });
    }

    //Zoom
    if (container.find('.sc_zoom:not(.inited)').length > 0) {
        container.find('.sc_zoom:not(.inited)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                jQuery(this).addClass('inited');
                jQuery(this).find('img').elevateZoom({
                    zoomType: "lens",
                    lensShape: "round",
                    lensSize: 200,
                    lensBorderSize: 4,
                    lensBorderColour: '#ccc'
                });
            });
    }
};



