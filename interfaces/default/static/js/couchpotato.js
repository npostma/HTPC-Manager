$(document).ready(function() {

    $.ajax({
        url: '/json/?which=couchpotato&action=movielist',
        type: 'get',
        dataType: 'json',
        success: function (result) {

            if (result == null) {
                var row = $('<tr>')
                row.append($('<td>').html('No wanted movies found').attr('colspan', '2'));
                $('#movies_table_body').append(row);
                return false;
            }

            console.log(result);
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
                var original_title = item.library.info.original_title;
                row.append($('<td>').append(movieThumb));
                row.append($('<td>').html('<h3>' + original_title + ' (' + item.library.year + ')</h3>' + item.library.plot));
                row.append($('<td>').html(''));

                $('#movies_table_body').append(row);
            });

        }
    });
})