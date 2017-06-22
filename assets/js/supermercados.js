$(document).ready(function(){

	$.post("https://api-comunication.herokuapp.com/super",function(data){

		console.log(data);	

		for (var i = data.length - 1; i >= 0; i--) {
			var path="/images/"+data[i].nombre+".png";
		$("#super").append("<div class=col-md-12><a href='#'><img id="i" class='img-rounded'>"+data[i].nombre+"</a><div/>");
		$("#"+i+).attr({
			src:path
		});


		}
	});

});