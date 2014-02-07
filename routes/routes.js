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

};
