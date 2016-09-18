var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs'); 
var routes = require('./routes/index');
 
var app = express();

//http logging
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'test')));
app.use('/', routes);

// catch 404 and send error message
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(404, {status:404, message: 'Resource not found'}); 
  next(err);
});

// catch 500 and send error message
app.use( function(req, res, next) {
  var err = new Error('Internal server error');
  err.status = 500;
  res.send(500, {status:500, message: 'Internal server error'});
  next(err);
})

// setting server port
app.set('port', process.env.PORT || 3000);

// server setup 
var server = app.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port')); 
}); 

module.exports = app;
