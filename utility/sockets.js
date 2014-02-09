/*jslint node: true */
/* global module */
/* global console */

module.exports = function (io, connection) {
    'use strict';
    var db = [];

    io.sockets.on('connection', function (socket) {

        //Solicitud de las notas a la base de datos.
        socket.on('actualizarDB', function () {

            connection.query('SELECT * FROM proyectoiiss.notas', function (err, result) {
                if (err) { console.log(err); }
                db = result;
                console.log("Base de datos actualizada");
                socket.emit('listadoNotas', db);
            });
        });

        socket.on('obtenerNota', function (data) {

            console.log('Nota enviada ' + data.id);
            socket.emit('darnota', { nota : db[data.id] });

        });

        socket.on('obtenerNotaModificar', function (data) {

            console.log('Nota enviada ' + data.id);
            socket.emit('modificarNota', { nota : db[data.id] });

        });

        socket.on('notasmostradas', function () {

            console.log('Notas mostradas');

        });
    });
};
