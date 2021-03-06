var scriptArray = [
    'js/jquery.form.js',
    'js/jquery.cookie.js',
    'js/bootstrap.min.js',
    'js/functions/functions.xbmc.js',
    'js/functions/functions.sickbeard.js',
    'js/functions/functions.sabnzbd.js'
];

//scripts inladen
$.each(scriptArray, function (i, scripturl) {
	var script = $('<script>');
	script.attr('src', scripturl);
	$('head').append(script);
});

$(document).ready(function () {

    $(".table-sortable").tablesorter();

    // Tabs maken
    $('.tabs').tab();
    $('a[data-toggle="tab"]').on('shown', function(e) {
        var current_tab = $(e.target).attr('href');
        $.cookie('active_tab', current_tab);
    });
	// Actieve tab laden
	var last_active_tab = $.cookie('active_tab');
	$('[href=' + last_active_tab + ']').trigger('click');

    // Tooltip op de player
    $('#xbmc-player').tooltip({trigger : 'manual'});
    $('#xbmc-player').tooltip('show');

    // Carousel
    $('.carousel').carousel();

    $('#notify-user').find('.close').click(function () {
        $('#notify-user').hide();
    });

    $('#btn-shutdown').click(function () {
        if (confirm('Are you sure?')) {
            $.ajax({
                url: 'json/?which=system&action=shutdown',
                type: 'get',
                dataType: 'json',
                beforeSend: function() {
                    notifySuccess('Shutdown command sent.')
                }
            });
        }
    });
    $('#btn-restart').click(function () {
        if (confirm('Are you sure?')) {
            $.ajax({
                url: 'json/?which=system&action=restart',
                type: 'get',
                dataType: 'json',
                beforeSend: function() {
                    notifySuccess('Restart command sent.')
                }
            });
        }
    });

    $('#modal_dialog').on('hidden', function () {
        $('#modal_dialog .modal-body').css({
            background : '#ffffff'
        });
    })

});

// Text inkorten
function shortenText(text, length) {
    var shorten_text = text;
    if (text.length > length) {
        shorten_text = shorten_text.substr(0, length);
        shorten_text += '...';
    }
    return shorten_text;
}

// Dialog weg
function hideModal() {
    $('#modal_dialog').modal('hide');
}

// tonen van een dailog
function showModal(title, content, buttons) {

    $('#modal_dialog').find('.modal-footer').html('');
    $('#modal_dialog').find('.modal-h3').html(title);
    $('#modal_dialog').find('.modal-body').html(content);

    // Sluiten knop
    var button = $('<a>');
    button.html('Close');
    button.attr('href', 'javascript:void(0);');
    button.addClass('btn');
    button.attr('data-dismiss', 'modal');
    $('#modal_dialog').find('.modal-footer').append(button)

    // Andere buttons toevoegen
    $.each(buttons, function (name, action) {
        var button = $('<a>');
        button.html(name);
        button.attr('href', 'javascript:void(0);');
        button.addClass('btn');
        button.click(function () {
            $(action);
        });
        $('#modal_dialog').find('.modal-footer').append(button)
    });
    
    $('#modal_dialog').modal({
        show: true,
        backdrop: true
    });

}

// Icoontjes maken
function makeIcon(iconClass, title) {
    var icon = $('<i>');
    icon.addClass(iconClass);
    icon.attr('title', title);
    icon.css('cursor', 'pointer');
    icon.tooltip({
        placement: 'right'
     });
    return icon;
}

// leading zeros
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

//
function findInString(key, string) {
    string = string.toUpperCase();
    var match = string.indexOf(key.toUpperCase());
    if (match != -1){
        return true;
    } else {
        return false;
    }
}

function notify(title, text) {
    $('#notify-user h4').html(title);
    $('#notify-user span').html(text);
    $('#notify-user').fadeIn(function () {
        setTimeout(function () {
            $('#notify-user').fadeOut();
        }, 2000);
    });
}

function notifyWarning(title, text) {
    $('#notify-user').removeClass('alert-info')
    $('#notify-user').removeClass('alert-success')
    notify(title, text)
}

function notifyInfo(title, text) {
    $('#notify-user').removeClass('alert-success')
    $('#notify-user').addClass('alert-info')
    notify(title, text)
}

function notifySuccess(title, text) {
    $('#notify-user').removeClass('alert-info')
    $('#notify-user').addClass('alert-success')
    notify(title, text)
}

function bytesToSize(bytes, precision) {
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;

    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB';
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB';
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB';
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TB';
    } else {
        return bytes + ' B';
    }
}