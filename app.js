/*jslint node: true */
/*jslint nomen: true*/
/* global require */
var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    util = require('util'),
    mysql = require('mysql'),
    connection = mysql.createConnection({ host : 'localhost', user : 'root', password : ''});

// all environments
app.set('port', process.env.PORT || 3000);
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


