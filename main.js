var $ = require('jquery');
var data = require('./netflix_genres.json');

function searchGenres(q) {
  if(data[q]) {
    var url = "https://www.netflix.com/browse/genre/" + data[q];
    var node = "<a href=" + url + " target='_blank'>" + q + "</a>";
    $('#result').append(node);
  }
}

$(function() {
  $('#search-form form').submit(function(event) {
    var text = $('input#category').val();
    event.preventDefault();
    searchGenres(text);

    console.log(data);
    //Clear the field
    $('input#category').val('');
  });
});
