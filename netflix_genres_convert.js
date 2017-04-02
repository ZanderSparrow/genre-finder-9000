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

      // Convert to text to an array with genre: code
      var resultArray = result.split(/[0-9](?=\s[A-Z])/g);
      var resultObj = {};
      var current;
      // Convert array to an object with genre and code
      for(var i = 0; i < resultArray.length; i++) {
        current = resultArray[i].split(/[:]/);
        resultObj[current[0].trim()] = current[1].trim();
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
