/*jslint node: true */
/*jslint nomen: true*/
/* global require */
var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    mysql = require('mysql'),
    connection = mysql.createConnection({ host : 'db4free.net', user : 'ismaelivanthomas', password : 'disfrutalafruta'});

// all environments
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port')),
    io = require('socket.io').listen(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

var routes = require('./utility/routes')(app, connection),
    sockets = require('./utility/sockets')(io, connection);


