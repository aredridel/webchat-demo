
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    bosh = require('bosh'),
    ejslocals = require('ejs-locals'),
    stylus = require('stylus');


var app = express();

function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .set('warn', true)
    .set('compress', true);
}

app.configure(function(){
  app.set('port', process.env.PORT || 5280);
  app.engine('ejs', ejslocals);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware({
      src: __dirname + '/style',
      dest: __dirname + '/public',
      compile: compile
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/http-bind', bosh({debug: true}));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
