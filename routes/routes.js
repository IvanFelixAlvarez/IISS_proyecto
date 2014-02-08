module.exports = function(app) {
    
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/contacto', function(req, res) {
        res.render('contacto');
    });

    app.get('/ayuda', function(req, res) {
        res.render('ayuda');
    });

    app.post('/procesaformulario', function(req, res) {
        console.dir(req);
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

};
