
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
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

var routes = require('./routes/routes') (app);

//Peticiones a la base de datos.

io.sockets.on('connection', function (socket) {
	"use strict";

	//Solicitud de las notas a la base de datos.
	socket.on('actualizarDB', function (data) {

		var query = connection.query('SELECT * FROM Proyecto.notas', function(err, result) {
  			if(err) console.log(err);
  			db = result;
  			console.log("Base de datos actualizada");
			socket.emit('listadoNotas', db);
		});

	});

	socket.on('obtenerNota', function (data) {

		console.log('Nota enviada '+data.id);
		socket.emit('darnota', { nota : db[data.id] });

	});

    socket.on('obtenerNotaModificar', function (data) {

		console.log('Nota enviada '+data.id);
		socket.emit('modificarNota', { nota : db[data.id] });

	})

	socket.on('notasmostradas', function (data) {

		console.log('Notas mostradas');
		
	});
});
