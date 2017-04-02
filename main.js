var $ = require('jquery');

$(function() {
  $('#search-form form').submit(function(event) {
    var text = $('input#category').val();

    event.preventDefault();
    console.log(text.toString());
    //Clear the field
    $('input#category').val('');
  });
});
