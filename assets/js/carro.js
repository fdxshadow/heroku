$(document).ready(function () {
	$("#productos").children("a").children('div').children('button').click(function(){
		var producto=$(this).parent().children('#nombre').val();
		var precio=$(this).parent().children('#precio').val();
		var id_p=$(this).parent().children("#id_p").val();
		var id_u=$(this).parent().children("#id_u").val();
		console.log(precio);
		console.log(producto);
		console.log(id_p);
		console.log(id_u);

		$.post('/carroadd',{idp:id_p,nombre:producto,precio:precio,idu:id_u},function(data){
			if(data=='ok'){
				$.notify('Producto agregado al carro',"success");



			}

		});
	});

});