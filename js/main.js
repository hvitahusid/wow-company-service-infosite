$(function() {
    var nav_template = $('#nav-template').html();

    $('section').each(function(index) {
        $(this).append(nav_template).find('nav li').eq(index).addClass('active');
    });

    function setHash(hash) {
        if(window.location.hash === hash) {return;}
        if(!hash) {hash = './';}
        try {history.replaceState(null, null, hash);} catch(e) {}
    }

    function autoScroll(href) {
        var pos = $('section.' + href.substr(1)).position().top - 44;
        $("html, body").animate({scrollTop: pos});
    }
    if(window.location.hash) {
        autoScroll(window.location.hash);
    } else {
        $(window).scrollTop(0);
    }

    $('nav li a').on('click', function() {
        autoScroll($(this).attr('href'));
    });

    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        var window_height = $(window).height();

        $('section').each(function(index) {
            var top = $(this).position().top - 44;
            var height = $(this).outerHeight() - window_height;
            var bottom = top + height;

            if((scroll <= bottom || index === 3) && scroll >= top) {
                $(this).addClass('active');
                setHash('#' + $(this).attr('class').split(' ')[0]);
            } else {
                $(this).removeClass('active');
            }
        });
        if(scroll < $('section:eq(0)').position().top - 44) {
            setHash('');
        }
    });

    $('input').on('keypress', function(e) {
        if(e.which === 13) {
            $.ajax({
                type: 'post',
                url: 'sendmail.php',
                data: {
                    value: $(this).val()
                },
                success: function(data) {
                    $(e.currentTarget).val('').blur();
                }
            });
        }
    });
});
