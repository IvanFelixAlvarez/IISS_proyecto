/*jslint node: true */
/*jslint browser: true*/
/*global $, jQuery*/
/*global io */
/*global alert */
$(document).ready(function () {
    'use strict';

    var socket = io.connect();

    $('#formularionotas').submit(function () {
        if ($('#asunto').val() === '' || $('#autor').val() === '') {
            alert('Rellene los campos obligatorios: Autor y Asunto.');
            return false;
        }
        return true;
    });

    $('#crearnota').click(function () {
        $('#formularionotas').show();
        $('#contenedornotas').hide();
        $('#modificadornotas').hide();
    });

    $("#vernotas").bind("click", function () {
        socket.emit('actualizarDB', {});
    });

    /*$('#buscarnotas').bind('click', function () {
    });*/

    socket.on('listadoNotas', function (db) {
        var cadena = "",
            i;
        for (i = 0; i < db.length; i += 1) {
            cadena += "<div class=\"decoradornota\"><a class=\"vercontenido\" id=\"" +
                i + "\" href=\"javascript:void(0)\">VER</a><a class=\"modificarcontenido\" id=\"" +
                i + "\" href=\"javascript:void(0)\">MODIFICAR</a><strong>" + db[i].time.substring(0, 10) +
                "  Autor: </strong>" + db[i].autor.substring(0, 13) + "  <strong>Asunto: </strong>" +
                db[i].asunto.substring(0, 17) + "</div>";
        }
        $('#contenedornotas').html(cadena);

        socket.emit('notasmostradas', {});

        $('#formularionotas').hide();
        $('#modificadornotas').hide();
        $('#contenedornotas').show();

        $('.vercontenido').click(function () {
            socket.emit('obtenerNota', {id: $(this).attr('id')});
        });

        $('.modificarcontenido').click(function () {
            socket.emit('obtenerNotaModificar', {id: $(this).attr('id')});
        });
    });

    socket.on('darnota', function (db) {
        $('#popup').fadeIn('slow');
        $('#tituloNota').html(db.nota.asunto);
        $('#autorNota').html('<strong>Autor:  </strong>' + db.nota.autor);
        $('#contenidoNota').html(db.nota.contenido);
        $('#popup-overlay').fadeIn('slow');
        $('#close').click(function () {
            $('#popup').fadeOut('slow');
            $('#popup-overlay').fadeOut('slow');
            return false;
        });
    });


    socket.on('modificarNota', function (db) {
        var cadena = "";
        cadena = "<form id=\"modificadornota\" action=\"/procesamodificador\" method=\"post\" name=\"modificador\">" +
                 "<span>Asunto: </span><input type=\"text\" name=\"asunto\" data-tipo=\"asunto\" value=\"" + db.nota.asunto + "\">" +
                 "<span>Autor: </span><input type=\"text\" name=\"autor\" data-tipo=\"autor\" value=\"" + db.nota.autor + "\">" +
                 "<input type=\"text\" name=\"id\" data-tipo=\"id\" value=\"" + db.nota.id + "\" readonly>" +
                 "<textarea name=\"contenido\">" + db.nota.contenido + "</textarea>" +
                 "<input type=\"submit\" value=\"Modificar\" id=\"modificado\" data-tipo=\"enviar\">" +
                 "</form>";
        $('#modificadornotas').html(cadena);
        $('#modificado').click(function () {
            alert('Nota modificada con éxito.');
        });
        $('#formularionotas').hide();
        $('#contenedornotas').hide();
        $('#modificadornotas').show();
    });

    socket.on('notaModificada', function () {
        alert('Nota modificada con éxito.');
    });

});
