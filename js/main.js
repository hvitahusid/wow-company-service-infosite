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
                return false;
            } else {
                $(this).removeClass('active');
                return true;
            }
        });
        if(scroll < $('section:eq(0)').position().top - 44) {
            setHash('');
        }
    });

    $('.input input').on('keypress', function(e) {
        if(e.which === 13) {
            $(this).parent().find('button').click();
        }
    });

    $('.input button').on('click', function() {
        var input = $(this).parent().find('input').keypress();
        $.ajax({
            type: 'post',
            url: 'sendmail.php',
            data: {
                value: $(input).val()
            },
            success: function(data) {
                $(input).val('').blur();
                var placeholder = $('input').attr('placeholder');
                $('input').attr('placeholder', 'WOW! Takk fyrir ;D');
                setTimeout(function() {
                    $('input').attr('placeholder', placeholder);
                }, 2000);
            }
        });
    });
});
