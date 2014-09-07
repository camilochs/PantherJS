if(!Modernizr.touch){ 
    $.stellar();
}
    
/* ==============================================
Liquid Slider - Home Text Slider
=============================================== */

$('#slider-home').liquidSlider({
	  autoSlide:          true,
	  autoSlideInterval:  4500,
	  autoSlideControls:  true,
	  forceAutoSlide: true,
	  dynamicArrows: false,
    
  slideEaseFunction:'animate.css',
  slideEaseDuration:900,
  heightEaseDuration:900,
  animateIn:"bounceIn",
  animateOut:"bounceOut",
  callback: function() {
    var self = this;
    $('.slider-6-panel').each(function() {
      $(this).removeClass('animated ' + self.options.animateIn);
    });
  }
});

/* ==============================================
Liquid Slider - Quotes Slider
=============================================== */

$('#separator-slider-1').liquidSlider({
	  autoSlide:          true,
	  autoSlideDirection: 'right',
	  autoSlideInterval:  4500,
	  autoSlideControls:  true,
	  forceAutoSlide: true,
	  autoHeight: false,
      dynamicArrows: true,
	  
  slideEaseFunction:'animate.css',
  slideEaseDuration:500,
  heightEaseDuration:500,
  animateIn:"fadeInX",
  animateOut:"fadeOut",
  callback: function() {
    var self = this;
    $('.slider-6-panel').each(function() {
      $(this).removeClass('animated ' + self.options.animateIn);
    });
  }
});

/* ==============================================
Liquid Slider - Testimonials
=============================================== */
$('#testimonials-slider').liquidSlider({
	  autoSlide:          true,
	  autoSlideDirection: 'right',
	  autoSlideInterval:  5000,
	  autoSlideControls:  true,
	  forceAutoSlide: true,
	  autoHeight: false,
      dynamicArrows: true,
	  
	  
  slideEaseFunction:'animate.css',
  slideEaseDuration:500,
  heightEaseDuration:500,
  animateIn:"flipInX",
  animateOut:"fadeOut",
  callback: function() {
    var self = this;
    $('.slider-6-panel').each(function() {
      $(this).removeClass('animated ' + self.options.animateIn);
    });
  }
});

/* ==============================================
Sticky Navbar
=============================================== */

$(document).ready(function(){
    $(".navbar").sticky({topSpacing:0});
});

(function ($) {
  $(document).ready(function(){
	// hide .navbar first
	$(".header-top").hide();
	// fade in .navbar
	$(function () {
		$(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 150) {
				$('.header-top').fadeIn();
			} else {
				$('.header-top').fadeOut();
			}
		});
	});
  });
}(jQuery));

/* ==============================================
Auto Close Responsive Navbar on Click
=============================================== */

function close_toggle() {
if ($(window).width() <= 768) {
  $('.navbar-collapse a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
  });
}
else {
 $('.navbar .navbar-default a').off('click');
}
}
close_toggle();

$(window).resize(close_toggle); 

$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
 
/* ==============================================
WOW plugin triggers animation.css on scroll
=============================================== */

var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       150,          // distance to the element when triggering the animation (default is 0)
    mobile:       false        // trigger animations on mobile devices (true is default)
  }
);
wow.init();

/* ==============================================
Bootstrap Tooltip, Alert, Tabs
=============================================== */

$(function () { $("[data-toggle='tooltip']").tooltip();  
    $(".alert").alert()
});

$(function () {
    var active = true;
    $('#collapse-init').click(function () {
        if (active) {
            active = false;
            $('.panel-collapse').collapse('show');
            $('.panel-title').attr('data-toggle', '');
            $(this).text('Close All');
        } else {
            active = true;
            $('.panel-collapse').collapse('hide');
            $('.panel-title').attr('data-toggle', 'collapse');
            $(this).text('Open All');
        }
    });
    $('#accordion').on('show.bs.collapse', function () {
        if (active) $('#accordion .in').collapse('hide');
    });
});

$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

/* ==============================================
mb.YTPlayer
=============================================== */

$(function(){
	$(".player").mb_YTPlayer();
});

/* ==============================================
Skill Bars
=============================================== */

$('.skills-col').waypoint(function() {
   jQuery('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},2000);
	});
	
	}, { offset: '100%' 
});

/* ==============================================
Preloader
=============================================== */

jQuery(window).load(function(){
    jQuery("#preloader").delay(500).fadeOut(1000);
    jQuery(".preload-logo").addClass('fadeOutLeft');
    jQuery(".back-logo").addClass('fadeOutRight');
    jQuery(".preload-gif").addClass('fadeOutUp');
    
});

/* ==============================================
Counter Up
=============================================== */

jQuery(document).ready(function($) {
    $('.counter').counterUp({
        delay: 10,
        time: 800
    });
});
 
/* ==============================================
Fit Vids
=============================================== */
$(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $("#thing-with-videos").fitVids();
  });




jQuery(document).ready(function($){

var height_video = $(window).width();
var height_responsive = (height_video / 1.78011) + 1;
$('.video_slide').css("height",height_responsive);



$(window).resize(function() {

var height_video = $(window).width();
var height_responsive = (height_video / 1.78011) + 1;
$('.video_slide').css("height",height_responsive);

});
});
 
/* ==============================================
Parallax
=============================================== */

$(document).ready(function(){
      $(window).stellar({ 
          horizontalScrolling: false,
          responsive: true
	  });  
});

/* ==============================================
FlexSlider v2.2.2
=============================================== */

$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
    });
    $('.shop-flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
    });
}); 

/* ==============================================
Contact Form
=============================================== */

jQuery(document).ready(function(){

	$('#contactform').submit(function(){

		var action = $(this).attr('action');

		$("#message").slideUp(750,function() {
		$('#message').hide();

 		$('#submit')
			.after('<img src="img/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');

		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			phone: $('#phone').val(),
			comments: $('#comments').val(),
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp('slow');

			}
		);

		});

		return false;

	});

});

/* ==============================================
Google Maps
=============================================== */

$("#map").gmap3({
    marker:{     
	address:"93 Worth St, New York, NY", 
	options:{ icon: "img/marker.png"}},
    map:{
    options:{
	styles: [ {
	stylers: [ { "saturation":-100 }, { "lightness": 0 }, { "gamma": 0.5 }]},
	],
	zoom: 13,
	scrollwheel:false,
	draggable: true }
	}
	});	

/* ==============================================
Back to Top
=============================================== */

$(window).scroll(function(){
		if($(window).scrollTop() > 300){
			$("#back-to-top").fadeIn(600);
		} else{
			$("#back-to-top").fadeOut(600);
		}
	});
	
	$('#back-to-top, .back-to-top').click(function() {
		  $('html, body').animate({ scrollTop:0 }, '1000');
		  return false;
	});

/* ==============================================
Backstretch - v2.0.4
=============================================== */
    
$(".home-fullscreen-slider").backstretch([
	"img/slide-1.jpg",
	"img/slide-2.jpg",
	"img/slide-3.jpg"
], {
	fade: 750,
	duration: 4000
});
    
/* ==============================================
Portfolio
=============================================== */

(function ($, window, document, undefined) {

    var gridContainer = $('#grid-container'),
        filtersContainer = $('#filters-container');

	// init cubeportfolio
    gridContainer.cubeportfolio({

        defaultFilter: '*',

        animationType: 'rotateRoom',

        gapHorizontal: 25,

        gapVertical: 25,

        gridAdjustment: 'responsive',

        caption: 'overlayBottomReveal',

        displayType: 'lazyLoading',

        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxShowCounter: true,

        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageShowCounter: true,
        singlePageCallback: function (url, element) {

            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                timeout: 5000
            })
            .done(function(result) {
                t.updateSinglePage(result);
            })
            .fail(function() {
                t.updateSinglePage("Error! Please refresh the page!");
            });

        },

        // single page inline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'above',
        singlePageInlineShowCounter: true,
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url, element) {
            // to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
        }
    });

    // add listener for filters click
    filtersContainer.on('click', '.cbp-filter-item', function (e) {

        var me = $(this), wrap;

        // get cubeportfolio data and check if is still animating (reposition) the items.
        if ( !$.data(gridContainer[0], 'cubeportfolio').isAnimating ) {

            if ( filtersContainer.hasClass('cbp-l-filters-dropdown') ) {
                wrap = $('.cbp-l-filters-dropdownWrap');

                wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');

                wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());

                me.addClass('cbp-filter-item-active');
            } else {
                me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
            }

        }

        // filter the items
        gridContainer.cubeportfolio('filter', me.data('filter'), function () {});

    });

    // activate counters
    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));


    // add listener for load more click
    $('.cbp-l-loadMore-button-link').on('click', function(e) {

        e.preventDefault();

        var clicks, me = $(this), oMsg;

        if (me.hasClass('cbp-l-loadMore-button-stop')) return;

        // get the number of times the loadMore link has been clicked
        clicks = $.data(this, 'numberOfClicks');
        clicks = (clicks)? ++clicks : 1;
        $.data(this, 'numberOfClicks', clicks);

        // set loading status
        oMsg = me.text();
        me.text('LOADING...');

        // perform ajax request
        $.ajax({
            url: me.attr('href'),
            type: 'GET',
            dataType: 'HTML'
        })
        .done( function (result) {
            var items, itemsNext;

            // find current container
            items = $(result).filter( function () {
                return $(this).is('div' + '.cbp-loadMore-block' + clicks);
            });

            gridContainer.cubeportfolio('appendItems', items.html(),
                 function () {
                    // put the original message back
                    me.text(oMsg);

                    // check if we have more works
                    itemsNext = $(result).filter( function () {
                        return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                    });

                    if (itemsNext.length === 0) {
                        me.text('NO MORE WORKS');
                        me.addClass('cbp-l-loadMore-button-stop');
                    }

                 });

        })
        .fail(function() {
            // error
        });

    });

})(jQuery, window, document);
    
/* ==============================================
Smooth scrolling to anchor for home buttons
=============================================== */

$(function() {
    $('.btn-home a,.move a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 1000);
        event.preventDefault();
    });
});

/* ==============================================
Smooth Scroll To Anchor
=============================================== */

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('#main-nav a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 1000);
        event.preventDefault();
    });
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.footer-menu a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 1000);
        event.preventDefault();
    });
});
    
/* ==============================================
Active Menu Item on Page Scroll
=============================================== */   
    
var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();
 
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
 
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
 
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('current');
      sections.removeClass('current');
 
      $(this).addClass('current');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
    }
  });
});

/* ==============================================
Twitter Feed Calling
=============================================== */ 

$('.tweet-feed .tweet').twittie({
    dateFormat: '%b. %d, %Y',
    template: '{{tweet}} <div class="date">{{date}}</div>',
    count: 5
});

/* ==============================================
Smooth Scroll (mouse-wheel)
=============================================== */ 

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/**
 * jquery.simplr.smoothscroll
 * version 1.0
 * copyright (c) 2012 https://github.com/simov/simplr-smoothscroll
 * licensed under MIT
 * requires jquery.mousewheel - https://github.com/brandonaaron/jquery-mousewheel/
 */
;(function($) {
    'use strict';
    
    $.srSmoothscroll = function(options) {
    
    var self = $.extend({
        step: 155,
        speed: 400,
        ease: "swing"
    }, options || {});
    
    // private fields & init
    var win = $(window),
        doc = $(document),
        top = 0,
        step = self.step,
        speed = self.speed,
        viewport = win.height(),
        body = (navigator.userAgent.indexOf('AppleWebKit') !== -1) ? $('body') : $('html'),
        wheel = false;

    // events
    $('body').mousewheel(function(event, delta) {

        wheel = true;

        if (delta < 0) // down
            top = (top+viewport) >= doc.height() ? top : top+=step;

        else // up
            top = top <= 0 ? 0 : top-=step;

        body.stop().animate({scrollTop: top}, speed, self.ease, function () {
            wheel = false;
        });

        return false;
    });

    win
    .on('resize', function (e) {
        viewport = win.height();
    })
    .on('scroll', function (e) {
        if (!wheel)
            top = win.scrollTop();
    });
    
    };
})(jQuery);


$(function () {
    $.srSmoothscroll();
});

$(function () {
    var platform = navigator.platform.toLowerCase();
    if (platform.indexOf('windows') != -1 || platform.indexOf('linux') != -1) {
        if ($.browser.webkit) {
            $.srSmoothscroll();
        }
    }
});


