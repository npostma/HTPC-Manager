

$(document).ready(function () {

    loadMovies();
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            loadMovies();
        }
    });

    loadXbmcShows();
    loadNowPlaying();

    // Button setten
    $('#back-to-shows').click(function () {
        $('#show-details').slideUp(function () {
            $('#show-grid').slideDown();
        });
    });

    // Knoppen van de player
    $('[data-player-control]').click(function () {

        var clickItem = $(this);
        var playerDo = clickItem.attr('data-player-control');

        // Laadscherm
        clickItem.attr('disabled', true);

        $.ajax({
            url: 'json/?which=xbmc&action=controlplayer&do=' + playerDo,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                if (data == null) return;
            }
        });
    });

    // Notificatie versturen
    $('#send_notification_button').click(function () {
        sendNotification($('#send_notification_text').val());
    });

    // Search
    $('#search-query').keyup(function () {
        loadMovies({
            search : $(this).val()
        });
    });

});
