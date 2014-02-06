
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var db = []; //Para tener las notas.

var util = require('util');
var mysql = require('mysql');
connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : ''
});
/* nombre del base de datos Proyecto
 * nombre del tabla: notas
 * attributos: id, asunto, autor, contenido, time */

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
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//Peticiones a la base de datos.

app.post('/procesaformulario', function(req, res) {

	/*Escribe en la base de datos */
	var post  = {asunto: req.body.asunto, autor: req.body.autor, contenido: req.body.contenido};
	var query = connection.query('INSERT INTO Proyecto.notas SET ?', post, function(err, result) {
  		if(err) console.log(err);
	});
    res.redirect('/');

});

io.sockets.on('connection', function (socket) {
	"use strict";

	//Solicitud de las notas a la base de datos.
	socket.on('prueba', function (data) {

		console.log("Socket de prueba");

	});

});