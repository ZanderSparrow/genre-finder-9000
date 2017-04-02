var $ = require('jquery');
var data = require('./netflix_genres.json');

function appendLinkNode(genre) {
  var url = "https://www.netflix.com/browse/genre/" + data[genre];
  var node = "<a href=" + url + " target='_blank'>" + genre + "</a>";
  $('#result').append(node);
}

function searchGenresByKey(keyWord) {
  
  var matches = [];
  for(key in data) {
    var words = key.match(/[a-zA-Z]+/g);
    for(var i = 0; i < words.length; i++ ) {
      var wordLower = words[i].toLowerCase();
      var qLower = keyWord.toLowerCase();
      var matched = true;
      for(var j = 0; j < qLower.length; j++ ) {
        if(qLower[j] !== wordLower[j]) {
          matched = false;
        }
      }
      if(matched) {
        matches.push(key);
        continue;
      }
    }
  }
  if(matches.length) {
    for(var i = 0; i < matches.length; i++) {
      appendLinkNode(matches[i]);
    }
  }
}

function searchGenres(query) {
  // if the exact genre is queried just append
  if(data[query]) {
    return appendLinkNode(query);
  }
  // otherwise look for all word matches
  var terms = query.match(/[a-zA-Z]+/g);
  for(var i = 0; i < terms.length; i++) {
    searchGenresByKey(terms[i]);
  }
}

$(function() {
  $('#search-form form').submit(function(event) {
    $('#result').empty();
    var text = $('input#category').val();
    event.preventDefault();
    searchGenres(text);

    console.log(data);
    //Clear the field
    $('input#category').val('');
  });
});
