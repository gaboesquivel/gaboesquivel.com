
    var $window = $(window),
            $body = $('body');

    jQuery(document).ready(function($){

        /*====================================================
            background-image flickering solution for mobile
            =======================================================*/
             var bg = jQuery("#home");
            function resizeBackground() {
                bg.height(jQuery(window).height() + 60);
          }
          resizeBackground();



         /*=============================
                Parallax
        ==============================*/
        $window.stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });


        /*=============================
            Magnific Popup
        ==============================*/
      $('.work-popup').magnificPopup({type:'image'});


    /*=============================
            WOW js
    ==============================*/
      //  new WOW({ mobile: false }).init();


    /*=========================================
                 mixItUp
    =======================================*/

    var mixer = mixitup('.mixitup-container');
		mixer.filter('.development');

    /*===================================
            owl carousel testimonial
     ====================================*/
    $(".testimonial-list").owlCarousel({
        loop:true,
        margin:30,
        nav:false,
        dots:true,
        autoplay:true,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });


    });


    $window.load(function(){
          /*=============================
                Preloder
        ==============================*/
         $('.spinner').fadeOut();
        $('.preloader').delay(350).fadeOut(500);
        $body.delay(350).css({'overflow':'visible'});

        });
