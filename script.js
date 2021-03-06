
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


