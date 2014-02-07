
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
var routes = require('./routes/routes')(app);
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

//Peticiones a la base de datos.

app.post('/procesaformulario', function(req, res) {

	/*Escribe en la base de datos */
	var post  = {asunto: req.body.asunto, autor: req.body.autor, contenido: req.body.contenido};
	var query = connection.query('INSERT INTO Proyecto.notas SET ?', post, function(err, result) {
  		if(err) console.log(err);
	});
    res.redirect('/');

});

app.post('/procesamodificador', function(req, res) {
    var post  = {asunto: req.body.asunto, autor: req.body.autor, contenido: req.body.contenido};
    var id = req.body.id;
    var query = connection.query('UPDATE Proyecto.notas SET ? WHERE id = ' + id, post, function(err, result) {
        if (err) console.log(err);
    });
    res.redirect('/');
});

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
