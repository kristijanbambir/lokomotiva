'use strict';

var POSTS_IN_ROW = 3;
var TOTAL_COLUMNS = 12;

$.getScript('http://macevanje-lokomotiva-test.tumblr.com/api/read/json?num=' + POSTS_IN_ROW,
    function () {
        if (tumblr_api_read.posts.length === 0) {
            $('#news-section').hide();
        } else {
            var newsTemplate = $('#news-template').html();
            Mustache.parse(newsTemplate); // speeds up future uses
            var columnSpan = tumblr_api_read.posts.length < POSTS_IN_ROW ?
                TOTAL_COLUMNS / tumblr_api_read.posts.length :
                TOTAL_COLUMNS / POSTS_IN_ROW;
            for (var i = 0; i < tumblr_api_read.posts.length; i++) {
                tumblr_api_read.posts[i].columnSpan = columnSpan;
                tumblr_api_read.posts[i].dateLocal =
                    moment(tumblr_api_read.posts[i]['unix-timestamp'] * 1000)
                        .tz(jstz.determine().name())
                        .format('D.MM.YYYY. HH:mm');
                var rendered = Mustache.render(newsTemplate, tumblr_api_read.posts[i]);
                $('#news-items').append(rendered).find('.news-article').last()
                    .dotdotdot({ height: 250 });
            }
        }
    }
);
