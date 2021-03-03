
$(document).ready(function(){
    $(this).scrollTop(0);
});


function scrollFooter(scrollY, heightFooter)
{
    console.log(scrollY);
    console.log(heightFooter);

    if(scrollY >= ($('.footer').height()) + ($('.draft').height()) + ($('.content').height()) )
    {
        $('footer').css({
            'bottom' : '0px'
        });
    }
    else
    {
        $('footer').css({
            'bottom' : '-' + heightFooter + 'px'
        });
    }
}


function scrollHeader(scrollY, heightFooter)
{
    console.log(scrollY);
    console.log(heightFooter);

    if(scrollY >= ($('header').height()) + 50)
    {
       $('.header').css({
            'top' : '-' + ($('.header').height()) + 'px'
        });
    }
    
    else
    {
         $('.header').css({
            'top' : '0px'
        });
    }
}

$(window).load(function(){
    var windowHeight        = $(window).height(),
        footerHeight        = $('footer').height(),
        heightDocument      = (windowHeight) + ($('.content').height()) + ($('.draft').height()) + ($('footer').height()) - 20;

    
    
    $('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);
    scrollHeader(window.scrollY, footerHeight);

    
    window.onscroll = function(){
        var scroll = window.scrollY;

      
        
        $('header').css({
            'background-position-y' : 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
        scrollHeader(scroll, footerHeight);
    }
});

    (function($) { "use strict";
    
       
    $(document).ready(function() {  
        
        /* Hero Case study images */            
        
        $('.slide-buttons li:nth-child(1)').on('mouseenter', function() {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(1)').addClass("show");
            $('.slide-buttons li:nth-child(1)').addClass('active');
        })
        $('.slide-buttons li:nth-child(2)').on('mouseenter', function() {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(2)').addClass("show");
            $('.slide-buttons li:nth-child(2)').addClass('active');
        })
        $('.slide-buttons li:nth-child(3)').on('mouseenter', function() {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(3)').addClass("show");
            $('.slide-buttons li:nth-child(3)').addClass('active');
        })
        $('.slide-buttons li:nth-child(4)').on('mouseenter', function() {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(4)').addClass("show");
            $('.slide-buttons li:nth-child(4)').addClass('active');
        })
        $('.slide-buttons li:nth-child(5)').on('mouseenter', function() {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(5)').addClass("show");
            $('.slide-buttons li:nth-child(5)').addClass('active');
        })
        $('.slide-buttons li:nth-child(6)').on('mouseenter', function() {
            $('.slide-buttons li.active').removeClass('active');
            $('.hero-center-section.show').removeClass("show");
            $('.hero-center-section:nth-child(6)').addClass("show");
            $('.slide-buttons li:nth-child(6)').addClass('active');
        })
        $('.slide-buttons li:nth-child(1)').trigger('mouseenter')   
        
    });
    
})(jQuery); 

// Slider

var sliderTeam = (function(document, $) {
  
  'use strict';
  
  var $sliderTeams = $('.slider--teams'),
      $list = $('#list'),
      $listItems = $('#list li'),
      $nItems = $listItems.length,
      $nView = 3,
      autoSlider,
      $current = 0,
      $isAuto = true,
      $acAuto = 2500,
      
      _init = function() {
        _initWidth();
        _eventInit();
      },
      
      _initWidth = function() {
        $list.css({
          'margin-left': ~~(100 / $nView) + '%',
          'width': ~~(100 * ($nItems / $nView)) + '%'
        });
        $listItems.css('width', 100 / $nItems + '%');
        $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
      },
      
      _eventInit = function() {
        
        window.requestAnimFrame = (function() {
          return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
        })();

        window.requestInterval = function(fn, delay) {
            if( !window.requestAnimationFrame       && 
                !window.webkitRequestAnimationFrame && 
                !window.mozRequestAnimationFrame    && 
                !window.oRequestAnimationFrame      && 
                !window.msRequestAnimationFrame)
                    return window.setInterval(fn, delay);
            var start = new Date().getTime(),
            handle = new Object();

            function loop() {
                var current = new Date().getTime(),
                delta = current - start;
                if(delta >= delay) {
                    fn.call();
                    start = new Date().getTime();
                }
                handle.value = requestAnimFrame(loop);
            };
          
            return handle;
        }

        window.clearRequestInterval = function(handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
        };
        
        $.each($listItems, function(i) {
          var $this = $(this);
          $this.on('touchstart click', function(e) {
            e.preventDefault();
            _stopMove(i);
            _moveIt($this, i);
          });
        });
        
        autoSlider = requestInterval(_autoMove, $acAuto);
      },
      
      _moveIt = function(obj, x) {
        
        var n = x;
        
        obj.find('figure').addClass('active');        
        $listItems.not(obj).find('figure').removeClass('active');
        
        $list.velocity({
          translateX: ~~((-(100 / $nItems)) * n) + '%',
          translateZ: 0
        }, {
          duration: 1000,
          easing: [400, 26],
          queue: false
        });
        
      },
      
      _autoMove = function(currentSlide) {
        if ($isAuto) { 
          $current = ~~(($current + 1) % $nItems);
        } else {
          $current = currentSlide;
        }
        console.log($current);
        _moveIt($listItems.eq($current), $current);
      },
      
      _stopMove = function(x) {
        clearRequestInterval(autoSlider);
        $isAuto = false;
        _autoMove(x);
      };
  
  return {
    init: _init
  };

})(document, jQuery);

$(window).load(function(){
  'use strict';
  sliderTeam.init();
});




