$(document).ready(function() {
    // Haal lijst op
    getMovieList();
    // Zoek film
    $('#search_movie_button').click(function() {
        searchMovie($('#search_movie_name').val());
    });
});

function getMovieList() {

    // Gooi eerst movielijst leeg als dat nog niet zo is
    $('.tooltip').remove();

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

                var row = $('<tr>');
                row.attr('id', item.id);
                row.append($('<td>').append(movieThumb));
                var original_title = item.library.info.original_title;
                var movieHtml = '<h3>' + original_title + ' (' + item.library.year + ')</h3>';
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
                var removeIcon = makeIcon('icon-remove', 'Remove');
                removeIcon.click(function() {
                    deleteMovie(item.id);
                });

                row.append($('<td>').append(editIcon));
                row.append($('<td>').append(refreshIcon));
                row.append($('<td>').append(removeIcon));

                $('#movies_table_body').append(row);
            });
        }
    });
}


function deleteMovie(id) {
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
            }
        }
    });
}

function searchMovie(q) {

    $('#search_movie_name').popover({
        placement: 'bottom',
        title: 'Search result',
        trigger: 'manual',
        content: '<table class="table"><tbody id="search-movie-list"></tbody></table>'
    });

    $.ajax({
        url: '/json/?which=couchpotato&action=movie.search',
        data: {
            q: q
        },
        type: 'get',
        dataType: 'json',
        beforeSend: function () {
            $('#search_movie_name').popover('show');
        },
        success: function (result) {
            $.each(result.movies, function(i, item) {

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
                var original_title = item.original_title
                var movieHtml = '<h3>' + original_title + ' <small>' + item.year + '</small></h3>';
                row.append($('<td>').append(movieHtml));
                $('#search-movie-list').append(row);
                $('.popover-inner').width(600);
            });
        }
    });
}