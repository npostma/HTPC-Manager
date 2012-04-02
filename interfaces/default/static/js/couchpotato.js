$(document).ready(function() {
    // Haal lijst op
    getMovieList();

    // Notificaties
    getNotificationList();

    // Zoek film
    $('#search_movie_button').click(function() {
        searchMovie($('#search_movie_name').val());
    });

    // Maak popover vast voor het zoeken
    $('#search_movie_name').popover({
        placement: 'bottom',
        title: 'Search result',
        trigger: 'manual',
        content: '<div class="gif-loader" id="movie-loader"><img src="img/loader.gif" alt="loader" /></div><table class="table"><tbody id="search-movie-list"></tbody></table>'
    });
});

function getMovieList() {

    // Gooi eerst movielijst leeg als dat nog niet zo is
    $('.tooltip').remove();
    $('#movies_table_body').children().remove();

    $.ajax({
        url: '/json/?which=couchpotato&action=movie.list',
        type: 'get',
        dataType: 'json',
        success: function (result) {

            if (result == null) {
                var row = $('<tr>')
                row.append($('<td>').html('No wanted movies found').attr('colspan', '5'));
                $('#movies_table_body').append(row);
                return false;
            }

            $.each(result.movies, function(i, item) {

                var movieImage = $('<img>');
                movieImage.css('height', '150px');
                movieImage.css('width', '100px');
                movieImage.attr('src', item.library.info.images.poster[0]);

                var movieThumb = $('<a>').addClass('thumbnail');
                movieThumb.append(movieImage);
                movieThumb.css('height', '150px');
                movieThumb.css('width', '100px');

                var movieTitle = item.library.info.original_title;

                var row = $('<tr>');
                row.attr('id', item.id);
                row.append($('<td>').append(movieThumb));
                var movieHtml = '<h3>' + movieTitle + ' (' + item.library.year + ')</h3>';
                movieHtml += item.library.plot + '<br />';

                var info = $('<td>');
                row.append(info.html(movieHtml));

                $.each(item.profile.types, function(i, item) {
                    var profile = $('<span>');
                    profile.addClass('label');
                    profile.html(item.id);
                    info.append(profile);
                    info.append('&nbsp;');
                });

                var editIcon = makeIcon('icon-pencil', 'Edit');
                var refreshIcon = makeIcon('icon-refresh', 'Refresh');
                refreshIcon.click(function() {
                   refreshMovie(item.id, movieTitle);
                });
                var removeIcon = makeIcon('icon-remove', 'Remove');
                removeIcon.click(function() {
                    deleteMovie(item.id, movieTitle);
                });

                row.append($('<td>').append(editIcon));
                row.append($('<td>').append(refreshIcon));
                row.append($('<td>').append(removeIcon));

                $('#movies_table_body').append(row);
            });
        }
    });
}


function deleteMovie(id, name) {

    $.ajax({
        url: '/json/?which=couchpotato&action=movie.delete',
        data: {
            id: id
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.success) {
                $('#' + id).fadeOut();
                notifyInfo('CouchPotato', name + ' successfully deleted!');
            }
        }
    });
}

function refreshMovie(id, name) {

    $.ajax({
        url: '/json/?which=couchpotato&action=movie.refresh',
        data: {
            id: id
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (result.success) {
                notifyInfo('CouchPotato', name + ' successfully refreshed!');
            }
        }
    });
}

function searchMovie(q) {

    $.ajax({
        url: '/json/?which=couchpotato&action=movie.search',
        data: {
            q: encodeURIComponent(q)
        },
        type: 'get',
        dataType: 'json',
        beforeSend: function () {
            $('#search_movie_name').popover('show');
            $('#movie-loader').show();
        },
        success: function (result) {
            $.each(result.movies, function(i, item) {

                $('#movie-loader').hide();

                var movieImage = $('<img>');
                movieImage.css('height', '100px');
                movieImage.css('width', '75px');
                movieImage.attr('src', item.images.poster[0]);

                var movieThumb = $('<a>').addClass('thumbnail');
                movieThumb.append(movieImage);
                movieThumb.css('height', '100px');
                movieThumb.css('width', '75px');

                var row = $('<tr>');
                row.append($('<td>').append(movieThumb));

                var movieHtml = '<h3>' + item.original_title + ' <small>' + item.year + '</small></h3>';
                movieHtml += shortenText(item.plot, 200);
                row.append($('<td>').append(movieHtml));

                var addIcon = makeIcon('icon-plus', 'Add');
                addIcon.click(function() {
                    addMovie(12, item.imdb, item.original_title);
                });
                row.append($('<td>').append(addIcon));
                $('#search-movie-list').append(row);
            });
        }
    });
}

function addMovie(profile, id, title) {

    $('#movie-loader').show();
    $('#search-movie-list').children().remove();

    $.ajax({
        url: '/json/?which=couchpotato&action=movie.add',
        data: {
            profile_id : profile,
            identifier : id,
            title: encodeURIComponent(title)
        },
        type: 'get',
        dataType: 'json',
        success: function (result) {

            $('#search_movie_name').popover('hide');
            notifyInfo('CouchPotato', title + ' successfully added!');
            getMovieList();
        }
    });
}

function getNotificationList() {
    $.ajax({
        url: '/json/?which=couchpotato&action=notification.list',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
        }
    });
}