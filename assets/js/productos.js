$(document).ready(function () {
	$("#Categorias").children('li').children('a').children('em').click(function(){
		var sup=$("#superM").val();
		var categoria=$(this).parent().children('input').val();
		console.log(sup);
		console.log(categoria);


		$.post("https://api-comunication.herokuapp.com/prod",{Super:sup,Categoria:categoria},function(data){
			$.post('/productos',{json:data});


		});
	});
});