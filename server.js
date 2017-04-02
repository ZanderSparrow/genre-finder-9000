var express = require('express');
var path = require('path');

var app = express();
var distDir = path.resolve(__dirname, './client/');

// serve static files from the client directory
app.use(express.static(distDir));

// headers
app.use(function(eq, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  if (req.accepts('html') && req.method === 'GET') {
    res.sendFile(path.join(distDir, '/index.html'));
  } else {
    next();
  }
});

console.log(`server running on port ${port} in ${process.env.NODE_ENV || "development"} mode`);
// start listening to requests on port 3000
app.listen(port);

// if (process.env.NODE_ENV === 'production') {
//   var httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/sporkhub.xyz/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/sporkhub.xyz/fullchain.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/sporkhub.xyz/chain.pem')
//   };
//   https.createServer(httpsOptions, app).listen(443);
// }

module.exports = app;
