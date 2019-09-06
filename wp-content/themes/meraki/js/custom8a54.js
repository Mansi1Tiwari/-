var $ = jQuery;
$.noConflict();
jQuery(document).ready(function($) {
    'use strict';
    /* Sub menu */
    if ($('.main-menu ul li').length){
	    $(".main-menu ul li").on('mouseenter mouseleave', function(e) {
	
	        if ($('ul', this).length) {
	            var elm = $('ul:first', this);
	            var off = elm.offset();
	            var l = off.left;
	            var w = elm.width();
	            var docH = $(".site-main").height();
	            var docW = $(".site-main").width();
	
	            var isEntirelyVisible = (l + w <= docW);
	            //alert(isEntirelyVisible);
	            if (isEntirelyVisible === false) {
	                $(this).addClass('edge');
	            } else {
	                //alert("hi");
	                $(this).removeClass('edge');
	            }
	        }
	    });
    }
    //bx-slider js//
    if ($('.bxslider').length){
    	 $('.bxslider').bxSlider({
		     adaptiveHeight: true
		 });
    }

    // smooth scroll js//
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });

    // menu active js//
    $('.navbar-nav li a').click(function(e) {
        $('.navbar-nav li').removeClass('active');
        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        //e.preventDefault();
    });

    // header reduce js//
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 150) {
            $(".main-header").addClass("darkHeader");
        } else {
            $(".main-header").removeClass("darkHeader");
        }
    });

    if ($(window).windth < 767) {
        $(".main-header").removeClass("darkHeader");

    }

    // wow js//
    new WOW().init();

    // blog page view more //
    function timedRefresh(timeoutPeriod) {
        setTimeout("location.reload(true);", timeoutPeriod);
    }

    $(".more-blog").click(function() {
        $(this).hide();
        $(".blLoader").show();
        //setTimeout(window.location.reload(true), 10000);
        timedRefresh(3000);
        return false;

    });

    // Back To top //
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.back-to-top');

    //hide or show the "back to top" link
    $(window).scroll(function() {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

    // Sub-menu Responsive Js
    $(".main-header nav ul li.menu-item-has-children").append("<span class='clickmenu'><i class='fa fa-angle-right'></i></span>");
    $('.clickmenu').on('click', function() {
        $(this).toggleClass('clicked');
        if ($(".main-header nav ul li.menu-item-has-children ul").hasClass('sub-menu')) {
            $(this).siblings('ul').removeClass('showmenu').slideToggle();
        } else {
            $(this).siblings('ul').addClass('showmenu').slideToggle();
        }
    });

    //isotop js//
    $(window).load(function() {

        // init Isotope
        if ($('.grid').length){
        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });
        }
        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };
        // bind filter button click
        
        $('.filters-button-group').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            if ($('.grid').length){
	            $grid.isotope({
	                filter: filterValue
	            });
            }
        });
        // change is-checked class on buttons
        $('.button-group').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });

    
        //  NAVBAR CLOSE ICON //
        $(".navbar-toggle").on("click", function() {
            $(this).toggleClass("active");
            $("body").toggleClass("popup-open");
        });

        $('.main-menu ul li a').click(function() {
            $("body").removeClass("popup-open");
        });

        //  NAVBAR OPEN/CLOSE //
        function resMenu() {
            if ($(window).width() < 1200) {

                $('.main-menu ul li a').on("click", function() {
                    $(".navbar-collapse").removeClass("in");
                    $(".navbar-toggle").addClass("collapsed").removeClass("active");
                });
            } else {}
        }

        resMenu();

        $(window).resize(function() {
            resMenu();
        });

        // PORTFOLIO IMAGE POPUP //

        $('.portfolio .element-item img').on("click", function() {
            var alt = $(this).attr('data-id');
            $("body").addClass("popup-open");

            $("body").addClass("link");
            window.history.pushState('obj', 'newtitle', alt);

        });

        $(document).on('click', '#lbMain', function() {
            var templateUrl = object_name.templateUrl;
            window.history.pushState('obj', 'newtitle', templateUrl);
            $("body").removeClass("popup-open");
        });

        $(document).on('click', '#lbImageContainer', function() {
            return false;
        });

        $(document).on('click', '#lbBottomContainer', function() {
            return false;
        });

        // Masonry for blog grid
        $('.grid_masonry').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.col-md-6',
            percentPosition: true
        });
        
        

    });  
    
        
    window.onload = function() {
        var cur_url = window.location.href;
        var animate_val = (cur_url).split("#")[1];
        if ((animate_val != '') || (animate_val != null) || (animate_val != "") ) {
            if ($(window).width() < 768) {
            	if ($(animate_val).length){
                	$('html,body').animate({scrollTop: $('[id="' + animate_val + '"]').offset().top - 75},1000);
            	}
            } else {            	
            	if ($(animate_val).length){
                	$('html,body').animate({scrollTop: $('[id="' + animate_val + '"]').offset().top - 80  }, 1000);
            	}                
            }
            return false;
        }
    };   
    

});

function setParentcommentMeraki(cpid,pid){
	if (jQuery('#comment_parent').length){
		jQuery("#comment_parent").val(cpid);
	}
}