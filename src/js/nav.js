function initNav(){

  var $window = $(window),
          $body = $('body');

  $(".navbar-collapse a").on("click", function() {
    $(".navbar-collapse").collapse("hide");
  });

  $window.on("scroll", function() {
    if ($(".navbar").offset().top > 100) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });

  $("a.smoth-scroll").on("click", function(event) {
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
