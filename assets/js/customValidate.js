$(document).ready(function(){
	$('#sign-up-form').validate({
		rules:{
			nombre:{
				required: true
			},
			email:{
				required: true,
				email: true
			},
			password:{
				minlength:6,
				required: true
			},
			confirmacion:{
				minlength:6,
				equalTo:"#password"
			}

		},
		success: function(element){
			element
			.text('OK!').adClass('valid')
		}
	});
});