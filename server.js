
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.disable('view cache');
app.set('view engine', 'pug')
// Routing
app.use(express.static(__dirname + '/dist'));

app.route('/').all(function (req, res) {
  res.render('index');
});
