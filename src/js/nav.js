function initNav(){

  var $window = $(window),
          $body = $('body');

  // get current URL path and assign 'active' class
	var pathname = window.location.pathname;
  $('.nav.navbar-nav > li').removeClass('active');
	$('.nav.navbar-nav > li > a[href="'+pathname+'"]').parent().addClass('active');

  $(".navbar-collapse a").on("click", function() {
    $(".navbar-collapse").collapse("hide");
  });

  $window.on("scroll", function() {
    if ($(".navbar").offset().top > 100) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }

    if($body.is('.home')){
      var scrollPos = $(document).scrollTop();
     $('.nav.navbar-nav > li > a.home').each(function () {
         var currLink = $(this);
         var refElement = $(currLink.attr("href"));
         if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
             $('.nav.navbar-nav > li').removeClass("active");
             currLink.parent().addClass("active");
         }
         else{
             currLink.removeClass("active");
         }
     });
    }

  });

  $("a.smoth-scroll").on("click", function(event) {
    console.log('smoth-scroll')
    var $anchor = $(this);
    $("html, body").stop().animate({
        scrollTop: $($anchor.attr("href")).offset().top - 0
      },
      1000
    );
    event.preventDefault();
  });

  scrollspy.add($body, {
    target: ".navbar-collapse",
    offset: 95
  });

  // Bootstrap menu fix
  $(".navbar-toggle").on("click", function() {
    $body.addClass("mobile-menu-activated");
  });

  $("ul.nav.navbar-nav li a").on("click", function() {
    $(".navbar-collapse").removeClass("in");
  });
}


$(initNav);
