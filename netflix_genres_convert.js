// read netflix txt file
// apply: .split(/[:]|[0-9](?=[A-Z])/g) to get an array with genre number 
// take two at a time, first is genre, then number
// object to json
// save json

var fs = require("fs");
var buf = new Buffer(8192);

console.log("Going to open the genres text file");

fs.open('./netflix_genres.txt', 'r+', function(err, fd) {
   if (err) {
    return console.error(err);
   }
   console.log("File opened successfully!");
   
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
        console.log(err);
      }

      var result = '';

      // Print only read bytes to avoid junk.
      if(bytes > 0){
        result += buf.slice(0, bytes).toString();
      }

      // Convert to text to arrays, one matching numbers one splitting on them
      // Need to get only numbers with more then two digits
      // Some titles have a digit in them!
      var reg = /[0-9]{2,}/g;
      var titles = result.split(reg);
      var codes = result.match(reg);
      var resultObj = {};
      // Convert array to an object with genre and code
      for(var i = 0; i < titles.length; i++) {
        // take out the whitespace and colon
        var title = titles[i].trim();
        title = title.substr(0,title.length - 1); 
        resultObj[title] = codes[i];
      }

      fs.writeFile('netflix_genres.json', JSON.stringify(resultObj), function(err) {
        if(err) {
          console.log(err);
        }
        console.log("File written to json");
        // Close the opened file.
        fs.close(fd, function(err){
           if (err){
            console.log(err);
           } 
           console.log("File closed successfully.");
        });
      });
   });
});
