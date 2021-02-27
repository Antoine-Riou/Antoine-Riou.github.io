// Back to top //

(function() {
  $(document).ready(function() {
    return $(window).scroll(function() {
      return $(window).scrollTop() > 150 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
    }), $("#back-to-top").click(function() {
      return $("html,body").animate({
        scrollTop: "0"
      })
    })
  })
}).call(this);

