$(document).ready(function () {
	$("#categorias").children('li').click(function(){
		var sup=$("#superM").value();
		var categoria=$(this).value();
		$.post("https://api-comunication.herokuapp.com/prod",{Super:sup,Categoria:categoria},function(data){
			$.post('/compra/product',{json:data});


		});
	});
});