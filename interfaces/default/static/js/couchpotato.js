$(document).ready(function() {

    $.ajax({
        url: '/json/?which=couchpotato&action=movielist',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (!result.empty) {
                $.each(result.movies, function(i, item) {

                    var row = $('<tr>');
                    var original_title = item.library.info.original_title;

                    row.append($('<td>').html(original_title));
                    $('#movies_table_body').append(row);
                });
            }
        }
    });
})