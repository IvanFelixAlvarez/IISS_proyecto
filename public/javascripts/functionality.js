
$(document).ready(function() {

var socket = io.connect();

$('#contenedornotas').hide();	

$('#crearnota').click(function() {
	$('#formularionotas').show();
	$('#contenedornotas').hide();
});

$("#vernotas").bind("click", function(){
	socket.emit('actualizarDB',{});
});

$('#buscarnotas').bind('click', function(){
});

socket.on('listadoNotas', function (db) {
		var cadena="";
		for(var i=0; i<db.length; ++i){
			cadena += "<div class=\"decoradornota\"><a class=\"vercontenido\" id=\"" + 
				i + "\" href=\"javascript:void(0)\">VER</a><a class=\"modificarcontenido\" id=\"" + 
				i + "\" href=\"javascript:void(0)\">MODIFICAR</a><strong>" + db[i].time.substring(0,10) + 
				"  Autor: </strong>" + db[i].autor.substring(0,13) + "  <strong>Asunto: </strong>" + 
				db[i].asunto.substring(0,17) + "</div>";
		}
		$('#contenedornotas').html(cadena);

		socket.emit('notasmostradas',{});

		$('#formularionotas').hide();
		$('#contenedornotas').show();

		$('.vercontenido').click(function(){
			alert('Se ha pulsado '+$(this).attr('id'));
			socket.emit('obtenerNota', {id : $(this).attr('id')});
		});		
});

socket.on('darnota', function (db) {
			alert(db.nota.autor);
});


});
