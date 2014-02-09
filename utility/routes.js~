/*jslint node: true */
/*jslint unparam: true */
/* global module */
/* global console */
module.exports = function (app, connection) {
    'use strict';

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/contacto', function (req, res) {
        res.render('contacto');
    });

    app.get('/ayuda', function (req, res) {
        res.render('ayuda');
    });

    app.post('/procesaformulario', function (req, res) {
        console.dir(req);
        /*Escribe en la base de datos */
        var post  = {asunto: req.body.asunto, autor: req.body.autor, contenido: req.body.contenido};
        connection.query('INSERT INTO Proyecto.notas SET ?', post, function (err, result) {
            if (err) { console.log(err); }
        });
        res.redirect('/');

    });

    app.post('/procesamodificador', function (req, res) {
        var post  = {asunto: req.body.asunto, autor: req.body.autor, contenido: req.body.contenido},
            id = req.body.id;
        connection.query('UPDATE Proyecto.notas SET ? WHERE id = ' + id, post, function (err, result) {
            if (err) { console.log(err); }
        });
        res.redirect('/');
    });

};
